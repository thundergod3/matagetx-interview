import React, { lazy, useEffect } from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

import * as routes from "constants/routes";
import AuthsAction from "stores/redux/actions/AuthsAction";

import Header from "components/Header";

import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/index.scss";

// Lazy Pages
const Homepage = lazy(() => import("./pages/homepage"));
const SharePage = lazy(() => import("./pages/sharePage"));

const App = () => {
  const dispatch = useDispatch();
  const { checkAuthenticationRequest } = AuthsAction;

  useEffect(() => {
    dispatch(checkAuthenticationRequest());
  }, [checkAuthenticationRequest, dispatch]);

  return (
    <React.Suspense fallback={<></>}>
      {/* COMMON COMPONENT */}
      <ToastContainer />
      <Header />

      {/* ROUTES */}
      <Route exact path={routes.HOMEPAGE} component={Homepage} />
      <Route exact path={routes.SHARE_PAGE} component={SharePage} />
    </React.Suspense>
  );
};

export default App;
