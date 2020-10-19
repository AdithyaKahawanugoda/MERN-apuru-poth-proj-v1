import React, {useState} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import UpdateRequestBook from './UpdateRequestBook'

const SingleBookRequest = ({authorName, bookName, printedYear, itemId}) => {
  const [show, setShow] = useState(false)

  const updateRequest = () => {
    setShow(true)
  }

  const deleteRequest = async () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization")
     },
    }
    await axios.delete(`http://localhost:8059/request/delete/${itemId}`, config)
    .then((res) => {
      alert(res.data.status)
      window.location = "/me"
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  return (
    <div className="pb-2">
      <Paper variant="outlined" elevation={0} className="p-2">
        <h5 className="text-color font-weight-bold">{bookName}</h5>
        <div className="text-color">Author Name - {authorName}</div>
        <div className="text-color">Printed Year - {printedYear}</div>

        <div className="d-flex justify-content-end">
          <IconButton aria-label="edit" style={{background: "#ff8c00", marginRight: 8}}
          onClick={updateRequest}>
            <EditIcon/>
          </IconButton>
          <IconButton aria-label="edit" style={{background: "#ff8c00"}}
          onClick={deleteRequest}>
            <DeleteIcon/>
          </IconButton>
        </div>
      </Paper>

      <UpdateRequestBook
        show={show}
        onHide={() => setShow(false)}
        itemId={itemId}
        bookName={bookName}
        authorName={authorName}
        printedYear={printedYear}
      />
    </div>
  )
}

export default SingleBookRequest