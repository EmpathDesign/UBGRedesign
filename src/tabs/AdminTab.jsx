import { useState } from 'react'
import { mockData, formatCurrency } from '../mockData'

function AdminTab({ canEdit }) {
  const [selectedView, setSelectedView] = useState('roles')

  const renderRolePermissions = () => {
    return (
      <div className="section-card">
        <h3>Role Permission Matrix</h3>
        <div className="permission-table">
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Home</th>
                <th>Payroll</th>
                <th>Employee</th>
                <th>Employer</th>
                <th>Accrual</th>
                <th>Credit</th>
                <th>Reports</th>
                <th>Admin</th>
                {canEdit && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {mockData.roles.map(role => {
                const perms = mockData.rolePermissions[role.roleId] || {}
                return (
                  <tr key={role.roleId}>
                    <td><strong>{role.roleName}</strong></td>
                    <td>{perms.Home || 'Undefined'}</td>
                    <td>{perms.Payroll || 'Undefined'}</td>
                    <td>{perms.Employee || 'Undefined'}</td>
                    <td>{perms.Employer || 'Undefined'}</td>
                    <td>{perms.Accrual || 'Undefined'}</td>
                    <td>{perms.Credit || 'Undefined'}</td>
                    <td>{perms.Reports || 'Undefined'}</td>
                    <td>{perms.Admin || 'Undefined'}</td>
                    {canEdit && (
                      <td>
                        <button className="btn-small">
                          Edit
                        </button>
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {canEdit && (
          <button className="btn-primary">+ Add New Role</button>
        )}
      </div>
    )
  }

  const renderHCEThresholds = () => {
    return (
      <div className="section-card">
        <h3>HCE (Highly Compensated Employee) Thresholds</h3>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Threshold Amount</th>
                {canEdit && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {mockData.hceThresholds.map(threshold => (
                <tr key={threshold.year}>
                  <td>{threshold.year}</td>
                  <td>{formatCurrency(threshold.amount)}</td>
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
          <button className="btn-primary">+ Add New Year</button>
        )}
      </div>
    )
  }

  const renderSalaryCaps = () => {
    return (
      <div className="section-card">
        <h3>Wage Salary Caps</h3>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Cap Amount</th>
                {canEdit && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {mockData.salaryCaps.map(cap => (
                <tr key={cap.year}>
                  <td>{cap.year}</td>
                  <td>{formatCurrency(cap.amount)}</td>
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
          <button className="btn-primary">+ Add New Year</button>
        )}
      </div>
    )
  }

  return (
    <div className="tab-content">
      <h2>System Administration</h2>

      <div className="view-selector">
        <button 
          className={selectedView === 'roles' ? 'active' : ''}
          onClick={() => setSelectedView('roles')}
        >
          Role Permissions
        </button>
        <button 
          className={selectedView === 'hce' ? 'active' : ''}
          onClick={() => setSelectedView('hce')}
        >
          HCE Thresholds
        </button>
        <button 
          className={selectedView === 'salary' ? 'active' : ''}
          onClick={() => setSelectedView('salary')}
        >
          Salary Caps
        </button>
      </div>

      {selectedView === 'roles' && renderRolePermissions()}
      {selectedView === 'hce' && renderHCEThresholds()}
      {selectedView === 'salary' && renderSalaryCaps()}
    </div>
  )
}

export default AdminTab
