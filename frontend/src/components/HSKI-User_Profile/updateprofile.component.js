import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';

const UpdateProfile = ({
    upname,
    upadd1,
    upadd2,
    upcity,
    uparea,
    uppscode,
    upcountry,
    upphone,
    upemail,
    show, 
    onHide
}) => {
    const [name, setName] = useState(upname)
    const [add1, setAddress1] = useState(upadd1)
    const [add2, setAddress2] = useState(upadd2)
    const [city, setCity] = useState(upcity)
    const [area, setArea] = useState(uparea)
    const [pscode, setPostalCode] = useState(uppscode)
    const [country, setCountry] = useState(upcountry)
    const [phone, setPhone] = useState(upphone)
    const [email, setEmail] = useState(upemail)

    const updateUserProfile = async (e) => {
      e.preventDefault()
      const config = {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      };

      const updateObject = {
        name: name,
        add1: add1,
        add2: add2,
        city: city,
        area: area,
        pscode: pscode,
        country: country,
        phone: phone,
        email: email,
      }

      await axios.put('http://localhost:8059/user/update', updateObject, config)
      .then((res) => {
        alert(res.data.status)
        window.location = "/me"
      })
      .catch((err) => {
        console.log(err)
        alert(err.message)
      })
    }

    return (
        <div>
        <Modal show={show} onHide={onHide} animation={true} size="lg"
        aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className="text-color">Update My Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={updateUserProfile} className="text-color">  
              <div className="form-group row mb-3">
                <div className="col-sm-6">
                  <input type="text" className="form-control form-control-user" value={name}
                  onChange={(e) => setName(e.target.value)} required/>
                  <small className="text-muted">your name</small>
                </div>
                <div className="col-sm-6">
                  <input type="text" className="form-control form-control-user" value={phone}
                  onChange={(e) => setPhone(e.target.value)} required/>
                  <small className="text-muted">change phone number</small>
                </div>
              </div>     
              <div className="form-group">
                <input type="email" required className="form-control" value={email}
                onChange={(e) => setEmail(e.target.value)} />
                <small className="text-muted">chnage your email</small>
              </div>
              <div className="form-group row mb-3">
                <div className="col-sm-4">
                  <input type="text" className="form-control form-control-user" value={add1}
                  onChange={(e) => setAddress1(e.target.value)} required/>
                  <small className="text-muted">address line 1</small>
                </div>
                <div className="col-sm-4">
                  <input type="text" className="form-control form-control-user" value={add2}
                  onChange={(e) => setAddress2(e.target.value)} required/>
                  <small className="text-muted">address line 2</small>
                </div>
                <div className="col-sm-4">
                  <input type="text" className="form-control form-control-user" value={pscode}
                  onChange={(e) => setPostalCode(e.target.value)} required/>
                  <small className="text-muted">postal code</small>
                </div>
              </div>     
              <div className="form-group row mb-3"> 
                <div className="col-sm-4">
                  <input type="text" className="form-control form-control-user" value={city}
                  onChange={(e) => setCity(e.target.value)} required/>
                  <small className="text-muted">chnage your city</small>
                </div>
                <div className="col-sm-4">
                  <input type="text" className="form-control form-control-user" value={area}
                  onChange={(e) => setArea(e.target.value)} required/>
                  <small className="text-muted">your province</small>
                </div>
                <div className="col-sm-4">
                  <input type="text" className="form-control form-control-user" value={country}
                  onChange={(e) => setCountry(e.target.value)} required/>
                  <small className="text-muted">update your country</small>
                </div>
              </div>
              <Button variant="contained" className="w-10" style={{background: "#ff8c00", width: 100+"%"}}
              startIcon={<SendIcon />} disableElevation type="submit">update my details</Button> 
            </form>
          </Modal.Body>
        </Modal>
        </div>
    );
};

export default UpdateProfile;