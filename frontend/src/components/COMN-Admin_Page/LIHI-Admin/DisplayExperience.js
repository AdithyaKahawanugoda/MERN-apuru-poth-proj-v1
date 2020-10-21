import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Edit'
import UpdateExperience from './UpdateExperience'

const DisplayExperience = ({experience}) => {
  const [id, setId] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [company, setCompany] = useState("")
  const [from ,setFrom] = useState(new Date())
  const [to ,setTo] = useState(new Date())
  const [show,setShow] = useState(false)

  const updateExp = (expid, exptitle, expdescription,expcompany, expfrom, expto) => {
    setId(expid)
    setTitle(exptitle)
    setDescription(expdescription)
    setCompany(expcompany)
    setFrom(expfrom)
    setTo(expto)
    setShow(true)
  }

  const deleteExp = async (itemid) => {
    const config = {
      headers: {
         Authorization: localStorage.getItem("Authorization")
      },
    }
    await axios.delete(`http://localhost:8059/adminprofile/delete-experience/${itemid}`, config)
    .then((res) => {
      alert("Experience Deleted")
      window.location ="/admin/profile"
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  return (
    <div>
      <div className="card shadow mb-4 w-100">
        <div className="card-header py-3">
          <h4 className="m-0 font-weight-bold text-primary">
            My Experiences
          </h4>
        </div>
        <div className="card-body">
          {experience.map((item) => (
            <div className="pb-2">
              <Paper style={{ padding: 10, borderRadius: 5 }} variant="outlined">
                <b><h5 className="text-color">{item.title}</h5></b>
                <p className="text-color">{item.description} 
                  <div className="text-muted">
                  in <b>{item.company}</b>
                  </div>
                </p>
                <h6 className="text-color">From : {moment(item.from).format('LL')}</h6>
                <h6 className="text-color">To : {moment(item.to).format('LL')}</h6>
                <Button variant="contained" disableElevation startIcon={<UpdateIcon/>}
                onClick={() => {updateExp(item._id, item.title, item.description, item.company, item.from, item.to)}}>
                  edit experience
                </Button>
                <Button variant="contained" disableElevation startIcon={<DeleteIcon/>} className="ml-lg-2 ml-xl-2 ml-sm-0 pt-sm-2"
                onClick={() => {deleteExp(item._id)}}>
                  delete experience
                </Button>
              </Paper>
            </div>
          ))}
        </div>
      </div>
      <UpdateExperience
        id={id}
        title={title}
        description={description}
        company={company}
        from={from}
        to={to}
        show={show}
        onHide={() => setShow(false)}
      />
    </div>
  )
}

export default DisplayExperience