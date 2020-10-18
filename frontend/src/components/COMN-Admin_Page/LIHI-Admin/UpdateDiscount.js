import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Modal } from "react-bootstrap";
import Calendar from 'react-calendar';
import DatePicker from "react-datepicker";

const UpdateDiscount = ({show, onHide, discountId}) => {
  const [publishingTitle, setPublishingTitle] = useState('')
  const [marketPrice, setMarketPrice] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [validDate, setDate] = useState(new Date())
  const [ammount, setAmount] = useState(0)

  useEffect(() => {
    const getDiscountData = async () => {
      await axios.get(`http://localhost:8059/discounts/get/${discountId}`)
      .then((res) => {
        setPublishingTitle(res.data.publishingTitle)
        setMarketPrice(res.data.marketPrice)
        setPercentage(res.data.percentage)
        setDate(new Date(res.data.validDate))
        setAmount(res.data.ammount)
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
    getDiscountData()
  }, [discountId])

  const setNewDate = (date) => {
    setDate(date)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const discount = {
      publishingTitle: publishingTitle,
      marketPrice: marketPrice,
      percentage: percentage,
      ammount: ammount,
      validDate: validDate
    }

    await axios.post(`http://localhost:8059/discounts/updatediscount/${discountId}`, discount)
    .then((res) => {
      alert('Discount Updated')
    })
    .catch((err) => {
      alert(err.message)
    })
  } 

  return (
    <div>
    {console.log(discountId)}
    <Modal show={show} onHide={onHide} animation={true} size="lg"
      aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="text-color">Update Discount Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit} className="text-color">
              <div className="form-group">
                <label>publishingTitle: </label>
                <input type="text" required className="form-control" value={publishingTitle}
                onChange={(e) => {setPublishingTitle(e.target.value)}} />
              </div>
              <div className="form-group">
                <label>marketPrice: </label>
                <input type="text" required className="form-control" value={marketPrice}
                onChange={(e) => {setMarketPrice(e.target.value)}} />
              </div>
              <div className="form-group">
                <label>percentage: </label>
                <input type="text" className="form-control" value={percentage}
                onChange={(e) => {setPercentage(e.target.value)}} />
              </div>
              <div className="form-group">
                <label>Date: </label>
                <div>
                  <Calendar value={validDate} onChange={setNewDate} />
                </div>
                <div className="form-group">
                  <label>Ammount: </label>
                  <input type="text" className="form-control" value={ammount} 
                  onChange={(e) => {setAmount(e.target.value)}} />
                </div>
              </div>
              <div className="form-group">
                <input type="submit" value="Edit Discount" className="btn btn-warning" />
              </div>
            </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default UpdateDiscount