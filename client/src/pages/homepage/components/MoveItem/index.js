import React, { useCallback, useMemo } from "react";
import ReactPlayer from "react-player/lazy";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { Flex, Icon, useMediaQuery } from "@chakra-ui/react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import MoviesAction from "stores/redux/actions/MoviesAction";

import { VOTE_TYPE } from "shared/schemas";

import NormalText from "components/NormalText";
import TitleText from "components/TitleText";

import {
  MovieItemContainer,
  MovieItemDescriptionContainer,
  MovieItemLeftContainer,
  MovieItemRightContainer,
  MovieItemVoteActionContainer,
  MovieItemVoteItemContainer,
} from "./moveItem.styles";

const MovieItem = ({ movieItem }) => {
  const {
    id,
    url,
    title,
    sharedBy,
    votedUpCount,
    votedDownCount,
    description,
    votedUpUserList,
    votedDownUserList,
  } = movieItem;

  const checkAuthentication = useSelector(
    (state) => state.authsReducer.checkAuthentication,
    shallowEqual
  );
  const userData = useSelector(
    (state) => state.authsReducer.userData,
    shallowEqual
  );
  const dispatch = useDispatch();
  const { updateVoteMovieRequest } = MoviesAction;
  const [checkMobileView] = useMediaQuery("(max-width: 48em)");

  const isVoteUp = useMemo(
    () => votedUpUserList?.find((userId) => userId === userData?.id),
    [userData?.id, votedUpUserList]
  );
  const isVoteDown = useMemo(
    () => votedDownUserList?.find((userId) => userId === userData?.id),
    [userData?.id, votedDownUserList]
  );
  const voteStatusText = useMemo(
    () =>
      !isVoteUp && !isVoteDown
        ? "(un-voted)"
        : isVoteUp
        ? "voted-up"
        : "voted-down",
    [isVoteDown, isVoteUp]
  );

  const handleVoteMovie = useCallback(
    (voteType) => {
      dispatch(updateVoteMovieRequest(id, voteType));
    },
    [dispatch, id, updateVoteMovieRequest]
  );

  return (
    <MovieItemContainer>
      <MovieItemLeftContainer>
        <ReactPlayer
          url={url}
          width="100%"
          height={checkMobileView ? 300 : "100%"}
          controls
        />
      </MovieItemLeftContainer>
      <MovieItemRightContainer>
        <TitleText
          title={title?.length > 40 ? `${title?.substring(0, 40)}...` : title}
          fontSize="18px"
          width="100%"
        />
        {checkAuthentication && (
          <>
            <Flex alignItems="center">
              <NormalText text={`Shared by: ${sharedBy}`} />
              <MovieItemVoteActionContainer>
                {!isVoteUp && !isVoteDown ? (
                  <>
                    <Icon
                      as={AiOutlineDislike}
                      fontSize="24px"
                      mr="8px"
                      cursor="pointer"
                      onClick={() => handleVoteMovie(VOTE_TYPE.VOTE_DOWN)}
                    />
                    <Icon
                      as={AiOutlineLike}
                      fontSize="24px"
                      cursor="pointer"
                      onClick={() => handleVoteMovie(VOTE_TYPE.VOTE_UP)}
                    />
                  </>
                ) : (
                  <>
                    {isVoteUp && (
                      <Icon
                        as={AiFillLike}
                        fontSize="24px"
                        cursor="pointer"
                        onClick={() => handleVoteMovie(VOTE_TYPE.VOTE_EMPTY)}
                      />
                    )}
                    {isVoteDown && (
                      <Icon
                        as={AiFillDislike}
                        fontSize="24px"
                        cursor="pointer"
                        onClick={() => handleVoteMovie(VOTE_TYPE.VOTE_EMPTY)}
                      />
                    )}
                  </>
                )}
                <NormalText text={voteStatusText} ml="12px" />
              </MovieItemVoteActionContainer>
            </Flex>

            <Flex alignItems="center">
              <MovieItemVoteItemContainer>
                <NormalText text={votedUpCount} mr="4px" />
                <Icon as={AiOutlineDislike} fontSize="16px" />
              </MovieItemVoteItemContainer>
              <MovieItemVoteItemContainer>
                <NormalText text={votedDownCount} mr="4px" />
                <Icon as={AiOutlineLike} fontSize="16px" />
              </MovieItemVoteItemContainer>
            </Flex>
          </>
        )}

        <MovieItemDescriptionContainer>
          <NormalText text="Description" marginBottom="4px" />
          <NormalText
            text={
              description?.length > 360
                ? `${description?.substring(0, 380)}...`
                : description
            }
          />
        </MovieItemDescriptionContainer>
      </MovieItemRightContainer>
    </MovieItemContainer>
  );
};

export default MovieItem;
