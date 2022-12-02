import { Box, Button, Icon } from "@chakra-ui/react";
import React, { useCallback, useState, useMemo } from "react";
import { IoMdHome } from "react-icons/io";
import { useHistory } from "react-router";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { HOMEPAGE, SHARE_PAGE } from "constants/routes";
import AuthsAction from "stores/redux/actions/AuthsAction";
import useNotification from "hooks/useNotification";

import TitleText from "components/TitleText";
import InputField from "components/InputField";
import NormalText from "components/NormalText";

import {
  HeaderContainer,
  HeaderLeftContainer,
  HeaderRightContainer,
} from "./header.styles";

const initialAuthenticationForm = {
  username: "",
  password: "",
};

const Header = () => {
  const checkAuthentication = useSelector(
    (state) => state.authsReducer.checkAuthentication,
    shallowEqual
  );
  const userData = useSelector(
    (state) => state.authsReducer.userData,
    shallowEqual
  );
  const dispatch = useDispatch();
  const { loginRequest, registerRequest, logout } = AuthsAction;

  const [authenticationForm, setAuthenticationForm] = useState(
    initialAuthenticationForm
  );

  const history = useHistory();
  const { openNotificationError } = useNotification();

  const handleResetAuthenticationForm = useCallback(() => {
    setAuthenticationForm(initialAuthenticationForm);
  }, []);
  const handleNavigateHomepage = useCallback(() => {
    history.push(HOMEPAGE);
  }, [history]);
  const handleChangeAuthenticationForm = useCallback(
    (event) => {
      const { name, value } = event.target;

      setAuthenticationForm({
        ...authenticationForm,
        [name]: value,
      });
    },
    [authenticationForm]
  );
  const handleNavigateShareMovie = useCallback(() => {
    history.push(SHARE_PAGE);
  }, [history]);

  const handleLogin = useCallback(() => {
    const handleLoginError = () => {
      openNotificationError("Invalid username or password. Please try again");
    };

    dispatch(
      loginRequest(
        authenticationForm,
        handleResetAuthenticationForm,
        handleLoginError
      )
    );
  }, [
    authenticationForm,
    dispatch,
    handleResetAuthenticationForm,
    loginRequest,
    openNotificationError,
  ]);

  const handleRegister = useCallback(() => {
    const handleRegisterError = (error) => {
      openNotificationError(error);
    };

    dispatch(
      registerRequest(
        authenticationForm,
        handleResetAuthenticationForm,
        handleRegisterError
      )
    );
  }, [
    authenticationForm,
    dispatch,
    handleResetAuthenticationForm,
    openNotificationError,
    registerRequest,
  ]);
  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch, logout]);

  const isDisabled = useMemo(
    () => !authenticationForm?.username || !authenticationForm?.password,
    [authenticationForm?.username, authenticationForm?.password]
  );

  return (
    <HeaderContainer>
      <HeaderLeftContainer onClick={handleNavigateHomepage}>
        <Icon as={IoMdHome} fontSize="28px" />
        <TitleText title="Funny Movies" ml="12px" />
      </HeaderLeftContainer>
      <HeaderRightContainer>
        {checkAuthentication ? (
          <>
            <Box mr="12px">
              <NormalText text={`Welcome ${userData?.username}`} />
            </Box>
            <Box mr="12px">
              <Button
                data-testid="share-movie-btn"
                variant="outline"
                borderColor="darkgray"
                onClick={handleNavigateShareMovie}>
                Share a movie
              </Button>
            </Box>
            <Button
              data-testid="logout-btn"
              variant="solid"
              background="blue.400"
              onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Box mr="12px">
              <InputField
                data-testid="username-field"
                name="username"
                placeholder="Username"
                value={authenticationForm?.email}
                onChange={handleChangeAuthenticationForm}
              />
            </Box>
            <Box mr="12px">
              <InputField
                data-testid="password-field"
                type="password"
                name="password"
                placeholder="Password"
                value={authenticationForm?.password}
                onChange={handleChangeAuthenticationForm}
              />
            </Box>
            <Box mr="12px">
              <Button
                data-testid="register-btn"
                variant="outline"
                borderColor="darkgray"
                disabled={isDisabled}
                onClick={handleRegister}>
                Register
              </Button>
            </Box>
            <Button
              data-testid="login-btn"
              variant="solid"
              background="blue.400"
              disabled={isDisabled}
              onClick={handleLogin}>
              Login
            </Button>
          </>
        )}
      </HeaderRightContainer>
    </HeaderContainer>
  );
};

export default Header;
