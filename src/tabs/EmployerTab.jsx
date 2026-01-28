import { mockData } from '../mockData'

function EmployerTab({ currentGroup, canEdit }) {
  return (
    <div className="tab-content">
      <h2>Employer Information</h2>

      <div className="section-card">
        <h3>General Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Group Number:</label>
            <span>{currentGroup?.groupNumber}</span>
          </div>
          <div className="info-item">
            <label>Group Name:</label>
            <span>{currentGroup?.name}</span>
          </div>
          <div className="info-item">
            <label>Phone:</label>
            <span>{currentGroup?.phone}</span>
          </div>
          <div className="info-item">
            <label>City:</label>
            <span>{currentGroup?.city}</span>
          </div>
          <div className="info-item">
            <label>State:</label>
            <span>{currentGroup?.state}</span>
          </div>
          <div className="info-item">
            <label>Status:</label>
            <span className={`status-badge status-${currentGroup?.status.toLowerCase()}`}>
              {currentGroup?.status}
            </span>
          </div>
          <div className="info-item">
            <label>Suspended:</label>
            <span>{currentGroup?.isSuspended ? 'Yes' : 'No'}</span>
          </div>
          <div className="info-item">
            <label>UBG 401k Plan:</label>
            <span>{currentGroup?.isUbg401kPlan ? 'Yes' : 'No'}</span>
          </div>
        </div>
        {canEdit && (
          <button className="btn-primary">Edit General Info</button>
        )}
      </div>

      <div className="section-card">
        <h3>Pay Cycles</h3>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Frequency</th>
                <th>Start Date</th>
                <th>Active</th>
                {canEdit && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {mockData.payCycles
                .filter(pc => pc.groupId === currentGroup?.groupId)
                .map(cycle => (
                  <tr key={cycle.payCycleId}>
                    <td>{cycle.name}</td>
                    <td>{cycle.payFrequency}</td>
                    <td>{cycle.startDate}</td>
                    <td>{cycle.isActive ? 'Yes' : 'No'}</td>
                    {canEdit && (
                      <td>
                        <button className="btn-small">Edit</button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {canEdit && (
          <button className="btn-primary">+ Add Pay Cycle</button>
        )}
      </div>
    </div>
  )
}

export default EmployerTab
