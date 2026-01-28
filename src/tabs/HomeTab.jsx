import { mockData, formatDate } from '../mockData'

function HomeTab({ currentGroup, onNavigate }) {
  const reminders = mockData.reminders.filter(r => r.groupId === currentGroup?.groupId && !r.isDismissed)

  const getSeverityClass = (severity) => {
    return `severity-${severity.toLowerCase()}`
  }

  const handleReminderClick = (reminder) => {
    // Navigate to the relevant tab based on reminder type
    if (reminder.type === 'LatePayroll') {
      onNavigate('Payroll')
    } else if (reminder.type === 'MissingEmployeeData') {
      onNavigate('Employee')
    } else if (reminder.type === 'PendingApproval') {
      onNavigate('Accrual')
    }
  }

  return (
    <div className="tab-content">
      <h2>Welcome to UBG Management System</h2>
      <p className="subtitle">Group: {currentGroup?.groupNumber} - {currentGroup?.name}</p>

      <div className="welcome-panel">
        <h3>Quick Start Guide</h3>
        <div className="guide-grid">
          <div className="guide-item">
            <strong>Home</strong>
            <p>View reminders and important alerts for your group</p>
          </div>
          <div className="guide-item">
            <strong>Payroll</strong>
            <p>Submit, manage, and track payroll submissions</p>
          </div>
          <div className="guide-item">
            <strong>Employee</strong>
            <p>Search and manage employee records and classifications</p>
          </div>
          <div className="guide-item">
            <strong>Employer</strong>
            <p>View and edit employer profile and pay cycle configurations</p>
          </div>
          <div className="guide-item">
            <strong>Accrual</strong>
            <p>Manage benefit accrual rates and verify employer rates</p>
          </div>
          <div className="guide-item">
            <strong>Credit</strong>
            <p>View account ledger and make deposits</p>
          </div>
          <div className="guide-item">
            <strong>Reports</strong>
            <p>Generate and view payroll cost grids and other reports</p>
          </div>
          <div className="guide-item">
            <strong>Admin</strong>
            <p>Configure system parameters, roles, and thresholds</p>
          </div>
          <div className="guide-item">
            <strong>Account Statements</strong>
            <p>View and generate account statements</p>
          </div>
          <div className="guide-item">
            <strong>Shared Documents</strong>
            <p>Upload, download, and manage shared documents</p>
          </div>
        </div>
      </div>

      <div className="support-section">
        <h3>Need Help?</h3>
        <p>Contact support: <strong>{currentGroup?.supportPhone}</strong></p>
      </div>

      <div className="reminders-section">
        <h3>Reminders & Alerts</h3>
        {reminders.length === 0 ? (
          <p className="no-reminders">No reminders at this time. All tasks are up to date!</p>
        ) : (
          <div className="reminders-list">
            {reminders.map(reminder => (
              <div 
                key={reminder.reminderId} 
                className={`reminder-card ${getSeverityClass(reminder.severity)}`}
                onClick={() => handleReminderClick(reminder)}
                style={{ cursor: 'pointer' }}
              >
                <div className="reminder-header">
                  <span className="reminder-type">{reminder.type}</span>
                  <span className={`reminder-severity ${getSeverityClass(reminder.severity)}`}>
                    {reminder.severity}
                  </span>
                </div>
                <h4>{reminder.title}</h4>
                <p>{reminder.message}</p>
                <div className="reminder-footer">
                  <span className="reminder-date">{formatDate(reminder.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomeTab
