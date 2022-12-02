import { Box, Center, Flex } from "@chakra-ui/react";
import React, { Fragment, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import MoviesAction from "stores/redux/actions/MoviesAction";

import Loading from "components/Loading";
import MovieItem from "../MoveItem";

const MovieList = () => {
  const movieList = useSelector(
    (state) => state.moviesReducer.movieList.data,
    shallowEqual
  );
  const loading = useSelector(
    (state) => state.moviesReducer.movieList.loading,
    shallowEqual
  );
  const dispatch = useDispatch();
  const { getMovieListRequest } = MoviesAction;

  useEffect(() => {
    dispatch(getMovieListRequest());
  }, [dispatch, getMovieListRequest]);

  return (
    <Box
      data-testid="movie-list"
      my={{
        base: "24px",
        md: "32px",
      }}>
      {loading ? (
        <Center mt="200px">
          <Loading />
        </Center>
      ) : (
        <Flex flexDirection="column">
          {movieList?.map((record) => (
            <Fragment key={record?.id}>
              <MovieItem movieItem={record} />
            </Fragment>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default MovieList;
