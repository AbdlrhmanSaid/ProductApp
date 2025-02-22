import React from "react";
import { Alert } from "@mui/material";

const AlertMsg = ({ msg }) => {
  return <Alert severity="info">{msg}</Alert>;
};

export default AlertMsg;
