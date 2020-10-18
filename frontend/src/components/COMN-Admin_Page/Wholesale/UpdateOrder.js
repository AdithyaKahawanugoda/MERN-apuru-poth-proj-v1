import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: 27 + "px",
    width: 130 + "px",
  },
}));

const UpdateOrder = ({ show, onHide, orderID }) => {
  const classes = useStyles();
  const [retailShop, setRetailShop] = useState(null);
  const [invoiceId, setInvoiceId] = useState(null);
  const [amount, setAmount] = useState(null);
  const [placeDate, setPlaceDate] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    const getOrderDetails = async () => {
      await axios
        .get(`http://localhost:8059/wholesale/invoice/${orderID}`)
        .then((res) => {
          setRetailShop(res.data.order.retailShop);
          setInvoiceId(res.data.order.invoiceId);
          setAmount(res.data.order.amount);
          setPlaceDate(res.data.order.placeDate.split("T", 1));
          setDescription(res.data.order.description);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getOrderDetails();
  }, [orderID]);

  const updateHandler = async () => {
    let updatedOrder = {
      retailShop: retailShop,
      invoiceId: invoiceId,
      amount: amount,
      placeDate: placeDate,
      description: description,
    };
    await axios
      .post(
        `http://localhost:8059/wholesale/invoice/update/${orderID}`,
        updatedOrder
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        animation={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <small class="form-text text-color">Retail Shop</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  placeholder="Retail Shop Name"
                  value={retailShop}
                  onChange={(e) => setRetailShop(e.target.value)}
                  required
                />
              </div>
              <div className="col-sm-6">
                <small class="form-text text-color">Invoice ID</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  placeholder="Invoice ID"
                  value={invoiceId}
                  onChange={(e) => setInvoiceId(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <small class="form-text text-color">Amount</small>
                <input
                  type="number"
                  className="form-control form-control-user"
                  placeholder="Total Amount"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />{" "}
              </div>
              <div className="col-sm-6">
                <small class="form-text text-color">Place Date</small>
                <input
                  type="date"
                  className="form-control form-control-user"
                  placeholder="Place Date"
                  value={placeDate}
                  onChange={(e) => setPlaceDate(e.target.value)}
                  required
                />{" "}
              </div>
            </div>
            <div className="form-group">
              <small class="form-text text-color">Description</small>
              <textarea
                type="text"
                className="form-control form-control-user"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="float-right">
              <Button
                variant="contained"
                color="primary"
                size="medium"
                type="submit"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={() => {
                  updateHandler();
                }}
              >
                Save
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateOrder;
