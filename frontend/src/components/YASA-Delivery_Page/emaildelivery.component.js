import React from 'react';
import emailjs from 'emailjs-com';
import Button from "@material-ui/core/Button";
import EmailIcon from '@material-ui/icons/Email';

export default function EmailDelivery() {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('gmail', 'template_7xvpv6t', e.target, 'user_UGihhbr5ExqsWdzCF06yN')
      .then((result) => {
          console.log(result.text);
          alert("success");
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <div className="pt-3">
      <div className="card shadow mb-4 w-100">
        <div className="card-header py-3">
          <h4 className="m-0 font-weight-bold text-primary">
            Send Delivery Email
          </h4>
        </div>
        <div className="card-body">
          <form className="contact-form text-color" onSubmit={sendEmail}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="to_name" className="form-control" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" className="form-control" />
              </div>
              <div className="form-group">
              <label>Message</label>
              <textarea name="message" rows="23" className="form-control"/>
              </div>    
              <div className="form-group">
              <Button variant="contained" className="w-10" style={{background: "#ff8c00", width: 100+"%"}}
              startIcon={<EmailIcon />} disableElevation type="submit">send email</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}