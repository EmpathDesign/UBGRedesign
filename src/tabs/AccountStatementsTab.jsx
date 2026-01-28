import { mockData, formatDate } from '../mockData'

function AccountStatementsTab({ currentGroup, canEdit }) {
  const statements = mockData.accountStatements.filter(s => s.groupId === currentGroup?.groupId)

  const handleGenerate = () => {
    console.log('Generating statement...')
  }

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Account Statements</h2>
        {canEdit && (
          <button className="btn-primary" onClick={handleGenerate}>
            Generate Statement
          </button>
        )}
      </div>

      <div className="section-card">
        <h3>Available Statements</h3>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Statement Number</th>
                <th>Statement Date</th>
                <th>Period Start</th>
                <th>Period End</th>
                <th>Status</th>
                <th>Generated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {statements.map(stmt => (
                <tr key={stmt.statementId}>
                  <td>{stmt.statementNumber}</td>
                  <td>{formatDate(stmt.statementDate)}</td>
                  <td>{stmt.periodStartDate ? formatDate(stmt.periodStartDate) : '-'}</td>
                  <td>{stmt.periodEndDate ? formatDate(stmt.periodEndDate) : '-'}</td>
                  <td>
                    <span className={`status-badge status-${stmt.status.toLowerCase()}`}>
                      {stmt.status}
                    </span>
                  </td>
                  <td>{stmt.generatedAt ? formatDate(stmt.generatedAt) : '-'}</td>
                  <td>
                    <button className="btn-small">View</button>
                    <button className="btn-small">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AccountStatementsTab
