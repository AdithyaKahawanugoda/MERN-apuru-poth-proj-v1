import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import Button from "@material-ui/core/Button";

export default class CreateDiscounts extends Component {
  constructor(props) {
    super(props);
    this.onChangePublishingTitle = this.onChangePublishingTitle.bind(this);
    this.onChangeMarketPrice = this.onChangeMarketPrice.bind(this);
    this.onChangePercentage = this.onChangePercentage.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeAmmount = this.onChangeAmmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeItemId = this.onChangeItemId.bind(this);
    this.state = {
      publishingTitle: "",
      marketPrice: "",
      percentage: "",
      date: new Date(),
      ammount: 0,
      itemNames: [],
      itemId: "",
      discounts: [],
    };
  }

  async componentDidMount() {
    await axios.get('http://localhost:8059/discounts/getallitemsname')
    .then((res) => {
      this.setState({itemNames: res.data.items})
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  onChangePublishingTitle(e) { 
    let itemId = e.target.options[e.target.selectedIndex].id
    this.setState({ 
      publishingTitle: e.target.value,
      itemId: itemId
     })
    //console.log(e.target.options[e.target.selectedIndex].id)
  }


  onChangeItemId(e) { 
    this.setState({itemId: e.target.value})
    console.log(e.target.value)
  }

  onChangeMarketPrice(e) {
    this.setState({
      marketPrice: e.target.value,
    });
  }

  async onChangePercentage(e) {
    await this.setState({
      percentage: e.target.value,
    });
    console.log(this.state.percentage)
    await this.setState({
      ammount: (this.state.marketPrice * (100 - this.state.percentage)) / 100
    })
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    });
  }

  onChangeAmmount(e) {
    this.setState({
      ammount: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const Discounts = {
      itemId: this.state.itemId,
      publishingTitle: this.state.publishingTitle,
      marketPrice: this.state.marketPrice,
      percentage: this.state.percentage,
      ammount: this.state.ammount,
      validDate: this.state.date,
    };

    await axios
      .post("http://localhost:8059/discounts/create-discount", Discounts)
      .then((res) => {
        this.setState({
          publishingTitle: "",
          marketPrice: "",
          percentage: "",
          date: new Date(),
          ammount: 0,
        })
        this.forceUpdate()
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  render() {
    return (
      <div className="pt-3">
        <div className="card shadow mb-4 w-100">
          <div className="card-header py-3">
            <h4 className="m-0 font-weight-bold text-primary">
              Create New Discount
            </h4>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label className="text-color">Publishing Title: </label>
                <select required className="form-control" onChange={this.onChangePublishingTitle}>
                  {this.state.itemNames.map((item) => (
                    <option key={item._id} id={item._id}>
                      {item.publishingTitle}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="text-color">Market Price: </label>
                <input type="number" required className="form-control" value={this.state.marketPrice}
                onChange={this.onChangeMarketPrice}
                />
              </div>
              <div className="form-group">
                <label className="text-color">Percentage: </label>
                <input type="number" required className="form-control" value={this.state.percentage}
                onChange={this.onChangePercentage}
                />
              </div>
              <div className="form-group">
                <label className="text-color">Date: </label>
                <input type="date" required className="form-control" value={this.state.date}
                onChange={this.onChangeDate}
                />
              </div>
              <div className="form-group">
                <label className="text-color">New Amount</label>
                <input type="number" required className="form-control" value={this.state.ammount}
                onChange={this.onChangeAmmount}
                />
              </div>
              <div className="form-group">
                <Button variant="contained" className="w-10" style={{background: "#ff8c00", width: 100+"%"}}
                startIcon={<TrendingDownIcon />} disableElevation type="submit">create delivery</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
