import { useState } from 'react'
import { formatPercent } from '../mockData'

function ReportsTab() {
  const [selectedReport, setSelectedReport] = useState('')
  const [selectedYear, setSelectedYear] = useState(2026)
  const [showResults, setShowResults] = useState(false)

  // Mock payroll cost grid data
  const grid1Data = {
    gridName: 'Payroll Cost Grid 1',
    effectiveStart: '2026-01-01',
    effectiveEnd: '2026-06-30',
    suspendedRate: 0.015,
    adminFee: 0.001,
    rows: [
      { accrualRate: 0.0100, employeeRates: [0.0000, 0.0025, 0.0050, 0.0075, 0.0100] },
      { accrualRate: 0.0125, employeeRates: [0.0000, 0.0025, 0.0050, 0.0075, 0.0100] },
      { accrualRate: 0.0150, employeeRates: [0.0000, 0.0025, 0.0050, 0.0075, 0.0100] },
      { accrualRate: 0.0175, employeeRates: [0.0000, 0.0025, 0.0050, 0.0075, 0.0100] },
    ]
  }

  const employeeRateHeaders = [0.0000, 0.0025, 0.0050, 0.0075, 0.0100]

  const calculateResult = (accrual, employee) => {
    // Simple calculation: result = accrual + employee + admin
    return accrual + employee + 0.001
  }

  const handleRunReport = () => {
    if (selectedReport) {
      setShowResults(true)
    }
  }

  return (
    <div className="tab-content">
      <h2>Reports</h2>

      <div className="report-selector">
        <div className="form-grid">
          <label>
            Select Report:
            <select 
              value={selectedReport} 
              onChange={(e) => setSelectedReport(e.target.value)}
            >
              <option value="">-- Choose a Report --</option>
              <option value="PayrollCostGrid">Payroll Cost Grid</option>
              <option value="EmployeeRoster">Employee Roster</option>
              <option value="RateHistory">Rate History</option>
            </select>
          </label>
          <label>
            Year:
            <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
          </label>
        </div>
        <button className="btn-primary" onClick={handleRunReport} disabled={!selectedReport}>
          Run Report
        </button>
      </div>

      {showResults && selectedReport === 'PayrollCostGrid' && (
        <div className="report-results">
          <div className="section-card">
            <h3>{grid1Data.gridName}</h3>
            <p>
              <strong>Effective Period:</strong> {grid1Data.effectiveStart} to {grid1Data.effectiveEnd}
            </p>
            
            <div className="supplemental-rates">
              <p><strong>Suspended Group Employer Contribution Rate:</strong> {formatPercent(grid1Data.suspendedRate)}</p>
              <p><strong>Payroll Administrative Fee:</strong> {formatPercent(grid1Data.adminFee)}</p>
            </div>

            <div className="cost-grid-table">
              <table>
                <thead>
                  <tr>
                    <th>Benefit Accrual Rate</th>
                    {employeeRateHeaders.map((rate, idx) => (
                      <th key={idx}>Employee {formatPercent(rate)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {grid1Data.rows.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      <td><strong>{formatPercent(row.accrualRate)}</strong></td>
                      {row.employeeRates.map((empRate, colIdx) => (
                        <td key={colIdx} className="grid-cell">
                          {formatPercent(calculateResult(row.accrualRate, empRate))}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="report-actions">
              <button className="btn-secondary">Print Report</button>
              <button className="btn-secondary">Export to Excel</button>
            </div>
          </div>
        </div>
      )}

      {showResults && selectedReport !== 'PayrollCostGrid' && (
        <div className="info-message">
          <p>Report implementation coming soon...</p>
        </div>
      )}
    </div>
  )
}

export default ReportsTab
