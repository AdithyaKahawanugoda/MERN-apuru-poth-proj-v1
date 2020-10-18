import React from 'react'
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Edit'

const Experience = ({title, company, description, from, to}) => {
  return (
    <div>
      <Paper style={{ padding: 10, borderRadius: 5 }} variant="outlined">
        <b><h5 className="text-color">{title}</h5></b>
        <p className="text-color">{description}</p>
        <h6 className="text-color">From : {moment(from).format('LL')}</h6>
        <h6 className="text-color">To : {moment(to).format('LL')}</h6>
        <Button variant="contained" disableElevation startIcon={<UpdateIcon/>}>
          edit experience
        </Button>
        <Button variant="contained" disableElevation startIcon={<DeleteIcon/>} className="ml-lg-2 ml-xl-2 ml-sm-0 pt-sm-2">
          delete experience
        </Button>
      </Paper>
    </div>
  )
}

export default Experience