import Video from "../models/video.models.js";
import errorHander from "../utils/error.js";

export const uploadVideo = async (req, res, next) => {
  const { clientId, freelancerId, videoUrl } = req.body;
  // console.log(clientId);
  // console.log(freelancerId);
  // console.log(videoUrl);
  if (req.user.id !== req.params.userId) {
    return next(errorHander(401, "You are not allowed to upload video"));
  }

  try {
    const videoUpload = await Video({ clientId, freelancerId, videoUrl });
    await videoUpload.save();
    return res.status(200).json({ message: "video uploaded successfully" });
  } catch (error) {
    return next(error);
  }
};

export const getReviewVideos = async (req, res, next) => {
  // console.log("hfhfh");
  const clientId = req.user.username;
  if (req.user.id !== req.params.userId) {
    return next(errorHander(401, "You are not authenticated"));
  }

  try {
    const videos = await Video.find({ clientId });
    // console.log(videos);

    return res.status(200).json(videos);
  } catch (error) {
    console.log(error);
  }
};

export const setVideoMetaData = async (req, res, next) => {
  const { title, discription } = req.body;
  if (req.user.id !== req.params.userId) {
    return next(
      errorHander(
        401,
        "You are not allowed to set the meta data for this video"
      )
    );
  }
  try {
    const video = await Video.findByIdAndUpdate(
      {
        _id: req.params.videoId,
        clientId: req.user.username,
      },
      {
        $set: {
          videoTitle: title,
          videoDiscription: discription,
          videoStatus: "Approved",
        },
      },
      { new: true }
    );
    if (!video) {
      return next(errorHander(404, "Video not found"));
    }

    return res
      .status(200)
      .json({ message: "Video meta data set successfully" });
  } catch (error) {
    return next(error);
  }
};
