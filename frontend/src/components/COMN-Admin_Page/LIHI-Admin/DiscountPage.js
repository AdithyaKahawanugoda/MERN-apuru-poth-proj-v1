import React, { Component } from 'react';
import CreateDiscounts from './CreateDiscount'
import DiscountsList from './DisplayDicounts'

export default class Discount extends Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-4 col-sm-12">
            <CreateDiscounts />
          </div>
          <div className="col-lg-8 col-sm-12">
            <DiscountsList/>
          </div>
        </div>
      </div>
    )
  }
}