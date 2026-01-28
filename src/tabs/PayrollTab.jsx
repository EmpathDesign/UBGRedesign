import { useState } from 'react'
import { mockData, formatDate } from '../mockData'

function PayrollTab({ currentGroup, canEdit }) {
  const [filter, setFilter] = useState('All')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newPayroll, setNewPayroll] = useState({
    payrollType: 'Regular',
    payCycle: 'Weekly',
    checkDate: '',
    payPeriodStartDate: '',
    payPeriodEndDate: '',
    inputMethod: 'ManualEntry'
  })

  const payrolls = mockData.payrolls
    .filter(p => p.groupId === currentGroup?.groupId)
    .filter(p => filter === 'All' || 
      (filter === 'Processed' && p.processingStatus === 'Processed') ||
      (filter === 'Unprocessed' && p.processingStatus === 'Unprocessed')
    )

  const handleAdd = () => {
    console.log('Adding payroll:', newPayroll)
    setShowAddForm(false)
    setNewPayroll({
      payrollType: 'Regular',
      payCycle: 'Weekly',
      checkDate: '',
      payPeriodStartDate: '',
      payPeriodEndDate: '',
      inputMethod: 'ManualEntry'
    })
  }

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Payroll Submissions</h2>
        {canEdit && (
          <button className="btn-primary" onClick={() => setShowAddForm(true)}>
            + Add New Payroll
          </button>
        )}
      </div>

      <div className="filter-bar">
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Payrolls</option>
            <option value="Unprocessed">Unprocessed</option>
            <option value="Processed">Processed</option>
          </select>
        </label>
      </div>

      {showAddForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Payroll</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
              <div className="form-grid">
                <label>
                  Payroll Type:
                  <select 
                    value={newPayroll.payrollType}
                    onChange={(e) => setNewPayroll({...newPayroll, payrollType: e.target.value})}
                  >
                    <option value="Regular">Regular</option>
                    <option value="Adjustment">Adjustment</option>
                  </select>
                </label>
                <label>
                  Pay Cycle:
                  <select 
                    value={newPayroll.payCycle}
                    onChange={(e) => setNewPayroll({...newPayroll, payCycle: e.target.value})}
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="BiWeekly">Bi-Weekly</option>
                    <option value="SemiMonthly">Semi-Monthly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </label>
                <label>
                  Check Date:
                  <input 
                    type="date" 
                    required
                    value={newPayroll.checkDate}
                    onChange={(e) => setNewPayroll({...newPayroll, checkDate: e.target.value})}
                  />
                </label>
                <label>
                  Pay Period Start:
                  <input 
                    type="date" 
                    required
                    value={newPayroll.payPeriodStartDate}
                    onChange={(e) => setNewPayroll({...newPayroll, payPeriodStartDate: e.target.value})}
                  />
                </label>
                <label>
                  Pay Period End:
                  <input 
                    type="date" 
                    required
                    value={newPayroll.payPeriodEndDate}
                    onChange={(e) => setNewPayroll({...newPayroll, payPeriodEndDate: e.target.value})}
                  />
                </label>
                <label>
                  Input Method:
                  <select 
                    value={newPayroll.inputMethod}
                    onChange={(e) => setNewPayroll({...newPayroll, inputMethod: e.target.value})}
                  >
                    <option value="ManualEntry">Manual Entry</option>
                    <option value="FileUpload">File Upload</option>
                  </select>
                </label>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Create</button>
                <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Pay Cycle</th>
              <th>Check Date</th>
              <th>Period Start</th>
              <th>Period End</th>
              <th>Type</th>
              <th>Input Method</th>
              <th>Status</th>
              <th>Processing</th>
              {canEdit && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {payrolls.length === 0 ? (
              <tr>
                <td colSpan={canEdit ? 9 : 8} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                  No payrolls found matching the selected filter.
                </td>
              </tr>
            ) : (
              payrolls.map(payroll => (
              <tr key={payroll.payrollId}>
                <td>{payroll.payCycle}</td>
                <td>{formatDate(payroll.checkDate)}</td>
                <td>{formatDate(payroll.payPeriodStartDate)}</td>
                <td>{formatDate(payroll.payPeriodEndDate)}</td>
                <td>{payroll.payrollType}</td>
                <td>{payroll.inputMethod}</td>
                <td>
                  <span className={`status-badge status-${payroll.status.toLowerCase()}`}>
                    {payroll.status}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-${payroll.processingStatus.toLowerCase()}`}>
                    {payroll.processingStatus}
                  </span>
                </td>
                {canEdit && (
                  <td>
                    <button className="btn-small">Edit</button>
                    {payroll.processingStatus === 'Unprocessed' && (
                      <button className="btn-small btn-danger">Delete</button>
                    )}
                  </td>
                )}
              </tr>
            ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PayrollTab
