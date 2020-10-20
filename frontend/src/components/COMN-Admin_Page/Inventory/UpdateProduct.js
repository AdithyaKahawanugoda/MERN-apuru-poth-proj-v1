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

const UpdateProduct = ({ show, onHide, productID }) => {
  const classes = useStyles();
  const [publishingTitle, setPublishingTitle] = useState(null);
  const [originalTitle, setOriginalTitle] = useState(null);
  const [translator, setTranslator] = useState(null);
  const [originalAuthor, setOriginalAuthor] = useState(null);
  const [ISBN, setISBN] = useState(0);
  const [license, setLicense] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [edition, setEdition] = useState(0);
  const [translatorContact, setTranslatorContact] = useState(0);
  const [press, setPress] = useState(null);
  const [proofReader, setProofReader] = useState(null);
  const [coverDesigner, setCoverDesigner] = useState(null);
  const [typeSetter, setTypeSetter] = useState(null);
  const [weight, setWeight] = useState(0);
  const [marketPrice, setMarketPrice] = useState(0);
  const [coverCost, setCoverCost] = useState(0);
  const [licenseCost, setLicenseCost] = useState(0);
  const [writerPayment, setWriterPayment] = useState(0);
  const [proofReadingPayment, setProofReadingPayment] = useState(0);
  const [typeSetterPayment, setTypeSetterPayment] = useState(0);
  const [printCost, setPrintCost] = useState(0);
  const [other, setOther] = useState(0);
  const [addDate, setDate] = useState(null);
  const [bookImage, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      console.log("productID:" + productID);
      await axios
        .get(`http://localhost:8059/inventory/product/${productID}`)
        .then((res) => {
          setPublishingTitle(res.data.product.publishingTitle);
          setOriginalTitle(res.data.product.originalTitle);
          setTranslator(res.data.product.translator);
          setOriginalAuthor(res.data.product.originalAuthor);
          setISBN(res.data.product.ISBN);
          setLicense(res.data.product.license);
          setQuantity(res.data.product.quantity);
          setEdition(res.data.product.edition);
          setTranslatorContact(res.data.product.translatorContact);
          setPress(res.data.product.press);
          setProofReader(res.data.product.proofReader);
          setCoverDesigner(res.data.product.coverDesigner);
          setTypeSetter(res.data.product.typeSetter);
          setWeight(res.data.product.weight);
          setMarketPrice(res.data.product.marketPrice);
          setCoverCost(res.data.product.charges.coverCost);
          setLicenseCost(res.data.product.charges.licenseCost);
          setWriterPayment(res.data.product.charges.writerPayment);
          setProofReadingPayment(res.data.product.charges.proofReadingPayment);
          setTypeSetterPayment(res.data.product.charges.typeSetterPayment);
          setPrintCost(res.data.product.charges.printCost);
          setOther(res.data.product.charges.other);
          setDate(res.data.product.addDate.split("T", 1));
          setImageUrl(res.data.product.bookImage);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getProductDetails();
  }, [productID]);

  const inventoryReport = async () => {
    let reportData = {
      publishingTitle: publishingTitle,
      originalTitle: originalTitle,
      translator: translator,
      originalAuthor: originalAuthor,
      ISBN: ISBN,
      license: license,
      quantity: quantity,
      edition: edition,
      translatorContact: translatorContact,
      press: press,
      proofReader: proofReader,
      coverDesigner: coverDesigner,
      typeSetter: typeSetter,
      weight: weight,
      marketPrice: marketPrice,
      addDate: addDate,
      coverCost: coverCost,
      licenseCost: licenseCost,
      writerPayment: writerPayment,
      proofReadingPayment: proofReadingPayment,
      typeSetterPayment: typeSetterPayment,
      printCost: printCost,
      other: other,
    };

    createPDF(reportData);
  };

  const createPDF = async (reportData) => {
    await axios
      .post(`http://localhost:8059/inventory/report`, reportData)
      .then(() => {
        alert("PDF created!");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const updateHandler = async () => {
    let updatedProdDetails = {
      publishingTitle: publishingTitle,
      originalTitle: originalTitle,
      translator: translator,
      originalAuthor: originalAuthor,
      ISBN: ISBN,
      license: license,
      quantity: quantity,
      edition: edition,
      translatorContact: translatorContact,
      press: press,
      proofReader: proofReader,
      coverDesigner: coverDesigner,
      typeSetter: typeSetter,
      weight: weight,
      marketPrice: marketPrice,
      addDate: addDate,
    };
    let updatedProdCosts = {
      coverCost: coverCost,
      licenseCost: licenseCost,
      writerPayment: writerPayment,
      proofReadingPayment: proofReadingPayment,
      typeSetterPayment: typeSetterPayment,
      printCost: printCost,
      other: other,
    };

    await axios
      .all([
        axios.post(
          `http://localhost:8059/inventory/product/update/charges/${productID}`,
          updatedProdCosts
        ),
        axios.post(
          `http://localhost:8059/inventory/product/update/details/${productID}`,
          updatedProdDetails
        ),
      ])
      .then((resArr) => {
        console.log(resArr[0].data);
        console.log(resArr[1].data);
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
                <small class="form-text text-color">Publishing Title</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  value={publishingTitle}
                  onChange={(e) => {
                    setPublishingTitle(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-sm-6">
                <small class="form-text text-color">Original Title</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  value={originalTitle}
                  onChange={(e) => {
                    setOriginalTitle(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <small class="form-text text-color">Translator</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  value={translator}
                  onChange={(e) => {
                    setTranslator(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-sm-6">
                <small class="form-text text-color">Original Author</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  value={originalAuthor}
                  onChange={(e) => {
                    setOriginalAuthor(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <div className="col-sm-4">
                <small class="form-text text-color">ISBN</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  placeholder="ISBN"
                  title="Please enter valid ISBN code"
                  value={ISBN}
                  onChange={(e) => {
                    setISBN(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-sm-4">
                <small class="form-text text-color">License</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  placeholder="License"
                  pattern="^(?:Yes|No|yes|no|YES|NO)$"
                  title="You can only enter Yes or No"
                  value={license}
                  onChange={(e) => {
                    setLicense(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-sm-4">
                <small class="form-text text-color">Quantity</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  placeholder="Quantity"
                  value={quantity}
                  min="0"
                  title="Please enter positive integer value"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <div className="col-sm-4">
                <small class="form-text text-color">Edition</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  placeholder="Edition"
                  value={edition}
                  min="1"
                  title="Please enter positive integer value"
                  onChange={(e) => {
                    setEdition(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-sm-4">
                <small class="form-text text-color">Translator Number</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  placeholder="Translator Number"
                  value={translatorContact}
                  pattern="[0-9]{10}"
                  onChange={(e) => {
                    setTranslatorContact(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-sm-4">
                <small class="form-text text-color">Press</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  placeholder="Press"
                  value={press}
                  onChange={(e) => {
                    setPress(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <div className="col-sm-4">
                <small class="form-text text-color">Proof Reader</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  placeholder="Proof Reader"
                  pattern="^[a-zA-Z\s]*$"
                  title="Valid only words"
                  value={proofReader}
                  onChange={(e) => {
                    setProofReader(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-sm-4">
                <small class="form-text text-color">Cover Designer</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  placeholder="Cover Designer"
                  pattern="^[a-zA-Z\s]*$"
                  title="Valid only words"
                  value={coverDesigner}
                  onChange={(e) => {
                    setCoverDesigner(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-sm-4">
                <small class="form-text text-color">Type Setter</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  placeholder="Type setter"
                  pattern="^[a-zA-Z\s]*$"
                  title="Valid only words"
                  value={typeSetter}
                  onChange={(e) => {
                    setTypeSetter(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <div className="col-sm-4">
                <small class="form-text text-color">Weight</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  placeholder="Weight(g)"
                  min="0"
                  title="Please use positive values"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-sm-4">
                <small class="form-text text-color">Market Price</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  placeholder="Market Price"
                  min="0"
                  title="Please use positive values"
                  value={marketPrice}
                  onChange={(e) => {
                    setMarketPrice(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-sm-4">
                <small class="form-text text-color">Added Date</small>
                <input
                  type="date"
                  className="form-control form-control-user"
                  value={addDate}
                  onChange={(e) => {
                    setPress(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <div className="col-sm-4">
                <small class="form-text text-color">Cover cost</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  placeholder="Cover cost"
                  min="0"
                  title="Please use positive values"
                  value={coverCost}
                  onChange={(e) => {
                    setCoverCost(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-sm-4">
                <small class="form-text text-color">License Cost</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  placeholder="License Cost"
                  min="0"
                  title="Please use positive values"
                  value={licenseCost}
                  onChange={(e) => {
                    setLicenseCost(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-sm-4">
                <small class="form-text text-color">Writer Payment</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  placeholder="Writer Payment"
                  min="0"
                  title="Please use positive values"
                  value={writerPayment}
                  onChange={(e) => {
                    setWriterPayment(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <div className="col-sm-4">
                <small class="form-text text-color">Proof Reader Payment</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  placeholder="Proof Reader Payment"
                  min="0"
                  title="Please use positive values"
                  value={proofReadingPayment}
                  onChange={(e) => {
                    setProofReadingPayment(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-sm-4">
                <small class="form-text text-color">Type Setter Payment</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  min="0"
                  title="Please use positive values"
                  value={typeSetterPayment}
                  onChange={(e) => {
                    setTypeSetterPayment(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-sm-4">
                <small class="form-text text-color">Print Cost</small>
                <input
                  type="text"
                  min="0"
                  title="Please use positive values"
                  className="form-control form-control-user"
                  value={printCost}
                  onChange={(e) => {
                    setPrintCost(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <div className="col-sm-4">
                <small class="form-text text-color">Other Expenses</small>
                <input
                  type="text"
                  className="form-control form-control-user"
                  min="0"
                  title="Please use positive values"
                  value={other}
                  onChange={(e) => {
                    setOther(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="float-right">
              <button
                className="btn btn-warning"
                onClick={inventoryReport}
                style={{
                  margin: 5,
                  boxShadow: "5px 4px 8px 1px #ccc8c8",
                  borderRadius: 8,
                }}
              >
                Generate Report
              </button>

              <Button
                variant="contained"
                color="primary"
                size="medium"
                type="submit"
                className={classes.button}
                style={{
                  margin: 5,
                  boxShadow: "5px 4px 8px 1px #ccc8c8",
                  borderRadius: 8,
                }}
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

export default UpdateProduct;
