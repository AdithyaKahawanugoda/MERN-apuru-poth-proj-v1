import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import UpdateProduct from "./UpdateProduct";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const DisplayInventory = (books) => {
  const [items, setItems] = useState([], books);
  const [productID, setProductId] = useState(null);
  const classes = useStyles();
  const [modalShow, setModalShow] = useState(false);

  const updateTable = async () => {
    await axios
      .get("http://localhost:8059/inventory/product/all")
      .then((res) => {
        setItems(res.data.books);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const updateProduct = (productId) => {
    setProductId(productId);
    setModalShow(true);
  };

  const deleteProduct = async (pid) => {
    await axios
      .delete(`http://localhost:8059/inventory/product/delete/${pid}`)
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
        .get("http://localhost:8059/inventory/product/all")
        .then((res) => {
          setItems(res.data.books);
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
                console.log(item.ISBN);
              })}
              <thead className="bg-mattBlackLight">
                <tr style={{ height: 50 }}>
                  <th scope="col" style={{ width: "30%" }}>
                    NAME
                  </th>
                  <th scope="col">MARKET PRICE</th>
                  <th scope="col" style={{ width: "20%" }}>
                    ISBN
                  </th>
                  <th scope="col">IN-STOCK QUANTITY</th>

                  <th scope="col" style={{ width: "10%" }}>
                    UPDATE
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    DELETE
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr>
                    <td scope="col">{item.publishingTitle}</td>
                    <td scope="col">LKR {item.marketPrice}</td>
                    <td scope="col">{item.ISBN}</td>
                    <td scope="col">{item.quantity}</td>

                    <td scope="col">
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<UpdateIcon />}
                        onClick={() => {
                          updateProduct(item._id);
                        }}
                      >
                        Update
                      </Button>
                    </td>
                    <td scope="col-1">
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          deleteProduct(item._id);
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
      <UpdateProduct
        show={modalShow}
        onHide={() => setModalShow(false)}
        productID={productID}
      />
    </div>
  );
};

export default DisplayInventory;
