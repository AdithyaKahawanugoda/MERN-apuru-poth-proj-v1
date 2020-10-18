import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Modal } from "react-bootstrap";
import Calendar from 'react-calendar';

const EditDelivery = ({show, onHide, deliveryId}) => {

  const [orderId, setOrderId] = useState(deliveryId)
  const [destination, setDestination] = useState('')
  const [method, setMethod] = useState('')
  const [handOverDate, setHandOverDate] = useState(new Date())
  const [receiver, setReceiver] = useState('')
  const [noofbooks, setNoofbooks] = useState(0)
  const [deliveryDate, setDeliveryDate] = useState(new Date())

  useEffect(() => {
    const getDelvieryDetails = async () => {
      await axios
        .get(`http://localhost:8059/delivery/${deliveryId}`)
        .then((res) => {
          setDestination(res.data.destination)
          setMethod(res.data.method)
          setHandOverDate(new Date(res.data.handoverdate))
          setReceiver(res.data.receiver)
          setNoofbooks(res.data.noofbooks)
          setDeliveryDate(new Date(res.data.deliverydate))
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    getDelvieryDetails()
  }, [deliveryId])

  const setNewHandoverDate = (date) => {
    setHandOverDate(date)
  }

  const setNewDeliveryDate = (date) => {
    setDeliveryDate(date)
  }

  const sendUpdateDelivery = async (e) => {
    e.preventDefault();
    const delivery = {
      destination: destination,
      method: method,
      handoverdate: handOverDate,
      receiver: receiver,
      noofbooks: noofbooks,
      deliverydate: deliveryDate
    }

    await axios.post(`http://localhost:8059/delivery/update/${deliveryId}`, delivery)
    .then((res) => {
      alert('Delivery Details Updated')
    })
    .catch((err) => {
      alert(err.message)
      console.log(err)
    })
  }

  return (
    <div>
    <Modal show={show} onHide={onHide} animation={true} size="lg"
        aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className="text-color">Update Delivery Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={sendUpdateDelivery} className="text-color">  
              <div className="form-group">
                <label>Destination: </label>
                <input type="text" required className="form-control" value={destination}
                onChange={(e) => setDestination(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Method: </label>
                <input type="text" required className="form-control" value={method}
                onChange={(e) => setMethod(e.target.value)} />
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <label>Handover Date: </label>
                  <div>
                    <Calendar value={handOverDate} onChange={setNewHandoverDate} />
                  </div>
                </div>
                <div className="col-sm-6">
                  <label>Delivery Date:</label>
                  <div>
                    <Calendar value={deliveryDate} onChange={setNewDeliveryDate} />
                  </div>
                </div>
              </div>     
              <div className="form-group">
                <label>Receiver: </label>
                <input type="text" required className="form-control" value={receiver}
                onChange={(e) => setReceiver(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Number of books:</label>
                <input type="number" required className="form-control" value={noofbooks}
                onChange={(e) => setNoofbooks(e.target.value)} />
              </div>
            <div className="form-group">
              <input
                type="submit"
                value="Edit Delivery"
                className="btn btn-warning"
              />
            </div>
            </form>
          </Modal.Body>
        </Modal>
    </div>
  )
}

export default EditDelivery