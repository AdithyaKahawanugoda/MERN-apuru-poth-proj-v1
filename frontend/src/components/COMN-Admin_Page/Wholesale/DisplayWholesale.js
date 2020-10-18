import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import UpdateOrder from "./UpdateOrder";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const DisplayWholesale = (orders) => {
  const [items, setItems] = useState([], orders);
  const [orderID, setOrderId] = useState(null);
  const classes = useStyles();
  const [modalShow, setModalShow] = useState(false);

  const updateTable = async () => {
    await axios
      .get("http://localhost:8059/wholesale/invoice/all")
      .then((res) => {
        setItems(res.data.orders);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const updateOrder = (orderId) => {
    setOrderId(orderId);
    setModalShow(true);
  };

  const deleteOrder = async (oid) => {
    await axios
      .delete(`http://localhost:8059/wholesale/invoice/delete/${oid}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    const getItems = async () => {
      await axios
        .get("http://localhost:8059/wholesale/invoice/all")
        .then((res) => {
          setItems(res.data.orders);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getItems();
  }, []);

  return (
    <div>
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-4">
          <button
            className="btn btn-warning"
            onClick={updateTable}
            style={{ margin: 5, boxShadow: "5px 4px 8px 1px #ccc8c8" }}
          >
            Upadte Table
          </button>
          <div className="table-responsive-sm">
            <table
              className="table table-striped table-bordered"
              style={{ borderRadius: 8 }}
            >
              {items.map((item) => {
                console.log(item.invoiceId);
              })}
              <thead className="bg-mattBlackLight">
                <tr>
                  <th scope="col">Retail Shop</th>
                  <th scope="col">Invoice Id</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Description</th>
                  <th scope="col" style={{ width: "10%" }}></th>
                  <th scope="col" style={{ width: "10%" }}></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr>
                    <td scope="col">{item.retailShop}</td>
                    <td scope="col">{item.invoiceId}</td>
                    <td scope="col">LKR {item.amount}</td>
                    <td scope="col">{item.placeDate.split("T", 1)}</td>
                    {/* {console.log("SplitCheck: " + item.placeDate.split("T", 1))} */}
                    <td scope="col">{item.description}</td>
                    <td scope="col">
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<UpdateIcon />}
                        onClick={() => {
                          updateOrder(item._id);
                        }}
                        style={{ width: 95 }}
                      >
                        Update
                      </Button>
                    </td>
                    <td scope="col">
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        style={{ width: 90 }}
                        onClick={() => {
                          deleteOrder(item._id);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <UpdateOrder
        show={modalShow}
        onHide={() => setModalShow(false)}
        orderID={orderID}
      />
    </div>
  );
};

export default DisplayWholesale;
