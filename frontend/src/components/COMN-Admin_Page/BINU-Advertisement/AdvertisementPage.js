import React, { Component } from 'react';
import CreateAvertisement from './CreateAvertisement'

export default class AdvertisementPage extends Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-5">
            <CreateAvertisement />
          </div>
          <div className="col-7"></div>
        </div>
      </div>
    )
  }
}
