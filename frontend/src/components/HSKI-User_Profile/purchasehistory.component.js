import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";
// import Update from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';

const Purchasehistory = () => {
   const [purchasehistory, setPurchasehistory] = useState([])
   const [loading, setLoading] = useState(true)
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   useEffect(() => {
      setLoading(true)
      const getPurchasehistoryItems = async () => {
         try {
            const config = {
               headers: {
                  Authorization: localStorage.getItem("Authorization")
               },
            }
            await axios.get(`http://localhost:8059/purchasehistory/display`, config)
               .then((res) => {
                  setPurchasehistory(res.data.purchasehistory)
                  setLoading(false)
               })
               .catch((error) => {
                  console.log(error.message)
               })
         } catch (error) {
            console.log(error.message)
         }
      }
      getPurchasehistoryItems()
   }, [])

   if (loading) {
      return <div className="d-flex justify-content-center" style={{ paddingTop: 400 }}>
         <CircularProgress hidden={true} />
      </div>
   }

//    const generateReport = async () => {
//       const obj = {purchasehistoryItems: purchasehistory}
//       await axios.post('http://localhost:8059/report-generator/generatepurchsehistoryreport', obj).then(() => {
//         alert('Report generated')
//       }).catch((err) => {
//         console.log(err.message)
//       })
//    }

// Create search function to search for the purchased items
// 
// 

   return (
      <div>
         {purchasehistory.length !== 0 ?
            <div>
               <h3>My Purchase History</h3>
               <hr />
               <table className="table table-bordered">
                  <thead>
                     <tr>
                        <th scope="col">ITEMS</th>
                        <th scope="col">TOTAL PRICE</th>
                        <th scope="col">DISCOUNT</th>
                        <th scope="col">DELETE</th>
                     </tr>
                  </thead>
                  <tbody>
                     {purchasehistory.map((row) => (
                        <tr>
                           <td>{row.Item}</td>
                           <td>{row.checkoutAmount}</td>
                           <td>{row.percentage}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
               <div className="d-flex justify-content-end" style={{ paddingTop: 10 }}>
                  <div className="row">
                     {/* <label>
                        <Button variant="outlined" startIcon={<Update />} style={{ borderRadius: 25, width: 190, marginRight: 10 }}
                        onClick={generateReport}>
                           GENERATE REPORT
                     </Button>
                     </label> */}
                     <label>
                        <Button variant="outlined" startIcon={<DeleteIcon />} style={{ borderRadius: 25, width: 150 }}></Button>
                     </label>
                  </div>
               </div>
            </div>
            : <div></div>}
      </div>
   )
}

export default Purchasehistory