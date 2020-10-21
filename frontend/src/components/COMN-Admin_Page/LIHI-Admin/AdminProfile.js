import React, { Component } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import firebase from '../../../firebase'
import Progress from '../../Layouts/Progress'
import DisplayExperience from './DisplayExperience'
import Button from '@material-ui/core/Button'
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export default class AdminProfile extends Component {
  constructor(props) {
    super();
    this.uploadImage = this.uploadImage.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.sendNewExperience = this.sendNewExperience.bind(this);
    this.submitAdminUpdate = this.submitAdminUpdate.bind(this);

    this.state ={ 
      name: "",
      email: "",
      phoneNumber: "",
      profileImage: "",
      experience: [],
      uploadPercentage: 0,
      image: null,
      title: "",
      company: "",
      description: "",
      from: new Date(),
      to: new Date(),
    }
  }

  async componentDidMount() {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    }
    await axios.get('http://localhost:8059/adminprofile/adminprofile', config)
    .then((res) => {
      this.setState({ 
        name: res.data.admin.name, 
        email: res.data.admin.email,
        phoneNumber: res.data.admin.phoneNumber,
        profileImage: res.data.admin.profileImage,
        experience: res.data.admin.experience
      })
    })
    .catch((err) => {
      console.log(err)
      alert(err.message)
    })
  }

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
          this.setState({profileImage: url})
          alert('Profile Image Uploaded Successfully')
        })
      })
    }
  }

  onChangeImage(e) {
    e.preventDefault()
    this.setState({image: e.target.files[0]})
  }

  async submitAdminUpdate(e) {
    e.preventDefault()
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    }

    const data = {
      name: this.state.name,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      profileImage: this.state.profileImage
    }

    await axios.put('http://localhost:8059/adminprofile/update', data, config)
    .then((res) => {
      alert(res.data.status)
      window.location = "/admin/profile"
    })
    .catch((err) => {
      console.log(err)
    })
  }

  async sendNewExperience(e) { 
    e.preventDefault()
    const config = {
      headers: {
         Authorization: localStorage.getItem("Authorization")
      },
    }
    const addNew = {
      title: this.state.title, 
      description: this.state.description, 
      company: this.state.company,
      from: this.state.from,  
      to: this.state.to,
    }
    await axios.post('http://localhost:8059/adminprofile/addexp', addNew, config)
    .then((res) => {
      alert('Experience Added')
      window.location = "/admin/profile"
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  render() {
    return (
      <div>
        <div className="row pt-3">
          <div className="col-xl-6 col-lg-6 col-sm-12">
            <div className="row mx-auto">
              <div className="card shadow mb-4 w-100">
                <div className="card-header py-3">
                  <h4 className="m-0 font-weight-bold text-primary">
                    Welcome, {this.state.name}
                  </h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-4 col-sm-12">
                      <Image src={this.state.profileImage} roundedCircle style={{ width: 220 }} />
                    </div>
                    <div className="col-lg-8 col-sm-12">
                      <form onSubmit={this.submitAdminUpdate}>
                        <div className="form-group">
                          <input type="text" className="form-control form-control-user" value={this.state.name}
                          onChange={e => this.setState({name: e.target.value})}/>
                          <small className="text-muted"><i>make changes to name</i></small>
                        </div>
                        <div className="form-group">
                          <input type="email" className="form-control form-control-user" value={this.state.email}
                          onChange={e => this.setState({ email: e.target.value})} required/>
                          <small className="text-muted"><i>make changes to email</i></small>
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control form-control-user" value={this.state.phoneNumber}
                          onChange={e => this.setState({ phoneNumber: e.target.value})}/>
                          <small className="text-muted"><i>make changes to phone number</i></small>
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
                          <small className="text-muted"><i>click on the upload button first</i></small>
                        </div>
                        <Progress percentage={this.state.uploadPercentage}/>
                        <br/>
                        <Button className="w-100" variant="contained" disableElevation type="submit" style={{background: "#ff8c00", width: 100+"%"}}>
                          update account
                        </Button> 
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mx-auto">
              <div className="card shadow mb-4 w-100">
                <div className="card-header py-3">
                  <h5 className="m-0 font-weight-bold text-primary">
                    Add New Experience
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <form onSubmit={this.sendNewExperience}>
                        <div className="form-group">
                          <input type="text" className="form-control form-control-user" placeholder="Title" 
                          onChange={e => this.setState({ title: e.target.value })} required/>
                          <small className="text-muted"><i>your experience title</i></small>
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control form-control-user" placeholder="Company" 
                          onChange={e => this.setState({ company: e.target.value })} required/>
                          <small className="text-muted"><i>tell us where you work</i></small>
                        </div>
                        <div className="form-group">
                          <textarea className="form-control" rows="3" placeholder="Description" 
                          onChange={e => this.setState({ description: e.target.value })} required></textarea>
                          <small className="text-muted"><i>add little decription of your work</i></small>
                        </div>
                        <div className="form-group row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input type="date" className="form-control form-control-user" placeholder="From"
                            onChange={e => this.setState({ from: e.target.value})} required/>
                            <small className="text-muted"><i>when you <b>start</b> work</i></small>
                          </div>
                          <div className="col-sm-6">
                            <input type="date" className="form-control form-control-user" placeholder="To"
                            onChange={e => this.setState({to: e.target.value })} required/>
                            <small className="text-muted"><i>tell us when you <b>stop</b> work on their</i></small>
                          </div>
                        </div>
                        <Button variant="contained" className="w-10" style={{background: "#ff8c00", width: 100+"%"}}
                        startIcon={<PersonAddIcon />} disableElevation type="submit">ADD THIS EXPERIENCE TO LIST</Button>
                      </form>  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <DisplayExperience experience={this.state.experience}/>
          </div>
        </div>
      </div>
    )
  }
}