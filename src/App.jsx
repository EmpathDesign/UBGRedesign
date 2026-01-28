import { useState } from 'react'
import './App.css'
import logo from './assets/UBGLogo.png'
import { mockData, getCurrentGroup, hasTabAccess, canEdit } from './mockData'
import HomeTab from './tabs/HomeTab'
import PayrollTab from './tabs/PayrollTab'
import EmployeeTab from './tabs/EmployeeTab'
import EmployerTab from './tabs/EmployerTab'
import CreditTab from './tabs/CreditTab'
import AdminTab from './tabs/AdminTab'
import AccrualTab from './tabs/AccrualTab'
import ReportsTab from './tabs/ReportsTab'
import AccountStatementsTab from './tabs/AccountStatementsTab'
import SharedDocumentsTab from './tabs/SharedDocumentsTab'

function App() {
  const [activeTab, setActiveTab] = useState('Home')
  const [currentGroup, setCurrentGroup] = useState(getCurrentGroup())
  const [groupSearchTerm, setGroupSearchTerm] = useState('')
  const [showGroupSearch, setShowGroupSearch] = useState(false)

  const tabs = [
    'Home', 'Payroll', 'Employee', 'Employer', 'Accrual', 
    'Credit', 'Reports', 'Admin', 'AccountStatements', 'SharedDocuments'
  ].filter(tab => hasTabAccess(tab))

  const handleLoadGroup = () => {
    const searchLower = groupSearchTerm.toLowerCase()
    const found = mockData.groups.find(g => 
      g.groupNumber.toLowerCase().includes(searchLower) ||
      g.name.toLowerCase().includes(searchLower) ||
      g.city?.toLowerCase().includes(searchLower)
    )
    if (found) {
      setCurrentGroup(found)
      mockData.currentUser.groupId = found.groupId
      setGroupSearchTerm('')
      setShowGroupSearch(false)
    }
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case 'Home':
        return <HomeTab currentGroup={currentGroup} onNavigate={setActiveTab} />
      case 'Payroll':
        return <PayrollTab currentGroup={currentGroup} canEdit={canEdit('Payroll')} />
      case 'Employee':
        return <EmployeeTab currentGroup={currentGroup} canEdit={canEdit('Employee')} />
      case 'Employer':
        return <EmployerTab currentGroup={currentGroup} canEdit={canEdit('Employer')} />
      case 'Credit':
        return <CreditTab currentGroup={currentGroup} canEdit={canEdit('Credit')} />
      case 'Admin':
        return <AdminTab canEdit={canEdit('Admin')} />
      case 'Accrual':
        return <AccrualTab currentGroup={currentGroup} canEdit={canEdit('Accrual')} />
      case 'Reports':
        return <ReportsTab currentGroup={currentGroup} />
      case 'AccountStatements':
        return <AccountStatementsTab currentGroup={currentGroup} canEdit={canEdit('AccountStatements')} />
      case 'SharedDocuments':
        return <SharedDocumentsTab currentGroup={currentGroup} canEdit={canEdit('SharedDocuments')} />
      default:
        return <div>Tab not implemented</div>
    }
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <img src={logo} alt="UBG Logo" className="logo-image" />
          </div>
          
          <div className="group-context">
            <div className="group-info">
              <span className="group-label">Group:</span>
              <span className="group-name">{currentGroup?.groupNumber} - {currentGroup?.name}</span>
              <button 
                className="group-search-btn"
                onClick={() => setShowGroupSearch(!showGroupSearch)}
                aria-label="Search for a different group"
              >
                🔍
              </button>
            </div>
            {showGroupSearch && (
              <div className="group-search-panel">
                <input
                  type="text"
                  placeholder="Search by group #, name, or city..."
                  value={groupSearchTerm}
                  onChange={(e) => setGroupSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLoadGroup()}
                />
                <button onClick={handleLoadGroup}>Load</button>
                <button onClick={() => setShowGroupSearch(false)}>Cancel</button>
              </div>
            )}
          </div>

          <div className="user-info">
            <span>{mockData.currentUser.displayName}</span>
            <span className="user-role">({mockData.roles.find(r => r.roleId === mockData.currentUser.roleId)?.roleName})</span>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="tab-nav" aria-label="Main navigation">
        {tabs.map(tab => (
          <button 
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
          >
            {tab === 'AccountStatements' ? 'Account Statements' : 
             tab === 'SharedDocuments' ? 'Shared Documents' : tab}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {renderTabContent()}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 UBG Redesign - Union Benefit Group Management System</p>
        <p className="footer-note">Support: {currentGroup?.supportPhone || '1-800-555-0199'}</p>
      </footer>
    </div>
  )
}

export default App
