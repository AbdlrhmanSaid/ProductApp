import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

const DialogWindow = ({ open, handleClose, deleteFunc, msg }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="text-lg font-bold">{msg}</DialogTitle>
      <DialogActions className="flex justify-end p-4">
        <Button
          onClick={handleClose}
          className=" px-4 py-2 rounded hover:bg-slate-50"
        >
          إلغاء
        </Button>
        <Button
          onClick={deleteFunc}
          className=" px-4 py-2 rounded hover:bg-slate-50"
        >
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogWindow;
