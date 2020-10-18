import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'react-bootstrap/Image'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";
import Update from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import Cart from '../JAYE-cart/cart.display.component';
import Exit from '@material-ui/icons/ExitToApp'

const Profile = () => {
   const [userId, setUserId] = useState(null)
   const [name, setName] = useState(null)
   const [email, setEmail] = useState(null)
   const [phoneNumber, setPhone] = useState(null)
   const [address1, setAddress1] = useState(null)
   const [address2, setAddress2] = useState(null)
   const [city, setCity] = useState(null)
   const [postalCode, setPostalCode] = useState(null)
   const [country, setCountry] = useState(null)
   const [picture, setPicture] = useState(null)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      setLoading(true)
      const getUserData = async () => {
         try {
            const config = {
               headers: {
                  Authorization: localStorage.getItem("Authorization")
               },
            }
            await axios.get(`http://localhost:8059/user/profile`, config)
               .then((res) => {
                  setUserId(res.data.user._id)
                  setName(res.data.user.name)
                  setEmail(res.data.user.email)
                  setPhone(res.data.user.phoneNumber)
                  setAddress1(res.data.user.address_line_1)
                  setAddress2(res.data.user.address_line_2)
                  setCity(res.data.user.city)
                  setPostalCode(res.data.user.postal_code)
                  setCountry(res.data.user.country)
                  setPicture(res.data.user.profilePicture)
                  setLoading(false)
               }).catch((error) => {
                  console.log(error.message)
               })
         } catch (error) {
            console.log(error.message)
         }
      }
      getUserData()
   }, [])

   if (loading) {
      return <div className="d-flex justify-content-center" style={{ paddingTop: 400 }}>
         <CircularProgress hidden={false} />
      </div>
   }

   return (
      <div>
         <div className="container">
            <div className="row pt-5">
               <div className="col-2">
                  <Image src={picture} roundedCircle style={{ width: 220 }} />
               </div>
               <div className="col-10">
                  <div style={{ paddingLeft: 90 }}>
                     <Typography variant="h3" className="text-color">{name}</Typography>

                     <div className="row" style={{ paddingLeft: 15 }}>
                        <label>
                           <Typography variant="h5" className="text-color" >Email: {email}</Typography>
                        </label>
                        <label style={{ paddingLeft: 15 }}>
                           <Typography variant="h5" className="text-color">Phone Number: +94 {phoneNumber}</Typography>
                        </label>
                     </div>
                     <Typography variant="h5" className="text-color">Shipping Address</Typography>
                     <div className="row" style={{ paddingLeft: 15 }}>
                        <label>
                           <Typography variant="h6" className="text-color">No.{postalCode},</Typography>
                        </label>
                        <label>
                           <Typography variant="h6" style={{ paddingLeft: 5 }} className="text-color">{address1},</Typography>
                        </label>
                        <label>
                           <Typography variant="h6" style={{ paddingLeft: 5 }} className="text-color">{address2},</Typography>
                        </label>
                        <label>
                           <Typography variant="h6" style={{ paddingLeft: 5 }} className="text-color">{city},</Typography>
                        </label>
                        <label>
                           <Typography variant="h6" style={{ paddingLeft: 5 }} className="text-color">{country}</Typography>
                        </label>
                     </div>
                     <div className="row" style={{ paddingLeft: 15 }}>
                        <label>
                           <Button variant="outlined" startIcon={<Update />} style={{ borderRadius: 25 }}>
                              UPDATE MY ACCOUNT
                        </Button>
                        </label>
                        <label className="pl-2">
                           <Button variant="outlined" startIcon={<Delete />} style={{ borderRadius: 25 }}>
                              DELETE MY ACCOUNT
                        </Button>
                        </label>
                        <label className="pl-2">
                           <Button variant="outlined" startIcon={<Exit />} style={{ borderRadius: 25 }}>
                              LOGOUT
                        </Button>
                        </label>
                     </div>
                  </div>
               </div>
            </div>
            <hr />
            <Cart />
         </div>
      </div>
   )
}

export default Profile