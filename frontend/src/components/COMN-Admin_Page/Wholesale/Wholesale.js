import React, { useState } from "react";
import axios from "axios";
import DisplayWholesale from "./DisplayWholesale";
import { useRadioGroup } from "@material-ui/core";

const Wholesale = () => {
  const [retailShop, setRetailShop] = useState(null);
  const [invoiceId, setInvoiceId] = useState(null);
  const [amount, setAmount] = useState(null);
  const [placeDate, setPlaceDate] = useState(null);
  const [description, setDescription] = useState(null);
  const [orders, setOrders] = useState([]);

  const sendNewInvoice = async (e) => {
    e.preventDefault();
    let order = {
      retailShop: retailShop,
      invoiceId: invoiceId,
      amount: amount,
      placeDate: placeDate,
      description: description,
    };

    document.getElementById("WholesaleForm").reset();

    await axios
      .post("http://localhost:8059/wholesale/invoice/add", order)
      .then(async () => {
        await axios
          .get("http://localhost:8059/wholesale/invoice/all")
          .then((res) => {
            setOrders(res.data.orders);
            return <DisplayWholesale order={orders} />;
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="row">
      <div className="col-lg-5 col-sm-12 col-md-6 col-xs-12">
        <div className="container-fluid">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-2">
              <div className="p-3">
                <div className="text-center">
                  <h1 className="h4 text-color mb-4">Add New Bulk-Order</h1>
                </div>
                <form
                  className="user"
                  id="WholesaleForm"
                  onSubmit={sendNewInvoice}
                >
                  <div className="form-group row pb-0">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        placeholder="Retail Shop Name"
                        onChange={(e) => setRetailShop(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        placeholder="Invoice ID"
                        onChange={(e) => setInvoiceId(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row pb-0">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="number"
                        className="form-control form-control-user"
                        placeholder="Total Amount"
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="date"
                        className="form-control form-control-user"
                        placeholder="Place Date"
                        onChange={(e) => setPlaceDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <textarea
                      type="text"
                      className="form-control form-control-user"
                      placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  <br />
                  <button className="btn btn-primary btn-user btn-block">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-7 col-sm-12 col-md-6">
        <DisplayWholesale orders={orders} />
      </div>
    </div>
  );
};

export default Wholesale;
