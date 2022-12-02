import pkg from "sequelize";
import yt from "yt-getvideos";

import MoviesModel from "../models/movies.model.js";

// [GET]
export const getMovieList = async (req, res) => {
  const movieList = await MoviesModel.findAll({});

  res.status(200).json(movieList);
};

// [POST]
export const shareMovie = async (req, res) => {
  const { url } = req.body;
  const youtubeId = url?.split("v=")?.[1];

  if (url === undefined) {
    res.status(400);
    throw new Error("URL is a require field. Please try again");
  }

  const youtubeData = await yt.videoInfo(youtubeId);
  const newMovie = await MoviesModel.create({
    url,
    title: youtubeData?.title,
    description: youtubeData?.description,
    sharedBy: req.user.email,
  });

  res.status(200).json(newMovie);
};

// [PUT]
export const updateVoteMovie = async (req, res) => {
  const { id } = req.params;
  const { voteType } = req.body;

  const findMovie = await MoviesModel.findOne({
    where: {
      id,
    },
  });

  // enum voteUp | voteDown
  if (voteType === "voteUp") {
    const movieVoteUpUpData = {
      votedUpCount: findMovie?.votedUpCount + 1,
      votedDownCount:
        findMovie?.votedDownCount > 0 ? findMovie?.votedDownCount - 1 : 0,
      votedUpUserList: [...findMovie?.votedUpUserList, req.user.id],
      votedDownUserList: findMovie?.votedDownUserList?.filter(
        (userId) => userId !== req.user.id
      ),
    };

    await findMovie.update(movieVoteUpUpData);
  } else if (voteType === "voteDown") {
    const movieVoteDownUpData = {
      votedUpCount:
        findMovie?.votedDownCount > 0 ? findMovie?.votedDownCount - 1 : 0,
      votedDownCount: findMovie?.votedUpCount + 1,
      votedUpUserList: findMovie?.votedUpUserList?.filter(
        (userId) => userId !== req.user.id
      ),
      votedDownUserList: [...findMovie?.votedDownUserList, req.user.id],
    };

    await findMovie.update(movieVoteDownUpData);
  } else {
    const findVotedUpUserList = findMovie?.votedUpUserList?.find(
      (userId) => userId === req.user.id
    );
    const findVotedDownUserList = findMovie?.votedDownUserList?.find(
      (userId) => userId === req.user.id
    );

    if (findVotedUpUserList) {
      const movieVoteUpUpData = {
        votedUpCount: findMovie?.votedUpCount - 1,
        votedUpUserList: findMovie?.votedUpUserList?.filter(
          (userId) => userId !== req.user.id
        ),
      };

      await findMovie.update(movieVoteUpUpData);
    } else if (findVotedDownUserList) {
      const movieVoteDownUpData = {
        votedDownCount: findMovie?.votedDownCount - 1,
        votedDownUserList: findMovie?.votedDownUserList?.filter(
          (userId) => userId !== req.user.id
        ),
      };

      await findMovie.update(movieVoteDownUpData);
    }
  }

  res.status(200).json(findMovie);
};
