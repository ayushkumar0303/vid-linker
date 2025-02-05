import User from "../models/user.models.js";
import Video from "../models/video.models.js";
import errorHandler from "../utils/error.js";

export const uploadVideo = async (req, res, next) => {
  const { clientId, videoUrl } = req.body;
  // console.log(clientId);
  // console.log(freelancerId);
  // console.log(videoUrl);
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You are not allowed to upload video"));
  }

  try {
    const videoUpload = new Video({
      clientId,
      freelancerId: req.user.id,
      videoUrl,
    });
    await videoUpload.save();
    return res.status(200).json({ message: "video uploaded successfully" });
  } catch (error) {
    return next(error);
  }
};

export const getReviewVideos = async (req, res, next) => {
  // console.log("hfhfh");
  const clientId = req.user.id;
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You are not authenticated"));
  }

  try {
    const videos = await Video.find({ clientId }).populate(
      "freelancerId",
      "username"
    );

    const videosForReview = videos.filter(
      (video) => video.videoStatus === "Pending"
    );

    return res.status(200).json({ videos, videosForReview });
  } catch (error) {
    return next(error);
  }
};

export const setVideoMetaData = async (req, res, next) => {
  const { title, description } = req.body;
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(
        401,
        "You are not allowed to set the meta data for this video"
      )
    );
  }
  try {
    const video = await Video.findOneAndUpdate(
      {
        _id: req.params.videoId,
        clientId: req.user.id,
      },
      {
        $set: {
          videoTitle: title,
          videoDescription: description,
          videoStatus: "Approved",
        },
      },
      { new: true }
    );
    if (!video) {
      return next(errorHandler(404, "Video not found"));
    }

    return res
      .status(200)
      .json({ message: "Video meta data set successfully" });
  } catch (error) {
    return next(error);
  }
};

export const getFreelancersList = async (req, res, next) => {
  const clientId = req.user.id;
  console.log(clientId);
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "Not allowed to do this"));
  }
  try {
    // const freelancersList = await Video.aggregate([
    //   { $match: { clientId } },
    //   { $group: { _id: "$freelancerId" } },
    //   {
    //     $lookup: {
    //       from: "User",
    //       localField: "_id",
    //       foreignField: "_id",
    //       as: "freelancers",
    //     },
    //   },
    //   // { $unwind: "$freelancers" },
    //   {
    //     $project: {
    //       _id: "$freelancers._id",
    //       name: "$freelancers.name",
    //       username: "$freelancers.username",
    //       profilePicture: "$freelancers.profilePicture",
    //       email: "$freelancers.email",
    //     },
    //   },
    // ]);

    // console.log(freelancersList);
    const distinctFreelancers = await Video.distinct("freelancerId", {
      clientId,
    });

    const freelancersList = await User.find(
      {
        _id: { $in: distinctFreelancers },
      },
      "name username email profilePicture updatedAt createdAt"
    );

    // console.log(videos);
    if (freelancersList.length === 0) {
      return next(errorHandler(404, "Not found any freelancer"));
    }
    console.log(freelancersList);
    return res.status(200).json(freelancersList);
  } catch (error) {
    return next(error);
  }
};

export const getClientsList = async (req, res, next) => {
  const freelancerId = req.user.id;
  console.log(freelancerId);
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "Not allowed to do this"));
  }
  try {
    const distinctClients = await Video.distinct("clientId", {
      freelancerId,
    });

    const clientList = await User.find(
      {
        _id: { $in: distinctClients },
      },
      "name username email profilePicture updatedAt createdAt"
    );

    // console.log(videos);
    if (clientList.length === 0) {
      return next(errorHandler(404, "Not found any client"));
    }
    console.log(clientList);
    return res.status(200).json(clientList);
  } catch (error) {
    return next(error);
  }
};
