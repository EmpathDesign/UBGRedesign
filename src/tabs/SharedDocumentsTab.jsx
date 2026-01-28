import { useState } from 'react'
import { mockData, formatFileSize, formatDate } from '../mockData'

function SharedDocumentsTab({ currentGroup, canEdit }) {
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const documents = mockData.sharedDocuments.filter(d => 
    d.groupId === currentGroup?.groupId && !d.isDeleted
  )

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile.name)
      setShowUploadForm(false)
      setSelectedFile(null)
    }
  }

  const handleDelete = (docId) => {
    if (confirm('Are you sure you want to delete this document?')) {
      console.log('Deleting document:', docId)
    }
  }

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Shared Documents</h2>
        {canEdit && (
          <button className="btn-primary" onClick={() => setShowUploadForm(true)}>
            + Upload Document
          </button>
        )}
      </div>

      {showUploadForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Upload Document</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }}>
              <div className="upload-section">
                <label className="file-upload-label">
                  Choose File:
                  <input 
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                  />
                </label>
                {selectedFile && (
                  <p className="file-info">Selected: {selectedFile.name}</p>
                )}
                <p className="help-text">Max file size: 20MB. Filename limit: 200 characters.</p>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={!selectedFile}>
                  Upload
                </button>
                <button type="button" onClick={() => {
                  setShowUploadForm(false)
                  setSelectedFile(null)
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="section-card">
        <h3>Documents ({documents.length})</h3>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Size</th>
                <th>Uploaded On</th>
                <th>Uploaded By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(doc => (
                <tr key={doc.documentId}>
                  <td>{doc.fileName}</td>
                  <td>{formatFileSize(doc.fileSizeBytes)}</td>
                  <td>{formatDate(doc.uploadedAt)}</td>
                  <td>{doc.uploadedBy}</td>
                  <td>
                    <button className="btn-small">Download</button>
                    {canEdit && (
                      <button 
                        className="btn-small btn-danger"
                        onClick={() => handleDelete(doc.documentId)}
                      >
                        Delete
                      </button>
                    )}
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

export default SharedDocumentsTab
