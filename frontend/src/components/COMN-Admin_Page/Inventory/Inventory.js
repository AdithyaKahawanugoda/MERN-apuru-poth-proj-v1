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
  const [proofReaderPayment, setProofReadingPayment] = useState(0);
  const [typeSetterPayment, setTypeSetterPayment] = useState(0);
  const [printCost, setPrintCost] = useState(0);
  const [other, setOther] = useState(0);
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

    document.getElementById("InventoryForm").reset();

    await axios
      .post("http://localhost:8059/inventory/product/add", book)
      .then(async () => {
        console.log("Product added successfully");
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
                <form
                  className="user"
                  id="InventoryForm"
                  onSubmit={sendNewBook}
                >
                  <div className="form-group row pb-0">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        id="PUBtitle"
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
                      className="form-control form-control-user"
                      placeholder="Translator"
                      onChange={(e) => setTranslator(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
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
                        className="form-control form-control-user"
                        placeholder="ISBN"
                        onChange={(e) => setISBN(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        placeholder="License"
                        onChange={(e) => setLicense(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        placeholder="Quantity"
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <div className="col-sm-6">
                      <input
                        type="number"
                        className="form-control form-control-user"
                        placeholder="Edition"
                        onChange={(e) => setEdition(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="tel"
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
                        className="form-control form-control-user"
                        placeholder="Press"
                        onChange={(e) => setPress(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-5">
                      <input
                        type="date"
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
                        className="form-control form-control-user"
                        placeholder="Proof Reader"
                        onChange={(e) => setProofReader(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control form-control-user"
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
                        className="form-control form-control-user"
                        placeholder="Type Setter"
                        onChange={(e) => setTypeSetter(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="number"
                        className="form-control form-control-user"
                        placeholder="Book Weight"
                        onChange={(e) => setWeight(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <div className="col-sm-4">
                      <input
                        type="number"
                        className="form-control form-control-user"
                        placeholder="Cover cost"
                        onChange={(e) => setCoverCost(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="number"
                        className="form-control form-control-user"
                        placeholder="License cost"
                        onChange={(e) => setLicenseCost(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="number"
                        className="form-control form-control-user"
                        placeholder="Writer cost"
                        onChange={(e) => setWriterPayment(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <div className="col-sm-6">
                      <input
                        type="number"
                        className="form-control form-control-user"
                        placeholder="Proof Reading payment"
                        onChange={(e) => setProofReadingPayment(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="number"
                        className="form-control form-control-user"
                        placeholder="Type setter payment"
                        onChange={(e) => setTypeSetterPayment(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <div className="col-sm-4">
                      <input
                        type="number"
                        className="form-control form-control-user"
                        placeholder="Print cost"
                        onChange={(e) => setPrintCost(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="number"
                        className="form-control form-control-user"
                        placeholder="Other costs"
                        onChange={(e) => setOther(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="number"
                        className="form-control form-control-user"
                        placeholder="Market Price"
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
                    Register Account
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
