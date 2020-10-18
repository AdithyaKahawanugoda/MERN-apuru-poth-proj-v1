import React from 'react'
import Button from '@material-ui/core/Button'

const Header = () => {
   const profile = () => {
      window.location = '/me'
   }

   const newAccount = () => {
      window.location = '/signup'
   }

   const home = () => {
      window.location = '/'
   }
   return (
      <div>
         <nav className="navbar navbar-light navbar-expand-lg bg-light shadow bg-white rounded fixed-top">
            <a className="navbar-brand" href="#">
               <img src={require('../../logo.png')} width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp;Apuru Book Publishers
        </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav" style={{ paddingTop: 2 }}>
                  <li className="nav-item active">
                     <Button onClick={home}>Home</Button>
                  </li>
                  <li className="nav-item">
                     <Button onClick={newAccount}>Create New Account</Button>
                  </li>
                  <li className="nav-item">
                     <Button onClick={profile}>My Profile</Button>
                  </li>
               </ul>

            </div>
         </nav>
      </div>
   )
}

export default Header