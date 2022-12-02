import { Button, Container } from "@chakra-ui/react";
import React, { useCallback, useState, useMemo, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import MoviesAction from "stores/redux/actions/MoviesAction";

import { matchYoutubeUrl } from "utils/functions";
import { HOMEPAGE } from "constants/routes";
import useNotification from "hooks/useNotification";

import NormalText from "components/NormalText";
import InputField from "components/InputField";

import { SharePageContainer, SharePageFormContainer } from "./sharePage.styles";

const SharePage = () => {
  const checkAuthentication = useSelector(
    (state) => state.authsReducer.checkAuthentication,
    shallowEqual
  );
  const loadingShareMovie = useSelector(
    (state) => state.moviesReducer.shareMovie.loading,
    shallowEqual
  );
  const dispatch = useDispatch();
  const { shareMovieRequest } = MoviesAction;

  const [youtubeURL, setYoutubeURL] = useState("");

  const history = useHistory();
  const { openNotificationSuccess, openNotificationError } = useNotification();

  const handleChangeYoutubeURL = useCallback((event) => {
    const { value } = event.target;

    setYoutubeURL(value);
  }, []);
  const handleShareMovie = useCallback(() => {
    const handleShareMovieSuccess = () => {
      setYoutubeURL("");
      openNotificationSuccess("Share a movie successful");
    };
    const handleShareMovieError = () => {
      openNotificationError("Something is wrong. Please try again later");
    };

    dispatch(
      shareMovieRequest(
        {
          url: youtubeURL,
        },
        handleShareMovieSuccess,
        handleShareMovieError
      )
    );
  }, [
    dispatch,
    openNotificationError,
    openNotificationSuccess,
    shareMovieRequest,
    youtubeURL,
  ]);

  const isDisabled = useMemo(
    () => !youtubeURL || !matchYoutubeUrl(youtubeURL),
    [youtubeURL]
  );

  useEffect(() => {
    if (!checkAuthentication) {
      history.push(HOMEPAGE);
    }
  }, [checkAuthentication, history]);

  return (
    <Container maxWidth="4xl">
      <SharePageContainer>
        <SharePageFormContainer>
          <NormalText
            text="Share a Youtube movie"
            position="absolute"
            top="-10px"
            background="background.overlay"
            zIndex={10}
            padding="0 5px"
            bold
            fontSize="18px"
          />
          <InputField
            data-testid="youtube-url-field"
            leftText="Youtube URL:"
            value={youtubeURL}
            onChange={handleChangeYoutubeURL}
          />
          <Button
            data-testid="share-btn"
            width="60%"
            margin="auto"
            marginTop="24px"
            background="blue.400"
            isLoading={loadingShareMovie}
            disabled={isDisabled}
            onClick={handleShareMovie}>
            Share
          </Button>
        </SharePageFormContainer>
      </SharePageContainer>
    </Container>
  );
};

export default SharePage;
