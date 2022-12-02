import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { Router, Switch } from "react-router";
import "@testing-library/jest-dom";

import store from "stores/configureStore";
import theme from "themes";
import history from "utils/history";
import SharePage from "pages/sharePage";
import Header from "components/Header";
import { ToastContainer } from "react-toastify";
import AuthsAction from "stores/redux/actions/AuthsAction";

jest.setTimeout(120000);

const renderHeader = () => (
  <Provider store={store}>
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
    <ToastContainer />
    <Router history={history}>
      <ChakraProvider theme={theme}>
        <Switch>
          <SharePage />
        </Switch>
      </ChakraProvider>
    </Router>
  </Provider>
);

describe("Share Page", () => {
  beforeEach(async () => {
    render(renderHeader());
    await store.dispatch(AuthsAction.logout());

    const email = "congphan@gmail.com";
    const password = "12345678";

    const findLoginBtn = await screen.findByTestId("login-btn");

    await userEvent.type(await screen.findByTestId("email-field"), email);
    await userEvent.type(await screen.findByTestId("password-field"), password);
    await userEvent.click(findLoginBtn);

    const findShareMovieBtn = await screen.findByTestId("share-movie-btn");

    await userEvent.click(findShareMovieBtn);
  });

  test("Render share movie page", async () => {
    render(renderSharePage());

    await expect(
      await screen.findByText("Share a Youtube movie")
    ).toBeVisible();
  });

  test("Share a movie successful with valid url", async () => {
    render(renderSharePage());

    const validYoutubeURL =
      "https://www.youtube.com/watch?v=ysz5S6PUM-U&ab_channel=Xquisite";

    const findYoutubeURLField = await screen.findByTestId("share-btn");

    await userEvent.type(
      await screen.findByTestId("youtube-url-field"),
      validYoutubeURL
    );
    await userEvent.click(findYoutubeURLField);

    await new Promise((r) => setTimeout(r, 5000));

    await expect(
      await screen.findByText("Share a movie successful")
    ).toBeVisible();
  });

  test("Share a movie successful with invalid url", async () => {
    render(renderSharePage());

    const invalidYoutubeURL = "aaa";

    const findYoutubeURLField = await screen.findByTestId("share-btn");

    await userEvent.type(
      await screen.findByTestId("youtube-url-field"),
      invalidYoutubeURL
    );
    await userEvent.click(findYoutubeURLField);

    await expect(
      screen.queryAllByText("Share a movie successful")
    ).toHaveLength(0);
  });
});
