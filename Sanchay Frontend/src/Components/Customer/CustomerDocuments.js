import React, { useState } from 'react'
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody
} from 'mdb-react-ui-kit'
import './CustomerDocument.css'
import { Button, Form, Modal } from 'react-bootstrap'
const CustomerDocuments = () => {
  const [status, setStatus] = useState('pending')
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <div className="fw-bold mb-3 text-center" style={{ fontSize: '24px' }}>
        Documents <Button onClick={handleShow}>Add Document</Button>
      </div>
      <div className="document-div">
        <MDBTable align="middle">
          <MDBTableHead className="text-center">
            <tr>
              <th scope="col">Document Name</th>
              <th scope="col">File</th>
              <th scope="col">Verification Status</th>
              <th scope="col">View Document</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody className="text-center">
            <tr>
              <td>
                <div className="d-flex">
                  <div className="ms-3">
                    <p className="fw-bold mb-1">Aadhar Card</p>
                  </div>
                </div>
              </td>
              <td>
                <a className="fw-bold mb-1" href="#">
                  {' '}
                  File
                </a>
              </td>
              <td className="text-center">
                {status === 'pending' && (
                  <MDBBadge color="warning" pill>
                    Pending
                  </MDBBadge>
                )}
                {status === 'active' && (
                  <MDBBadge color="success" pill>
                    Verified
                  </MDBBadge>
                )}
                {status === 'rejected' && (
                  <MDBBadge color="danger" pill>
                    Rejected
                  </MDBBadge>
                )}
              </td>
              <td>
                <a className="fw-bold mb-1" href="#">
                  {' '}
                  View Document
                </a>
              </td>
            </tr>
          </MDBTableBody>
        </MDBTable>

        <Modal show={show} onHide={handleClose} className="document-modal">
          <Modal.Header closeButton>
            <Modal.Title >Upload Documents</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>File Name</Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default CustomerDocuments
