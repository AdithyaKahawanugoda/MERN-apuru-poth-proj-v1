import React, { useState } from "react";
import axios from "axios";
import firebase from "../../../firebase";
import Progress from "../../Layouts/Progress";
import DisplayInventory from "./DisplayInventory";

const Inventory = () => {
  const [publishingTitle, setPublishingTitle] = useState(null);
  const [originalTitle, setOriginalTitle] = useState(null);
  const [translator, setTranslator] = useState(null);
  const [originalAuthor, setOriginalAuthor] = useState(null);
  const [ISBN, setISBN] = useState(null);
  const [license, setLicense] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [edition, setEdition] = useState(null);
  const [translatorContact, setTranslatorContact] = useState(null);
  const [press, setPress] = useState(null);
  const [proofReader, setProofReader] = useState(null);
  const [coverDesigner, setCoverDesigner] = useState(null);
  const [typeSetter, setTypeSetter] = useState(null);
  const [weight, setWeight] = useState(null);
  const [marketPrice, setMarketPrice] = useState(null);
  const [coverCost, setCoverCost] = useState(null);
  const [licenseCost, setLicenseCost] = useState(null);
  const [writerPayment, setWriterPayment] = useState(null);
  const [proofReaderPayment, setProofReadingPayment] = useState(null);
  const [typeSetterPayment, setTypeSetterPayment] = useState(null);
  const [printCost, setPrintCost] = useState(null);
  const [other, setOther] = useState(null);
  const [date, setDate] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [books, setBooks] = useState([]);

  const uploadBookImage = (e) => {
    e.preventDefault();
    if (image != null) {
      let productImageFolderName = "Product-Images";
      let file = image;
      let uploadImage = firebase
        .storage()
        .ref(`${productImageFolderName}/${ISBN}`)
        .put(file);
      uploadImage.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadPercentage(progress);
        },
        (err) => {
          console.log(err);
          alert(err.message);
        },
        () => {
          uploadImage.snapshot.ref.getDownloadURL().then((url) => {
            console.log(url);
            setImageUrl(url);
          });
        }
      );
    }
  };

  const demoFunction = (e) => {
    e.preventDefault();
    setPublishingTitle("Demo Book");
    setOriginalTitle("Demo Potha");
    setTranslator("Demo Translator");
    setOriginalAuthor("Demo Author");
    setISBN("DemoISBN123");
    setLicense("Yes");
    setQuantity(2500);
    setEdition(2);
    setTranslatorContact(2756789765);
    setPress("Demo press");
    setProofReader("Demo");
    setCoverDesigner("Demo");
    setTypeSetter("Demo");
    setWeight(250);
    setMarketPrice(900);
    setCoverCost(8000);
    setLicenseCost(78000);
    setWriterPayment(30000);
    setProofReadingPayment(20000);
    setTypeSetterPayment(30000);
    setPrintCost(120000);
    setOther(2400);
  };

  const sendNewBook = async (e) => {
    e.preventDefault();
    let book = {
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
      coverCost: coverCost,
      licenseCost: licenseCost,
      writerPayment: writerPayment,
      proofReadingPayment: proofReaderPayment,
      typeSetterPayment: typeSetterPayment,
      printCost: printCost,
      other: other,
      bookImage: imageUrl,
      date: date,
    };

    await axios
      .post("http://localhost:8059/inventory/product/add", book)
      .then(async () => {
        console.log("Product added successfully");
        // setPublishingTitle(null);
        // setOriginalTitle(null);
        // setTranslator(null);
        // setOriginalAuthor(null);
        // setISBN(null);
        // setLicense(null);
        // setQuantity(null);
        // setEdition(null);
        // setTranslatorContact(null);
        // setPress(null);
        // setProofReader(null);
        // setCoverDesigner(null);
        // setTypeSetter(null);
        // setWeight(null);
        // setMarketPrice(null);
        // setCoverCost(null);
        // setLicenseCost(null);
        // setWriterPayment(null);
        // setProofReadingPayment(null);
        // setTypeSetterPayment(null);
        // setPrintCost(null);
        // setOther(null);
        // setDate(null);
        // setImageUrl(null);
        // setImage(null);
        // setUploadPercentage(null);
        await axios
          .get("http://localhost:8059/inventory/product/all")
          .then((res) => {
            setBooks(res.data.books);
            return <DisplayInventory book={books} />;
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
                  <h1 className="h4 text-color mb-4">Add New Book</h1>
                </div>
                <form className="user" onSubmit={sendNewBook}>
                  <div className="form-group row pb-0">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        value={publishingTitle}
                        type="text"
                        className="form-control form-control-user"
                        placeholder="Publishing Title"
                        onChange={(e) => setPublishingTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        value={originalTitle}
                        className="form-control form-control-user"
                        placeholder="Original Title"
                        onChange={(e) => setOriginalTitle(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={translator}
                      className="form-control form-control-user"
                      placeholder="Translator"
                      onChange={(e) => setTranslator(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={originalAuthor}
                      className="form-control form-control-user"
                      placeholder="Original Author"
                      onChange={(e) => setOriginalAuthor(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group row mb-3">
                    <div className="col-sm-4">
                      <input
                        type="text"
                        value={ISBN}
                        className="form-control form-control-user"
                        placeholder="ISBN"
                     
                        title="Please enter valid ISBN code"
                        onChange={(e) => setISBN(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        value={license}
                        className="form-control form-control-user"
                        placeholder="License-Yes/No"
                        pattern="^(?:Yes|No|yes|no|YES|NO)$"
                        title="You can only enter Yes or No"
                        onChange={(e) => setLicense(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="number"
                        value={quantity}
                        className="form-control form-control-user"
                        placeholder="Quantity"
                        min="500"
                        title="Please enter positive integer value"
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <div className="col-sm-6">
                      <input
                        type="number"
                        value={edition}
                        className="form-control form-control-user"
                        placeholder="Edition"
                        min="1"
                        title="Please enter positive integer value"
                        onChange={(e) => setEdition(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="tel"
                        value={translatorContact}
                        className="form-control form-control-user"
                        placeholder="Translator Number"
                        pattern="[0-9]{10}"
                        onChange={(e) => setTranslatorContact(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <div className="col-sm-7">
                      <input
                        type="text"
                        value={press}
                        className="form-control form-control-user"
                        placeholder="Press"
                        onChange={(e) => setPress(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-5">
                      <input
                        type="date"
                        value={date}
                        className="form-control form-control-user"
                        placeholder="Current Date"
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <div className="col-sm-6">
                      <input
                        type="text"
                        value={proofReader}
                        className="form-control form-control-user"
                        pattern="^[a-zA-Z\s]*$"
                        title="Valid only words"
                        placeholder="Proof Reader"
                        onChange={(e) => setProofReader(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        value={coverDesigner}
                        className="form-control form-control-user"
                        pattern="^[a-zA-Z\s]*$"
                        title="Valid only words"
                        placeholder="Cover Designer"
                        onChange={(e) => setCoverDesigner(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <div className="col-sm-6">
                      <input
                        type="text"
                        value={typeSetter}
                        className="form-control form-control-user"
                        pattern="^[a-zA-Z\s]*$"
                        title="Valid only words"
                        placeholder="Type Setter"
                        onChange={(e) => setTypeSetter(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="number"
                        value={weight}
                        className="form-control form-control-user"
                        placeholder="Book Weight"
                        min="1"
                        title="Please use positive values"
                        onChange={(e) => setWeight(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <div className="col-sm-4">
                      <input
                        type="number"
                        value={coverCost}
                        className="form-control form-control-user"
                        placeholder="Cover cost"
                        min="0"
                        title="Please use positive values"
                        onChange={(e) => setCoverCost(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="number"
                        value={licenseCost}
                        className="form-control form-control-user"
                        placeholder="License cost"
                        min="0"
                        title="Please use positive values"
                        onChange={(e) => setLicenseCost(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="number"
                        value={writerPayment}
                        className="form-control form-control-user"
                        placeholder="Writer cost"
                        min="0"
                        title="Please use positive values"
                        onChange={(e) => setWriterPayment(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <div className="col-sm-6">
                      <input
                        type="number"
                        value={proofReaderPayment}
                        className="form-control form-control-user"
                        placeholder="Proof Reading payment"
                        min="0"
                        title="Please use positive values"
                        onChange={(e) => setProofReadingPayment(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="number"
                        value={typeSetterPayment}
                        className="form-control form-control-user"
                        placeholder="Type setter payment"
                        min="0"
                        title="Please use positive values"
                        onChange={(e) => setTypeSetterPayment(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <div className="col-sm-4">
                      <input
                        type="number"
                        value={printCost}
                        className="form-control form-control-user"
                        placeholder="Print cost"
                        min="0"
                        title="Please use positive values"
                        onChange={(e) => setPrintCost(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="number"
                        value={other}
                        className="form-control form-control-user"
                        placeholder="Other costs"
                        min="0"
                        title="Please use positive values"
                        onChange={(e) => setOther(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="number"
                        value={marketPrice}
                        className="form-control form-control-user"
                        placeholder="Market Price"
                        min="0"
                        title="Please use positive values"
                        onChange={(e) => setMarketPrice(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="inputGroupFile04"
                          onChange={(e) => setImage(e.target.files[0])}
                          required
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="inputGroupFile04"
                        >
                          Select Book Image
                        </label>
                      </div>
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                          onClick={uploadBookImage}
                        >
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>
                  <Progress percentage={uploadPercentage} />
                  <br />
                  <button className="btn btn-primary btn-user btn-block">
                    Register Book Details
                  </button>
                  <button
                    className="btn btn-warning"
                    style={{ margin: 5, boxShadow: "5px 4px 8px 1px #ccc8c8" }}
                    onClick={demoFunction}
                  >
                    Demo
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-7 col-sm-12 col-md-6">
        <DisplayInventory books={books} />
      </div>
    </div>
  );
};

export default Inventory;
