import React, { Component } from 'react';
import axios from 'axios';
import Progress from './Progress'
import firebase from '../../firebase'

export default class AdminRegister extends Component {
  constructor(props) {
    super();

    this.onChangeFirstName = this.onChangeFirstName.bind(this)
    this.onChangeLastName = this.onChangeLastName.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChnagePhoneNumber = this.onChnagePhoneNumber.bind(this)
    this.onChangePassword1 = this.onChangePassword1.bind(this)
    this.onChangePassword2 = this.onChangePassword2.bind(this)
    this.onChangeImage = this.onChangeImage.bind(this)
    this.onChangeDOB = this.onChangeDOB.bind(this)
    this.onAdminFormSubmit = this.onAdminFormSubmit.bind(this)
    this.uploadImage = this.uploadImage.bind(this)

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      DOB: new Date(),
      password1: "",
      password2: "",
      image: null,
      imageUrl: null,
      uploadPercentage: 0
    }
  }

  onChangeFirstName(e) { this.setState({ firstName: e.target.value}) }
  onChangeLastName(e) { this.setState({ lastName: e.target.value}) }
  onChangeEmail(e) { this.setState({ email: e.target.value}) }
  onChnagePhoneNumber(e) { this.setState({ phoneNumber: e.target.value}) }
  onChangePassword1(e) { this.setState({ password1: e.target.value})}
  onChangePassword2(e) { this.setState({ password2: e.target.value})}
  onChangeImage(e) { this.setState({ image: e.target.files[0]})}
  onChangeDOB(e) { this.setState({DOB: e.target.value}) }

  uploadImage(e) {
    e.preventDefault()
    if (this.state.image != null) {
      let folderName = "Admin-Images"
      let file = this.state.image
      let uploadTask = firebase.storage().ref(`${folderName}/${this.state.email}`).put(file)
      uploadTask.on("state_changed", (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        this.setState({uploadPercentage: progress})
      }, (error) => {
        console.log(error.message)
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url)
          this.setState({imageUrl: url})
          alert('Profile Image Uploaded Successfully')
        })
      })
    }
  }

  async onAdminFormSubmit(e) {
    e.preventDefault()
    let fullName = this.state.firstName.concat(" ", this.state.lastName)
    const admin = {
      name: fullName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      DOB: this.state.DOB,
      password: this.state.password1,
      profileImage: this.state.imageUrl
    }
    
    await axios.post('http://localhost:8059/adminprofile/create', admin)
    .then((res) => {
      alert(res.data.status)
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  render() {
    return (
      <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-admin-register"></div>
            <div className="col-lg-7 col-sm-12">
              <div className="p-5">
                <div className="text-center text-color">
                  <h1 className="h4 text-gray-900 mb-4">Create Admin Account!</h1>
                </div>
                <form className="user" onSubmit={this.onAdminFormSubmit}>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input type="text" className="form-control form-control-user" placeholder="First Name" 
                      onChange={this.onChangeFirstName} required/>
                    </div>
                    <div className="col-sm-6">
                      <input type="text" className="form-control form-control-user" placeholder="Last Name"
                      onChange={this.onChangeLastName} required/>
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control form-control-user" placeholder="Email Address"
                    onChange={this.onChangeEmail} required/>
                  </div>
                  <div className="form-group row mb-3">
                    <div className="col-sm-6">
                      <input type="tel" className="form-control form-control-user" placeholder="Phone Number"
                      onChange={this.onChnagePhoneNumber} pattern="[0-9]{10}" required/>
                    </div>
                    <div className="col-sm-6">
                      <input type="date" className="form-control form-control-user" placeholder="Date Of Birth"
                      onChange={this.onChangeDOB} required/>
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <div className="col-sm-6">
                      <input type="password" className="form-control form-control-user" placeholder="Password"
                      onChange={this.onChangePassword1} required/>
                    </div>
                    <div className="col-sm-6">
                      <input type="password" className="form-control form-control-user" placeholder="Repeat Password"
                      onChange={this.onChangePassword2}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile04"
                        onChange={this.onChangeImage} />     
                        <label className="custom-file-label" htmlFor="inputGroupFile04">Choose your profile picture</label>
                      </div>
                      <div className="input-group-append">
                        <button className="btn btn-outline-primary" type="button" 
                        onClick={this.uploadImage}>Upload</button>
                      </div>
                    </div>
                    <small className="text-muted">click on the upload button first</small>
                  </div>
                  <Progress percentage={this.state.uploadPercentage}/>
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
}