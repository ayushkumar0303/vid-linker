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
    // console.log(videosForReview);
    return res.status(200).json({ videos, videosForReview });
  } catch (error) {
    return next(error);
  }
};
export const getVideos = async (req, res, next) => {
  // console.log("hfhfh");
  const freelancerId = req.user.id;
  // console.log("freelancerID", freelancerId);
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You are not authenticated"));
  }

  try {
    const videos = await Video.find({ freelancerId }).populate(
      "clientId",
      "username"
    );

    // console.log(videos);

    return res.status(200).json({ videos });
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
  // console.log(clientId);
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
    // console.log(freelancersList);
    // console.log(videos);
    const freelancerCount = freelancersList.length;
    const now = new Date();

    const oneMonthAgoDate = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    // console.log(oneMonthAgoDate);
    const oneMonthAgoFreelancers = await User.find({
      _id: { $in: distinctFreelancers },
      createAt: { $gte: oneMonthAgoDate },
    });

    const oneMonthAgoFreelancerCount = oneMonthAgoFreelancers.length;

    // console.log(freelancersList);
    return res.status(200).json({
      freelancersList,
      freelancerCount,
      oneMonthAgoFreelancers,
      oneMonthAgoFreelancerCount,
    });
  } catch (error) {
    return next(error);
  }
};

export const getClientsList = async (req, res, next) => {
  const freelancerId = req.user.id;
  // console.log(freelancerId);
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "Not allowed to do this"));
  }
  try {
    const distinctClients = await Video.distinct("clientId", {
      freelancerId,
    });

    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const clientList = await User.find(
      {
        _id: { $in: distinctClients },
      },
      "name username email profilePicture updatedAt createdAt"
    )
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    // console.log(videos);

    const totalClients = clientList.length;
    const now = new Date();

    const oneMonthAgoDate = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const oneMonthAgoClients = await User.find({
      _id: {
        $in: distinctClients,
      },
      createdAt: { $gte: oneMonthAgoDate },
    });
    const oneMonthAgoClientsTotal = oneMonthAgoClients.length;
    // console.log(clientList);
    return res.status(200).json({
      clientList,
      oneMonthAgoClients,
      totalClients,
      oneMonthAgoClientsTotal,
    });
  } catch (error) {
    return next(error);
  }
};
