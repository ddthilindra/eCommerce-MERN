import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DeleteProductPopup(props) {
  const { openDeletePopup, setOpenDeletePopup, productRecordForDelete } = props;
  const [values, setValues] = useState("");
  const token = localStorage.getItem("token")
  const config = {
    headers: { Authorization: token },
  };
  useEffect(() => {
    if (productRecordForDelete != null) {
      setValues({
        ...productRecordForDelete,
      });
    }
  }, [productRecordForDelete]);
  const handleClose = () => {
    setOpenDeletePopup(false);
  };

  function deleteAdmin(e) {
    e.preventDefault();
    console.log(values)

    axios
      .delete(`http://localhost:8000/product/deleteProductById/${values._id}`)
      .then((response) => {
        if (response.status == 200) {
          window.alert(`${response.data.message}`);

          setOpenDeletePopup(false);
          window.location.reload();
        } else {
          window.alert("Somthing went wrong");
        }
      })
      .catch((err) => {
        console.log("Sever error");
      });
  }
  return (
    <div>
      {/* <Button variant="outlined" >
        Open responsive dialog
      </Button> */}
      <Dialog open={openDeletePopup} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure ?"}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Are you sure you want to delete <b>{values.name}</b> ?
            <br />
            This action cannot be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            cancel
          </Button>
          <Button onClick={deleteAdmin} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
