import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

// import imga from "../../assets/Asus.jpg";

const useStyles = makeStyles({
  popup: {
    width: "100%",
  },
});
let file;
export default function ProductPopup(props) {
  const { openProductPopup, setProductOpenPopup, productRecordForEdit } = props;
  const classes = useStyles();
  const [categories, setcategories] = useState([]);
  const [btnText, setbtnText] = useState("Submit");
  const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2Mzk0NWQ3YjMwZTdjYTQ1Zjg2ZmFjZWQiLCJmaXJzdE5hbWUiOiJ2ZW5kb3IiLCJsYXN0TmFtZSI6InZlbmRvciIsImVtYWlsIjoidmVuZG9yQG1haWwuY29tIiwiaW1hZ2UiOm51bGx9LCJpYXQiOjE2NzA2Njc2NDQxODcsImV4cCI6MTY3MDY2ODg1Mzc4N30.VcI4FwC8tRq5hdTiDlhN7zEzd_odv17haFbzxekTJcs"
    
  const config = {
    headers: { Authorization: token },
  };

  const handleClose = () => {
    setProductOpenPopup(false);
    setname("");
    setdescription("");
    setquantity("");

    setnameError(false);
    setnameHError(false);
    setdescriptionError(false);
    setdescHError(false);
    setquantityError(false);
    setquantityHError(false);

    window.location.reload();
  };
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState([]);
  const [sku, setsku] = useState([]);

  const [nameError, setnameError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);
  const [quantityError, setquantityError] = useState("");
  const [skuError, setskuError] = useState("");

  const [nameHError, setnameHError] = useState("");
  const [descHError, setdescHError] = useState("");
  const [quantityHError, setquantityHError] = useState("");
  const [skuHError, setskuHError] = useState("");

  const [Timage, setTimage] = useState();
  const [Nimage, setNimage] = useState();

  const handleFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setTimage(file);
  };
  const handleFile2 = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setNimage(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setnameError(false);
    setdescriptionError(false);
    if (name == "") {
      setnameError(true);
      setnameHError("Required");
    }
    if (description == "") {
      setdescriptionError(true);
      setdescHError("Required");
    }
    if (quantity == "") {
      setquantityError(true);
      setquantityHError("Required");
    }

    if (name && description && quantity) {
      console.log(Timage);
      console.log(quantity);

      let formdata = new FormData();
      formdata.append("thumbnailResult", Timage);
      formdata.append("imageResult", Nimage);
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("quantity", quantity);
      formdata.append("sku", sku);
      console.log(formdata);
      axios
        .post(`http://localhost:8000/product/addProduct`, formdata, config)
        .then((res) => {
          if (res.data.code == 200 && res.data.success == true) {
            window.alert(res.data.message);
          } else {
            window.alert(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    setnameError(false);
    setdescriptionError(false);
    if (name == "") {
      setnameError(true);
      setnameHError("Required");
    }
    if (description == "") {
      setdescriptionError(true);
      setdescHError("Required");
    }
    if (quantity == "") {
      setquantityError(true);
      setquantityHError("Required");
    }

    if (name && description && quantity) {
      console.log(Timage);
      let formdata2 = new FormData();
      // formdata2.append("thumbnailResult", Timage);
      formdata2.append("name", name);
      formdata2.append("description", description);
      formdata2.append("quantity", quantity);
      formdata2.append("sku", sku);
      console.log(formdata2);
      axios
        .put(
          `http://localhost:8000/product/updateProductById/` + updateId,
          formdata2,
          config
        )
        .then((res) => {
          if (res.data.code == 200 && res.data.success == true) {
            window.alert(res.data.message);
          } else {
            window.alert(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const [values, setValues] = useState("");
  const [updateId, setupdateId] = useState("");
  useEffect(() => {
    setValues("");
    setnameError(false);
    setdescriptionError(false);
    const initChat = async () => {
      var id = await productRecordForEdit;
      setupdateId(id);
      if (id) {
        await axios
          .get(`http://localhost:8000/product/getProductById/` + id, config)
          .then((res) => {
            if (res.data.code == 200 && res.data.success == true) {
              // setname(id);
              setname(res.data.data.name);
              setdescription(res.data.data.description);
              setquantity(res.data.data.quantity);
            } else {
              window.alert(res.data.message);
            }
          })
          .catch((err) => console.log(err));

        setbtnText("Update");
      }
      if (productRecordForEdit != null) {
        setValues({
          ...productRecordForEdit,
        });
      }
    };
    initChat();

    const config = {
      headers: { Authorization: token },
    };

    axios
      .get("http://localhost:8000/quantity/getAllquantity", config)
      .then((res) => {
        if (res.data.code == 200 && res.data.success == true) {
          setcategories(res.data.data);
        } else {
          window.alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }, [productRecordForEdit]);

  return (
    <div className={classes.popup}>
      <Dialog open={openProductPopup} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>

        <div
          className="dlgcontainer"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <DialogContent dividers>
            <TextField
              helperText={nameHError}
              value={name}
              onChange={(e) => setname(e.target.value)}
              className={classes.field}
              label="Product name"
              variant="outlined"
              fullWidth
              required
              error={nameError}
            />
          </DialogContent>
          <DialogContent dividers>
            <TextField
              helperText={quantityHError}
              error={quantityError}
              value={quantity}
              className={classes.field}
              label="Quantity"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setquantity(e.target.value)}
            />
          </DialogContent>
          <DialogContent dividers>
            <TextField
              helperText={skuHError}
              error={skuError}
              value={sku}
              className={classes.field}
              label="SKU"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setsku(e.target.value)}
            />
          </DialogContent>
        </div>
        <div
          className="dlgcontainer"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <DialogContent >
            <Button variant="contained" component="label">
              Upload 
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleFile}
              />
            </Button>
          </DialogContent>
          <DialogContent >
            <Button variant="contained" component="label">
              Upload
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleFile2}
              />
            </Button>
          </DialogContent>
        </div>
        <TextField
          value={description}
          helperText={descHError}
          onChange={(e) => setdescription(e.target.value)}
          className={classes.field}
          label="Description"
          variant="outlined"
          multiline
          rows={8}
          fullWidth
          required
          error={descriptionError}
        />
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={btnText == "Submit" ? handleSubmit : handleUpdate}
            variant="contained"
            color="success"
          >
            {btnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
