import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'react-bootstrap/Image'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";
import Update from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import Exit from '@material-ui/icons/ExitToApp'
import DisplayRequests from '../NITH-RequestBook/DisplayRequestBook-User'
import DisplayWishlist from './DisplayWishlist'
import Purchasehistory from './purchasehistory.component'
import UpdateProfile from './updateprofile.component'

const Profile = () => {
   const [userId, setUserId] = useState(null)
   const [name, setName] = useState(null)
   const [email, setEmail] = useState(null)
   const [phoneNumber, setPhone] = useState(null)
   const [address1, setAddress1] = useState(null)
   const [address2, setAddress2] = useState(null)
   const [city, setCity] = useState(null)
   const [postalCode, setPostalCode] = useState(null)
   const [province, setProvince] = useState(null)
   const [country, setCountry] = useState(null)
   const [picture, setPicture] = useState(null)
   const [loading, setLoading] = useState(true)
   const [show, setShow] = useState(false)

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
                setProvince(res.data.user.area_province)
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

   const updateUserProfile = () => {
     setShow(true)
   }

   const userLogout = () => {
     localStorage.removeItem('role')
     localStorage.removeItem('Authorization')
     window.location = "/login"
   }

   const deleteAccount = async () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };
      await axios.delete('http://localhost:8059/user/delete', config)
      .then((res) => {
        alert('Your Account has been deleted')
        localStorage.removeItem('role')
        localStorage.removeItem('Authorization')
        window.location="/signup"
      })
      .catch((err) => {
        console.log(err.message)
      })
   }

   if (loading) {
      return <div className="d-flex justify-content-center" style={{ paddingTop: 400 }}>
         <CircularProgress hidden={false} />
      </div>
   }

   return (
      <div>
         <div className="container">
            <div className="row pt-5">
               <div className="col-lg-2 col-sm-12">
                  <Image src={picture} roundedCircle style={{ width: 220 }} />
               </div>
               <div className="col-lg-10 col-sm-12">
                  <div style={{ paddingLeft: 90 }}>
                     <h1 variant="h3" className="text-color">{name}</h1>

                     <div className="row" style={{ paddingLeft: 15 }}>
                        <label>
                           <h5 variant="h5" className="text-color" >Email: {email}</h5>
                        </label>
                        <label style={{ paddingLeft: 15 }}>
                           <h5 variant="h5" className="text-color">Phone Number: +94 {phoneNumber}</h5>
                        </label>
                     </div>
                     <h3 variant="h5" className="text-color">Shipping Address</h3>
                     <div className="row" style={{ paddingLeft: 15 }}>
                        <label>
                           <h5 variant="h6" className="text-color">No.{postalCode},</h5>
                        </label>
                        <label>
                           <h5 variant="h6" style={{ paddingLeft: 5 }} className="text-color">{address1},</h5>
                        </label>
                        <label>
                           <h5 variant="h6" style={{ paddingLeft: 5 }} className="text-color">{address2},</h5>
                        </label>
                        <label>
                           <h5 variant="h6" style={{ paddingLeft: 5 }} className="text-color">{city},</h5>
                        </label>
                        <label>
                           <h5 variant="h6" style={{ paddingLeft: 5 }} className="text-color">{country}</h5>
                        </label>
                     </div>
                     <div className="row" style={{ paddingLeft: 15 }}>
                        <label>
                          <Button variant="outlined" startIcon={<Update />} style={{ borderRadius: 25 }}
                          onClick={updateUserProfile}>
                            UPDATE MY ACCOUNT
                          </Button>
                        </label>
                        <label className="pl-2">
                           <Button variant="outlined" startIcon={<Delete />} style={{ borderRadius: 25 }}
                           onClick={deleteAccount}>
                              DELETE MY ACCOUNT
                        </Button>
                        </label>
                        <label className="pl-2">
                           <Button variant="outlined" startIcon={<Exit />} style={{ borderRadius: 25 }}
                           onClick={userLogout}>
                              LOGOUT
                        </Button>
                        </label>
                     </div>
                  </div>
               </div>
            </div>
            <hr />
            <DisplayRequests />
            <hr/>
            <DisplayWishlist/>
            <hr/>
            <Purchasehistory/>
         </div>
         <UpdateProfile
          upname={name}
          upadd1={address1}
          upadd2={address2} 
          upcity={city}
          uparea={province}
          uppscode={postalCode}
          upcountry={country}
          upphone={phoneNumber}
          upemail={email}
          picture={picture}
          show={show}
          onHide={() => setShow(false)}
        />
      </div>
   )
}

export default Profile