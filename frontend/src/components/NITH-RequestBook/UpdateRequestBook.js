import React, {useState} from 'react';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import UpdateIcon from '@material-ui/icons/Update';
import { Modal } from "react-bootstrap";
import SingleReqestBook from './SingleReqestBook'

const UpdateRequestBooks = ({show, onHide, itemId, bookName, authorName, printedYear}) => {

  const [updateBookName, setUpdateBookName] = useState(bookName)
  const [updateAuthorName, setUpdateAuthorName] = useState(authorName)
  const [updatePrintedYear, setPrintedYear] = useState(printedYear)

  const sendUpdateRequest = async (e) => {
    e.preventDefault()
    const updateRequest = {
      bookname: updateBookName,
      authorname: updateAuthorName,
      printedyear: updatePrintedYear
    }
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization")
     },
    }
    await axios.post(`http://localhost:8059/request/update/${itemId}`, updateRequest, config)
    .then((res) => {
      alert(res.data.status)
      window.location = "/me"
    })
    .catch((err) => {
      alert(err.message)
      console.log(err)
    })
  }

  return (
    <div>
      <Modal show={show} onHide={onHide} animation={true} size="lg"
      aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="text-color">Update Delivery Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={sendUpdateRequest} className="text-color">
            <div className="form-group">
              <label>Book Name</label>
              <input type="text" required className="form-control" value={updateBookName}
              onChange={(e) => setUpdateBookName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Author Name</label>
              <input type="text" required className="form-control" value={updateAuthorName}
              onChange={(e) => setUpdateAuthorName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Book Name</label>
              <input type="text" required className="form-control" value={updatePrintedYear}
              onChange={(e) => setPrintedYear(e.target.value)} />
            </div>
            <Button variant="contained" className="w-10" style={{background: "#ff8c00", width: 100+"%"}}
            startIcon={<UpdateIcon />} disableElevation type="submit">update the request</Button>
          </form>
        </Modal.Body>  
      </Modal>
    </div>
  )
}

export default UpdateRequestBooks