import { Container } from "@chakra-ui/react";
import React from "react";

import MovieList from "./components/MovieList";

const Homepage = () => {
  return (
    <Container maxWidth="4xl">
      <MovieList />
    </Container>
  );
};

export default Homepage;
