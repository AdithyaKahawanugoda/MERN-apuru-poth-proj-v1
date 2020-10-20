import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Button from '@material-ui/core/Button'
// material table
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    color: '#ffffff',
  },
  head: {
    backgroundColor: "#282c34",
    color:'#ffffff',
  },
});

const Purchasehistory = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrderHistory = async () => {
      const config = {
        headers: {
           Authorization: localStorage.getItem("Authorization")
        },
      }
      await axios.get('http://localhost:8059/purchasehistory/display', config)
      .then((res) => {
        setOrders(res.data.purchasehistory)
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
    getOrderHistory()
  },[])

  return (
    <div className="pb-4">
      <h3 className="text-color">Purchase History</h3>
      <Button className="w-25" variant="contained"  className="mb-3" startIcon={<InsertDriveFileIcon/>} disableElevation>
        get purchase history
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead style={{backgroundColor: "#4f535a"}}>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell align="left">Total Price</TableCell>
              <TableCell align="left">Delivery Date</TableCell>
              <TableCell align="left">Handover Date</TableCell>
              <TableCell align="left">Delivery Method</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {orders.map((item) => (
            <TableRow key={item._id}>
              <TableCell component="th" scope="row">{item._id}</TableCell>
              <TableCell align="left">LKR {item.totalPrice}.00</TableCell>
              <TableCell align="left">{moment(item.deliveryDate).format('LL')}</TableCell>
              <TableCell align="left">{moment(item.handOverDate).format('LL')}</TableCell>
              <TableCell align="left">{item.deliverMethod != "" ? item.deliverMethod : "Processing..."}</TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Purchasehistory