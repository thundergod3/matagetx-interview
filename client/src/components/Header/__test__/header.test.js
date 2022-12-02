import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { Router, Switch } from "react-router";
import "@testing-library/jest-dom";
import { ToastContainer } from "react-toastify";

import store from "stores/configureStore";
import theme from "themes";
import history from "utils/history";
import Header from "..";
import SharePage from "pages/sharePage";
import AuthsAction from "stores/redux/actions/AuthsAction";

jest.setTimeout(120000);

const renderHeader = () => (
  <Provider store={store}>
    <ToastContainer />
    <Router history={history}>
      <ChakraProvider theme={theme}>
        <Switch>
          <Header />
        </Switch>
      </ChakraProvider>
    </Router>
  </Provider>
);

const renderSharePage = () => (
  <Provider store={store}>
    <Router history={history}>
      <ChakraProvider theme={theme}>
        <Switch>
          <SharePage />
        </Switch>
      </ChakraProvider>
    </Router>
  </Provider>
);

describe("Header", () => {
  test("Render Header", async () => {
    render(renderHeader());

    await expect(await screen.findByText(/funny movies/i)).toBeVisible();
  });

  test("Register with valid account", async () => {
    render(renderHeader());

    const randomNumber = Number(Math.random() * 1000000);
    const username = `congphan${randomNumber}`;
    const password = "12345678";

    const findLoginBtn = await screen.findByTestId("register-btn");

    await userEvent.type(await screen.findByTestId("username-field"), username);
    await userEvent.type(await screen.findByTestId("password-field"), password);
    await userEvent.click(findLoginBtn);

    await expect(await screen.findByText(`Welcome ${username}`)).toBeVisible();
  });

  test("Register with invalid account", async () => {
    render(renderHeader());
    await store.dispatch(AuthsAction.logout());

    const username = "congphan";
    const password = "12345678";

    const findLoginBtn = await screen.findByTestId("register-btn");

    await userEvent.type(await screen.findByTestId("username-field"), username);
    await userEvent.type(await screen.findByTestId("password-field"), password);
    await userEvent.click(findLoginBtn);

    await expect(await screen.findByTestId("register-btn")).toBeVisible();
  });

  test("Login with valid account", async () => {
    render(renderHeader());
    await store.dispatch(AuthsAction.logout());

    const username = "congphan";
    const password = "12345678";

    const findLoginBtn = await screen.findByTestId("login-btn");

    await userEvent.type(await screen.findByTestId("username-field"), username);
    await userEvent.type(await screen.findByTestId("password-field"), password);
    await userEvent.click(findLoginBtn);

    await expect(await screen.findByTestId("login-btn")).toBeVisible();
    store.dispatch(AuthsAction.logout());
  });

  test("Login with invalid account", async () => {
    render(renderHeader());
    await store.dispatch(AuthsAction.logout());

    const username = "congphan";
    const password = "1";

    const findLoginBtn = await screen.findByTestId("login-btn");

    await userEvent.type(await screen.findByTestId("username-field"), username);
    await userEvent.type(await screen.findByTestId("password-field"), password);
    await userEvent.click(findLoginBtn);

    await store.dispatch(AuthsAction.logout());

    await expect(await screen.findByTestId("login-btn")).toBeVisible();
  });

  test("Navigate share movie page", async () => {
    render(renderHeader());
    await store.dispatch(AuthsAction.logout());

    const username = "congphan";
    const password = "12345678";

    const findLoginBtn = await screen.findByTestId("login-btn");

    await userEvent.type(await screen.findByTestId("username-field"), username);
    await userEvent.type(await screen.findByTestId("password-field"), password);
    await userEvent.click(findLoginBtn);

    const findShareMovieBtn = await screen.findByTestId("share-movie-btn");

    await userEvent.click(findShareMovieBtn);

    render(renderSharePage());

    await expect(
      await screen.findByText("Share a Youtube movie")
    ).toBeVisible();
  });

  test("Logout user", async () => {
    render(renderHeader());
    await store.dispatch(AuthsAction.logout());

    const username = "congphan";
    const password = "12345678";

    const findLoginBtn = await screen.findByTestId("login-btn");

    await userEvent.type(await screen.findByTestId("username-field"), username);
    await userEvent.type(await screen.findByTestId("password-field"), password);
    await userEvent.click(findLoginBtn);

    const findLogoutBtn = await screen.findByTestId("logout-btn");

    await userEvent.click(findLogoutBtn);

    await expect(await screen.findByTestId("login-btn")).toBeVisible();
  });
});
