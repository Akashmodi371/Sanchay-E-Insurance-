import axios from 'axios'
import React from 'react'
import Swal from 'sweetalert2'

const ReplyModal = ({ selectedQuery, replyMessage, setReplyMessage, closeModal }) => {
  const accessid = localStorage.getItem('accessid')
  const qid = selectedQuery.queryid
  const handleReply = async () => {
    const requestData = {
      replymessage: replyMessage
    }
    try {
      const response = await axios.post(`http://localhost:8080/queryapp/replyqueryadmin/${qid}/${accessid}`, requestData)

      Swal.fire(
        'Done',
        response.data,
        'Success'
      )
    } catch (error) {
      alert(error.message)
    }
    closeModal()
  }

  return (
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Reply to Query</h5>
            <button type="button" className="close" style={{ maxWidth: '60px' }} onClick={closeModal}>
              <span >&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Query ID:</label>
              <p>{selectedQuery.queryid}</p>
            </div>
            <div className="form-group">
              <label>Query:</label>
              <p>{selectedQuery.messagequery}</p>
            </div>
            <div className="form-group">
              <label>Reply:</label>
              <textarea
                className="form-control"
                rows="4"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button type="button" className="btn btn-secondary" style={{ maxWidth: '80px', marginTop: '10px' }} onClick={closeModal}>
              Close
            </button>
            <button type="button" className="btn btn-primary" style={{ maxWidth: '80px', marginTop: '10px' }} onClick={handleReply}>
              Reply
            </button>
          </div>
        </div>
      </div>
  )
}

export default ReplyModal
