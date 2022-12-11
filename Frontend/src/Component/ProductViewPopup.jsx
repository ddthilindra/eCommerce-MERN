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

export default function NewsViewPopup(props) {
  const { openNewsPopup, setOpenNewsPopup, newsRecordForView } = props;
  const [values, setValues] = useState("");
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: token },
  };
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState([]);
  const [image, setimage] = useState("");
  useEffect(() => {
    //    console.log(props.title)
    const initChat = async () => {
      var id = await newsRecordForView;

      if (id) {
        await axios
          .get(`http://localhost:8000/news/getNewsById/` + id)
          .then((res) => {
            if (res.data.code == 200 && res.data.success == true) {
              // setname(id);
              settitle(res.data.data.title);
              setdescription(res.data.data.description);
              setcategory(res.data.data.category);
              setimage(res.data.data.image);
            } else {
              window.alert(res.data.message);
            }
          })
          .catch((err) => console.log(err));
      }
    };

    initChat();

    if (newsRecordForView != null) {
      setValues({
        ...newsRecordForView,
      });
    }
  }, [newsRecordForView]);

  const handleClose = () => {
    setOpenNewsPopup(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" >
        Open responsive dialog
      </Button> */}
      {/* <Dialog open={openNewsPopup} aria-labelledby="responsive-dialog-title" onClose={handleClose}>
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure ?"}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Are you sure you want to delete <b>{title} </b> ?
            <br />
            This action cannot be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            cancel
          </Button>
          
        </DialogActions>
      </Dialog> */}
      <Dialog
        open={openNewsPopup}
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
            <img src={image} alt="Paris" width="100%" height="300" />
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join("\n")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
