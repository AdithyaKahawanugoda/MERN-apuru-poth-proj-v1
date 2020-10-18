import React, { Component } from 'react';
import CreateDelivery from '../../YASA-Delivery_Page/create-delivery.component'
import SendEmail from '../../YASA-Delivery_Page/emaildelivery.component'
import DisplayDelivery from '../../YASA-Delivery_Page/delivery-list.component'

export default class DeliveryPage extends Component {
  

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-5 col-sm-12">
            <CreateDelivery/>
          </div>
          <div className="col-lg-7 col-sm-12">
            <SendEmail/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <DisplayDelivery/>
          </div>
        </div>
      </div>
    )
  }
}