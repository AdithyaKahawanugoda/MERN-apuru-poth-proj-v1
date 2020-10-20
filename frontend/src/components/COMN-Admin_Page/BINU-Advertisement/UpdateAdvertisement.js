import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Modal } from "react-bootstrap";
import Calendar from 'react-calendar';
import Progress from '../../Layouts/Progress'
import firebase from '../../../firebase'
import Button from "@material-ui/core/Button";
import UpdateIcon from '@material-ui/icons/Update';

const UpdateAdvertisement = ({show, onHide, advertisementId}) => {
  const [title, setTitle] = useState()
  const [publisheddate, setPublishedDate] = useState()
  const [description, setDescription] = useState()
  const [image, setImage] = useState()
  const [imageUrl, setImageUrl] = useState('')
  const [percentage, setPercentage] = useState(0)


  useEffect(() => {
    const getAdvertisementData = async () => {
      await axios.get(`http://localhost:8059/advertisement/one/${advertisementId}`)
      .then((res) => {

        console.log(res.data.advertisement);
        setTitle(res.data.advertisement.title)
        setPublishedDate(new Date(res.data.advertisement.publisheddate))
        setDescription(res.data.advertisement.description)
        setImage(res.data.advertisement.image)
        
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
    getAdvertisementData()
  }, [advertisementId])

  const setNewDate = (date) => {
    setPublishedDate(date)
  }

  const uploadImage = (e) => {
    e.preventDefault()
    const fileName = title.concat(publisheddate)
    if (image != null) {
      let folderName = "Advertisements"
      let file = image
      let upload = firebase.storage().ref(`${folderName}/${fileName}`).put(file)
      upload.on("state_changed", (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setPercentage(progress)
      }, (err) => {
        alert(err.message)
      }, () => {
        upload.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url)
          setImageUrl(url)
          alert('Image upload successful')
        })
      })
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const advertiment = {
      title: title,
      pdate: publisheddate,
      text: description,
      imageUrl: imageUrl
    }

    await axios.post(`http://localhost:8059/advertisement/update/${advertisementId}`, advertiment)
    .then((res) => {
      alert('Advertisement Updated')
    })
    .catch((err) => {
      alert(err.message)
    })
  } 

  return (
    <div>
    {console.log(advertisementId)}
    <Modal show={show} onHide={onHide} animation={true} size="lg"
      aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="text-color">Update Advertisement Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit} className="text-color">
              <div className="form-group">
                <label>Title: </label>
                <input type="text" required className="form-control" value={title}
                onChange={(e) => {setTitle(e.target.value)}} />
              </div>
              <div className="form-group">
                <label>Description: </label>
                <input type="text" required className="form-control" value={description}
                onChange={(e) => {setDescription(e.target.value)}} />
              </div>
              <div className="form-group">
                <label>Published Date: </label>
                <div>
                  <Calendar value={publisheddate} onChange={setNewDate} />
                </div> 
              </div>
              <div className="form-group">
              <div className="input-group">
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="inputGroupFile04"
                  required onChange={(e) => {setImage(e.target.files[0])}}/>
                  <label className="custom-file-label" htmlFor="inputGroupFile04">Choose your profile picture</label>
                </div>
                <div className="input-group-append">
                  <button className="btn btn-outline-primary" type="button" 
                  onClick={uploadImage}>Upload</button>
                </div>
              </div>
              <small className="text-muted">please click the upload button first</small>
            </div>
            <Progress percentage={percentage}/>
            <br/>
            <Button variant="contained" className="w-10" style={{background: "#ff8c00", width: 100+"%"}}
            disableElevation startIcon={<UpdateIcon/>} type="submit">update advertisement details</Button>
            </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default UpdateAdvertisement