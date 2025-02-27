import { Alert, Button, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { FaYoutube } from "react-icons/fa6";

function UploadVideo() {
  const { videoId, channelName } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // console.log(params);

  const handleUpload = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/server/youtube/upload/${currentUser?._id}?videoId=${videoId}`
      );
      const data = await res.json();
      // console.log(data);
      if (res.ok) {
        navigate("/dashboard");
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="flex items-center justify-center flex-wrap gap-2 text-2xl font-semibold text-gray-800 mb-4">
          <span>Video uploading to the</span>
          <span className="text-red-500">
            <FaYoutube />
          </span>
          <span className="text-green-500">{channelName}</span>
        </h2>
        <Button
          onClick={handleUpload}
          type="button"
          disabled={loading}
          gradientMonochrome="success"
          className="w-full mt-4 text-white font-semibold "
        >
          {loading ? "Uploading Video" : "Upload Video"}
        </Button>
      </div>
      {error && (
        <Alert className="mt-2" color="failure">
          {error}
        </Alert>
      )}
    </div>
  );
}

export default UploadVideo;
