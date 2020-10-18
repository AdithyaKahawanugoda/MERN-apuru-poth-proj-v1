import React, { Component } from 'react';
import axios from 'axios';
import firebase from '../../../firebase'
import Button from "@material-ui/core/Button";
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import Progress from '../../Layouts/Progress'

export default class CreateAdvertisement extends Component {
  constructor(props) {
    super(props);   
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.state = {
      title: '',
      publisheddate: null,
      description: '',    
      image: null,
      imageUrl: null,
      uploadPercentage: 0
    }
  }

  uploadImage(e) {
    e.preventDefault()
    const fileName = this.state.title.concat(this.state.publisheddate)
    if (this.state.image != null) {
      let folderName = "Advertisements"
      let file = this.state.image
      let upload = firebase.storage().ref(`${folderName}/${fileName}`).put(file)
      upload.on("state_changed", (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        this.setState({uploadPercentage: progress})
      }, (err) => {
        alert(err.message)
      }, () => {
        upload.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url)
          this.setState({imageUrl: url})
          alert('Image upload successful')
        })
      })
    }
  }

  async onSubmit(e) {
   e.preventDefault();
    const Advertisement = {
      title: this.state.title,
      pdate: this.state.publisheddate,
      text: this.state.description,
      imageUrl: this.state.imageUrl
    }

    await axios.post('http://localhost:8059/advertisement/add', Advertisement)
    .then((res) => {
      alert(res.data.status)
      this.setState({
        title: '',
        publisheddate: null,
        description: '',    
        image: null,
        imageUrl: null,
      })
    })
    .catch((err) => {
      console.log(err)
      alert(err.message)
    })
  }

  render() {
    return (
      <div className="pt-3">
        <div className="card shadow mb-4 text-color">
          <div className="card-header py-3">
            <h4 className="m-0 font-weight-bold text-primary">
              Publish New Advertisement
            </h4>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Title</label>
                <input type="text" required className="form-control"
                onChange={e => this.setState({ title: e.target.value})}/>
              </div>
              <div className="form-group">
                <label>Publish Date</label>
                <input type="date" className="form-control" 
                onChange={e => this.setState({publisheddate: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea class="form-control" rows="3"
                onChange={e => this.setState({ description: e.target.value})}></textarea>
              </div>  
              <div className="form-group">
                <div className="input-group">
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="inputGroupFile04"
                    required onChange={e => this.setState({image: e.target.files[0]})}/>
                    <label className="custom-file-label" htmlFor="inputGroupFile04">Choose your profile picture</label>
                  </div>
                  <div className="input-group-append">
                    <button className="btn btn-outline-primary" type="button" 
                    onClick={this.uploadImage}>Upload</button>
                  </div>
                </div>
                <small className="text-muted">please click the upload button first</small>
              </div>
              <Progress percentage={this.state.uploadPercentage}/>
              <br/>
              <Button variant="contained" className="w-10" style={{background: "#ff8c00", width: 100+"%"}}
              disableElevation startIcon={<ViewCarouselIcon/>} type="submit">Publish this advertisement</Button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}