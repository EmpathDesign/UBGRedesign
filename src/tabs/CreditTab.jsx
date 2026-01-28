import { useState } from 'react'
import { mockData, formatCurrency, formatDate } from '../mockData'

function CreditTab({ currentGroup, canEdit }) {
  const [showDepositForm, setShowDepositForm] = useState(false)
  const [depositAmount, setDepositAmount] = useState('')

  const transactions = mockData.creditTransactions
    .filter(tx => tx.groupId === currentGroup?.groupId)
    .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))

  const currentBalance = transactions.length > 0 ? transactions[0].runningBalance : 0

  const handleDeposit = () => {
    console.log('Deposit:', depositAmount)
    setShowDepositForm(false)
    setDepositAmount('')
  }

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Credit Account</h2>
        {canEdit && (
          <button className="btn-primary" onClick={() => setShowDepositForm(true)}>
            + Add Deposit
          </button>
        )}
      </div>

      <div className="balance-card">
        <h3>Current Balance</h3>
        <div className="balance-amount">
          {formatCurrency(currentBalance)}
        </div>
      </div>

      {showDepositForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Deposit</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleDeposit(); }}>
              <label>
                Deposit Amount:
                <input 
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  placeholder="0.00"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
              </label>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Submit Deposit</button>
                <button type="button" onClick={() => setShowDepositForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="section-card">
        <h3>Transaction Ledger</h3>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Running Balance</th>
                <th>Reference</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.creditTransactionId}>
                  <td>{formatDate(tx.transactionDate)}</td>
                  <td>{tx.transactionType}</td>
                  <td className={tx.amount >= 0 ? 'amount-credit' : 'amount-debit'}>
                    {formatCurrency(tx.amount)}
                  </td>
                  <td className="balance-cell">{formatCurrency(tx.runningBalance)}</td>
                  <td>
                    {tx.referenceType && tx.referenceId ? 
                      `${tx.referenceType}: ${tx.referenceId}` : 
                      '-'}
                  </td>
                  <td>{tx.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CreditTab
