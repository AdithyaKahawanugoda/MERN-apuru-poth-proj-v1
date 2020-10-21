import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Modal } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';

const UpdateExperience = ({id,title, description, company, from, to, show, onHide}) => {
  const [adminTitle, setTitle] = useState(title)
  const [adminDescription, setDescription] = useState()
  const [adminCompany, setCompany] = useState()
  const [adminFrom ,setFrom] = useState(new Date())
  const [adminTo ,setTo] = useState(new Date())

  const sendUpdateExperice = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
         Authorization: localStorage.getItem("Authorization")
      },
    }

    const updateData = {
      title: adminTitle,
      description: adminDescription,
      company: adminCompany,
      from: adminFrom,
      to: adminTo,
    }
    await axios.put(`http://localhost:8059/adminprofile/update-experience/${id}`, updateData, config)
    .then((res) => {
      alert('Experience updated successfully')
      window.location = "/admin/profile"
    })
    .catch((err) => {
      alert(err.message)
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
            <form onSubmit={sendUpdateExperice} className="text-color">  
              <div className="form-group">
                <label>Title</label>
                <input type="text" required className="form-control" placeholder={title}
                onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input type="text" required className="form-control" placeholder={company}
                onChange={(e) => setCompany(e.target.value)} />
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <label>From</label>
                  <input type="date" className="form-control form-control-user" placeholder={from}
                  onChange={(e) => setFrom(e.target.value)} required/>
                </div>
                <div className="col-sm-6">
                  <label>To</label>
                  <input type="date" className="form-control form-control-user" placeholder={to}
                  onChange={(e) => setTo(e.target.value)} required/>
                </div>
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                onChange={(e) => {setDescription(e.target.value)}}>{description}</textarea>
              </div>
              <Button variant="contained" className="w-10" style={{background: "#ff8c00", width: 100+"%"}}
              startIcon={<SendIcon />} disableElevation type="submit">update experience</Button>
            </form>
          </Modal.Body>
        </Modal>
    </div>
  )
}

export default UpdateExperience