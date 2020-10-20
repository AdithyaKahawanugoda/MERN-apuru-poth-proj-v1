import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(0),
        minWidth: 120,
        borderRadius: 27 + "px",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(0),
        borderRadius: 27 + "px",
    },
    formInput: {
        margin: theme.spacing(0),
        borderRadius: 27 + "px",
    },
    input: {
        display: "none",
    },
}));

const UpdateProfile = ({
    name,
    add1,
    add2,
    city,
    area,
    pscode,
    country,
    phone,
    email,
    pwd,
    // imageUrl
}) => {
    const [name, setName] = useState(null)
    const [add1, setAddress1] = useState(null)
    const [add2, setAddress2] = useState(null)
    const [city, setCity] = useState(null)
    const [area, setArea] = useState(null)
    const [pscode, setPostalCode] = useState(null)
    const [country, setCountry] = useState(null)
    const [phone, setPhone] = useState(null)
    const [email, setEmail] = useState(null)
    const [pwd, setPassword] = useState(null)
    // const [imageUrl, setPicture] = useState(null)
    const classes = useStyles();

    return (
        <div>
            <Modal
                show={show}
                onHide={onHide}
                animation={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {`Hello ${name} Update your profile here`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <TextField
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                type="text"
                                size="small"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                id="outlined-basic"
                                label="Email Address"
                                variant="outlined"
                                type="text"
                                size="small"
                                fullWidth
                                value={add1}
                                onChange={(e) => setAddress1(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                id="outlined-basic"
                                label="Email Address"
                                variant="outlined"
                                type="text"
                                size="small"
                                fullWidth
                                value={add2}
                                onChange={(e) => setAddress2(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                id="outlined-basic"
                                label="Email Address"
                                variant="outlined"
                                type="text"
                                size="small"
                                fullWidth
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                id="outlined-basic"
                                label="Email Address"
                                variant="outlined"
                                type="text"
                                size="small"
                                fullWidth
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                id="outlined-basic"
                                label="Email Address"
                                variant="outlined"
                                type="text"
                                size="small"
                                fullWidth
                                value={pscode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                id="outlined-basic"
                                label="Email Address"
                                variant="outlined"
                                type="text"
                                size="small"
                                fullWidth
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                id="outlined-basic"
                                label="Email Address"
                                variant="outlined"
                                type="text"
                                size="small"
                                fullWidth
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                id="outlined-basic"
                                label="Email Address"
                                variant="outlined"
                                type="text"
                                size="small"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                id="outlined-basic"
                                label="Email Address"
                                variant="outlined"
                                type="text"
                                size="small"
                                fullWidth
                                value={pwd}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {/* <div className="form-group">
                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                                size="small"
                                fullWidth
                            >
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Status
                  </InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={myDescription}
                                    onChange={(e) => setMyDescriptio(e.target.value)}
                                    label="Status"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="Work from Home">🏠Work from Home</MenuItem>
                                    <MenuItem value="Busy at the moment">
                                        🧑‍💼Busy at the moment
                    </MenuItem>
                                    <MenuItem value="I'm free now">😃I'm free now</MenuItem>
                                </Select>
                            </FormControl>
                        </div> */}
                        {/* <div className="form-group">
                            <TextField
                                id="outlined-basic"
                                label="Current Password"
                                variant="outlined"
                                type="password"
                                size="small"
                                fullWidth
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                id="outlined-basic"
                                label="New Password"
                                variant="outlined"
                                type="password"
                                size="small"
                                fullWidth
                                onChange={(e) => setNPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                id="outlined-basic"
                                label="Conform Password"
                                variant="outlined"
                                type="password"
                                size="small"
                                fullWidth
                                onChange={(e) => setCPassword(e.target.value)}
                            />
                        </div> */}
                        <div className="form-group">
                            <input
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button
                                    component="span"
                                    variant="contained"
                                    color="default"
                                    fullWidth
                                    className={classes.button}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload profile picture
                  </Button>
                            </label>
                        </div>
                        <div className="float-right">
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                type="submit"
                                className={classes.button}
                                startIcon={<SaveIcon />}
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

export default UpdateProfile;