import { useState } from 'react'
import { mockData } from '../mockData'

function EmployeeTab({ currentGroup, canEdit }) {
  const [filters, setFilters] = useState({
    ssn: '',
    firstName: '',
    lastName: '',
    status: 'All',
    payType: 'All',
    isParticipant: 'All'
  })
  const [showResults, setShowResults] = useState(true)
  const [expandedRows, setExpandedRows] = useState(new Set())

  const employees = mockData.employees.filter(emp => {
    if (emp.groupId !== currentGroup?.groupId) return false
    if (filters.ssn && !emp.ssn.includes(filters.ssn)) return false
    if (filters.firstName && !emp.firstName.toLowerCase().includes(filters.firstName.toLowerCase())) return false
    if (filters.lastName && !emp.lastName.toLowerCase().includes(filters.lastName.toLowerCase())) return false
    if (filters.status !== 'All' && emp.status !== filters.status) return false
    if (filters.payType !== 'All' && emp.payType !== filters.payType) return false
    if (filters.isParticipant !== 'All' && emp.isParticipant !== (filters.isParticipant === 'Yes')) return false
    return true
  })

  const toggleRow = (empId) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(empId)) {
      newExpanded.delete(empId)
    } else {
      newExpanded.add(empId)
    }
    setExpandedRows(newExpanded)
  }

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Employee Management</h2>
        {canEdit && (
          <button className="btn-primary">
            + Add New Employee
          </button>
        )}
      </div>

      <div className="search-section">
        <h3>Search Employees</h3>
        <div className="form-grid">
          <label>
            SSN:
            <input 
              type="text" 
              placeholder="Last 4 digits"
              value={filters.ssn}
              onChange={(e) => setFilters({...filters, ssn: e.target.value})}
            />
          </label>
          <label>
            First Name:
            <input 
              type="text"
              value={filters.firstName}
              onChange={(e) => setFilters({...filters, firstName: e.target.value})}
            />
          </label>
          <label>
            Last Name:
            <input 
              type="text"
              value={filters.lastName}
              onChange={(e) => setFilters({...filters, lastName: e.target.value})}
            />
          </label>
          <label>
            Status:
            <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Terminated">Terminated</option>
              <option value="LeaveOfAbsence">Leave of Absence</option>
            </select>
          </label>
          <label>
            Pay Type:
            <select value={filters.payType} onChange={(e) => setFilters({...filters, payType: e.target.value})}>
              <option value="All">All</option>
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </label>
          <label>
            Is Participant:
            <select value={filters.isParticipant} onChange={(e) => setFilters({...filters, isParticipant: e.target.value})}>
              <option value="All">All</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
        </div>
        <button className="btn-primary" onClick={() => setShowResults(true)}>
          Find Employees
        </button>
      </div>

      {showResults && (
        <div className="results-section">
          <h3>Search Results ({employees.length})</h3>
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>SSN</th>
                  <th>First</th>
                  <th>MI</th>
                  <th>Last</th>
                  <th>Status</th>
                  <th>Pay Type</th>
                  <th>Pay Class</th>
                  <th>Participant</th>
                  {canEdit && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <>
                    <tr key={emp.employeeId}>
                      <td>
                        <button 
                          className="btn-expand"
                          onClick={() => toggleRow(emp.employeeId)}
                        >
                          {expandedRows.has(emp.employeeId) ? '▼' : '▶'}
                        </button>
                      </td>
                      <td>{emp.ssn}</td>
                      <td>{emp.firstName}</td>
                      <td>{emp.middleInitial}</td>
                      <td>{emp.lastName}</td>
                      <td>
                        <span className={`status-badge status-${emp.status.toLowerCase()}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td>{emp.payType}</td>
                      <td>{emp.payClass}</td>
                      <td>{emp.isParticipant ? 'Yes' : 'No'}</td>
                      {canEdit && (
                        <td>
                          <button className="btn-small">Edit</button>
                          {emp.status === 'Active' && (
                            <button className="btn-small">Terminate</button>
                          )}
                        </td>
                      )}
                    </tr>
                    {expandedRows.has(emp.employeeId) && (
                      <tr className="expanded-row">
                        <td colSpan="10">
                          <div className="expanded-content">
                            <p><strong>Hire Date:</strong> {emp.hireDate || 'N/A'}</p>
                            <p><strong>Termination Date:</strong> {emp.terminationDate || 'N/A'}</p>
                            <p><strong>H2A Visa Status:</strong> {emp.h2aVisaStatus || 'Unknown'}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeeTab
