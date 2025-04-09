import React from "react";
import { Alert } from "@mui/material";

const AlertMsg = ({ msg, type }) => {
  return <Alert severity={type ? type : "info"}>{msg}</Alert>;
};

export default AlertMsg;
