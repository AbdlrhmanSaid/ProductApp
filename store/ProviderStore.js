"use client";
import { store } from "./store";
import { Provider } from "react-redux";

const ProviderStore = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderStore;
