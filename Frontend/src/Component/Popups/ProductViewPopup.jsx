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

export default function ProductViewPopup(props) {
  const { openProductPopup, setOpenProductPopup, productRecordForView } = props;
  const [values, setValues] = useState("");
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: token },
  };
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState([]);
  const [sku, setsku] = useState([]);
  const [image, setimage] = useState("");
  useEffect(() => {
    //    console.log(props.title)
    const initChat = async () => {
      var id = await productRecordForView;
console.log(id)
      if (id) {
        await axios
          .get(`http://localhost:8000/product/getProductById/` + id)
          .then((res) => {
            console.log("Getting from:", res.data.data[0]);
            if (res.data.code == 200 && res.data.success == true) {
              // setname(id);
              settitle(res.data.data.name);
              setdescription(res.data.data.description);
              setquantity(res.data.data.quantity);
              setsku(res.data.data.sku);
              setimage(res.data.data.thumbnailResult);
            } else {
              window.alert(res.data.message);
            }
          })
          .catch((err) => console.log(err));
      }
    };

    initChat();

    if (productRecordForView != null) {
      setValues({
        ...productRecordForView,
      });
    }
  }, [productRecordForView]);

  const handleClose = () => {
    setOpenProductPopup(false);
  };

  return (
    <div>
      <Dialog
        open={openProductPopup}
        onClose={handleClose}
        // scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            // ref={descriptionElementRef}
            tabIndex={-1}
          >
            <img src={image} alt={image} width="100%" height="300" />
            <p>{quantity}</p>
            <p>{sku}</p>
            <p>{description}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
