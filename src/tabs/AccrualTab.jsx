import { useState } from 'react'
import { mockData, formatPercent, formatDate } from '../mockData'

function AccrualTab({ currentGroup, canEdit }) {
  const [selectedView, setSelectedView] = useState('myRates')
  const [selectedYear, setSelectedYear] = useState(2026)

  const renderMyRates = () => {
    const rates = mockData.rateSets.filter(r => r.groupId === currentGroup?.groupId)
    
    return (
      <div className="section-card">
        <h3>My Rates History</h3>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Effective Start</th>
                <th>Effective End</th>
                <th>Accrual Rate</th>
                <th>Employee Rate</th>
                <th>Employer Rate</th>
                <th>Admin Rate</th>
                <th>Alt Employer Rate</th>
              </tr>
            </thead>
            <tbody>
              {rates.map(rate => (
                <tr key={rate.rateSetId}>
                  <td>{formatDate(rate.effectiveStartDate)}</td>
                  <td>{formatDate(rate.effectiveEndDate)}</td>
                  <td>{formatPercent(rate.accrualRate)}</td>
                  <td>{formatPercent(rate.employeeRate)}</td>
                  <td>{formatPercent(rate.employerRate)}</td>
                  <td>{formatPercent(rate.adminRate)}</td>
                  <td>{rate.altEmployerRate ? formatPercent(rate.altEmployerRate) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderVerifyRates = () => {
    const verifications = mockData.rateVerifications.filter(v => 
      v.groupId === currentGroup?.groupId && v.year === selectedYear
    )

    return (
      <div className="section-card">
        <h3>Verify Employer Rates</h3>
        <div className="filter-bar">
          <label>
            Year:
            <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
          </label>
        </div>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Accrual Rate</th>
                <th>Employee Rate</th>
                <th>Employer Rate</th>
                <th>Status</th>
                <th>Submitted On</th>
                <th>Verified On</th>
                {canEdit && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {verifications.map(verify => (
                <tr key={verify.verificationId}>
                  <td>{verify.year}</td>
                  <td>{formatPercent(verify.accrualRate)}</td>
                  <td>{formatPercent(verify.employeeRate)}</td>
                  <td>{formatPercent(verify.employerRate)}</td>
                  <td>
                    <span className={`status-badge status-${verify.status.toLowerCase()}`}>
                      {verify.status}
                    </span>
                  </td>
                  <td>{verify.submittedOn ? formatDate(verify.submittedOn) : '-'}</td>
                  <td>{verify.verifiedOn ? formatDate(verify.verifiedOn) : '-'}</td>
                  {canEdit && (
                    <td>
                      {verify.status === 'NotSubmitted' && (
                        <button className="btn-small">Submit</button>
                      )}
                      {verify.status === 'Submitted' && (
                        <button className="btn-small">Verify</button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="tab-content">
      <h2>Accrual Management</h2>

      <div className="view-selector">
        <button 
          className={selectedView === 'myRates' ? 'active' : ''}
          onClick={() => setSelectedView('myRates')}
        >
          My Rates
        </button>
        <button 
          className={selectedView === 'verify' ? 'active' : ''}
          onClick={() => setSelectedView('verify')}
        >
          Verify Rates
        </button>
        <button 
          className={selectedView === 'allRates' ? 'active' : ''}
          onClick={() => setSelectedView('allRates')}
        >
          All Rates (Catalog)
        </button>
      </div>

      {selectedView === 'myRates' && renderMyRates()}
      {selectedView === 'verify' && renderVerifyRates()}
      {selectedView === 'allRates' && (
        <div className="section-card">
          <h3>Rate Catalog</h3>
          <p className="info-message">Rate catalog management coming soon...</p>
        </div>
      )}
    </div>
  )
}

export default AccrualTab
