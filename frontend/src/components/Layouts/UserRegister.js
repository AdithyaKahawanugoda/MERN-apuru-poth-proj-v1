import React, { useState, useEffect } from "react";
import axios from "axios";
import firebase from "../../firebase";
import Progress from "./Progress"
import Snackbar from '@material-ui/core/Snackbar'

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [dob, setDOB] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [address1, setAddress1] = useState(null);
  const [address2, setAddress2] = useState(null);
  const [city, setCity] = useState(null);
  const [province, setProvince] = useState(null);
  const [country, setCountry] = useState(null);
  const [password1, setPassowrd1] = useState(null);
  const [passowrd2, setPassowrd2] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  let [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  let fullName = null;

  const uploadImage = (e) => {
    e.preventDefault()
    if (image != null) {
      let folderName = "Profile-Images";
      let file = image;
      let upload = firebase.storage().ref(`${folderName}/${email}`).put(file)
      upload.on("state_changed", (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setUploadPercentage(progress)
      }, (err) => {
        console.log(err)
      },() => {
        upload.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url)
          setImageUrl(url)
        })
      })
    }
  }

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
       return;
    }
    setOpen(false);
 };

  const submitUserData = async (e) => {
    e.preventDefault();
    if (password1 !== passowrd2) {
      setOpen(true)
    }
    fullName = firstName.concat(" ", lastName);

    let user = {
      name: fullName,
      add1: address1,
      add2: address2,
      city: city,
      area: province,
      pscode: postalCode,
      country: country,
      phone: phoneNumber,
      DOB: dob,
      email: email,
      pwd: password1,
      imageUrl: imageUrl,
    };

    console.log(user)

    await axios
      .post("http://localhost:8059/user/signup", user)
      .then((res) => {
        setError("Account Created Successfully");
        localStorage.setItem("Authorization", res.data.token);
        window.location = "/me";
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="container text-color">
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}>
      <div className="alert alert-danger">
          Passwords are not Matched !!!
      </div>
    </Snackbar>
    <div className="card o-hidden border-0 shadow-lg my-5">
      <div className="card-body p-0">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div className="col-lg-7">
            <div className="p-5">
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
              </div>
              <form className="user" onSubmit={submitUserData}>
                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input type="text" className="form-control form-control-user" placeholder="First Name" 
                    onChange={(e) => setFirstName(e.target.value)} required/>
                  </div>
                  <div className="col-sm-6">
                    <input type="text" className="form-control form-control-user" placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)} required/>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <input type="email" className="form-control form-control-user" placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="form-group row mb-3">
                  <div className="col-sm-6">
                    <input type="tel" className="form-control form-control-user" placeholder="Phone Number"
                    onChange={(e) => setPhoneNumber(e.target.value)} pattern="[0-9]{10}" required/>
                  </div>
                  <div className="col-sm-6">
                    <input type="date" className="form-control form-control-user" placeholder="Date Of Birth"
                    onChange={(e) => setDOB(e.target.value)} required/>
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <div className="col-sm-3">
                    <input type="text" className="form-control form-control-user" placeholder="Postal Code"
                    onChange={(e) => setPostalCode(e.target.value)} required/>
                  </div>
                  <div className="col-sm-5">
                    <input type="text" className="form-control form-control-user" placeholder="Lane 1"
                    onChange={(e) => setAddress1(e.target.value)} required/>
                  </div>
                  <div className="col-sm-4">
                    <input type="text" className="form-control form-control-user" placeholder="Lane 2"
                    onChange={(e) => setAddress2(e.target.value)} required/>
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <div className="col-sm-4">
                    <input type="text" className="form-control form-control-user" placeholder="City"
                    onChange={(e) => setCity(e.target.value)} required/>
                  </div>
                  <div className="col-sm-4">
                    <input type="text" className="form-control form-control-user" placeholder="Province"
                    onChange={(e) => setProvince(e.target.value)} required/>
                  </div>
                  <div className="col-sm-4">
                    <input type="text" className="form-control form-control-user" placeholder="Country"
                    onChange={(e) => setCountry(e.target.value)} required/>
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <div className="col-sm-6">
                    <input type="password" className="form-control form-control-user" placeholder="Password"
                    onChange={(e) => setPassowrd1(e.target.value)} required/>
                  </div>
                  <div className="col-sm-6">
                    <input type="password" className="form-control form-control-user" placeholder="Repeat Password"
                    onChange={(e) => setPassowrd2(e.target.value)}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="inputGroupFile04"
                      onChange={(e) => setImage(e.target.files[0])} required/>
                      <label className="custom-file-label" htmlFor="inputGroupFile04">Choose your profile picture</label>
                    </div>
                    <div className="input-group-append">
                      <button className="btn btn-outline-primary" type="button" 
                      onClick={uploadImage}>Upload</button>
                    </div>
                  </div>
                </div>
                <Progress percentage={uploadPercentage}/>
                <br/>
                <button className="btn btn-primary btn-user btn-block">
                  Register Account
                </button>
                
              </form>
              <hr/>
              <div className="text-center">
                <a className="small" href="forgot-password.html">Forgot Password?</a>
              </div>
              <div className="text-center">
                <a className="small" href="login.html">Already have an account? Login!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SignUp
