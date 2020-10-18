import React, { Component } from 'react';
import {Line, Bar} from 'react-chartjs-2'
import axios from 'axios'

export default class LineChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
          chartData: {},
          january: 0,
          february: 0,
          march: 0,
          april: 0,
          may: 0,
          june: 0,
          july: 0,
          august: 0,
          september: 0,
          octomber: 0,
          november: 0,
          december: 0,
          products: []
        }
    }

    async componentDidMount() {
      await axios.get('http://localhost:8059/admin/getchart').then((res) => {
        this.setState({ products: res.data.products })
        console.log(res.data.products)
      }).catch((err) => {
        console.log(err.message)
      })
  
      this.state.products.map((item) => {
        let month = item.addDate.split('-')
        if (month[1] == 1) {
          this.setState({january: this.state.january + item.quantity})
        }
        if (month[1] == 2) {
          this.setState({february: this.state.february + item.quantity})
        }
        if (month[1] == 3) {
          this.setState({march: this.state.march + item.quantity})
        }
        if (month[1] == 4) {
          this.setState({april: this.state.april + item.quantity})
        }
        if (month[1] == 5) {
          this.setState({may: this.state.may + item.quantity})
        }
        if (month[1] == 6) {
          this.setState({june: this.state.june + item.quantity})
        }
        if (month[1] == 7) {
          this.setState({july: this.state.july + item.quantity})
        }
        if (month[1] == 8) {
          this.setState({august: this.state.august + item.quantity})
        }
        if (month[1] == 9) {
          this.setState({september: this.state.september + item.quantity})
        }
        if (month[1] == 10) {
          this.setState({octomber: this.state.octomber + item.quantity})
        }
        if (month[1] == 11) {
          this.setState({november: this.state.november + item.quantity})
        }
        if (month[1] == 12) {
          this.setState({december: this.state.december + item.quentity})
        }
      }) 

      this.setState({  
        chartData:{
          type: "line",
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets:[
            {
              label:'Months',
              data:[
                this.state.january,
                this.state.february,
                this.state.march,
                this.state.april,
                this.state.may,
                this.state.june,
                this.state.july,
                this.state.august,
                this.state.september,
                this.state.octomber,
                this.state.november,
                this.state.december
              ],
              backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
              ]
            }
          ]
        }
      });
    }

    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
        location:'City'
      }

    render() {
      return (
        <div className='chart'>
          <h3>{this.props.location}</h3>
          <Bar
              data={this.state.chartData}
              options={{
                title:{
                  display:this.props.displayTitle,
                  text: "Item Quantity Per Month",
                  fontSize:25
                },
                legend:{
                  display:this.props.displayLegend,
                  position:this.props.legendPosition
                }
              }}
          />
        </div>
      )
    }
}