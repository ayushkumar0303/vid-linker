import { Button } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function ButtonUpload({ videoId }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleUpload = async (videoId) => {
    setUploading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(
        `/server/youtube/upload/${currentUser?._id}?videoId=${videoId}`
      );
      const data = await res.json();
      // console.log(data);
      if (res.ok) {
        navigate("/dashboard");
        setError(null);
        setSuccess(data.message);
      } else {
        setError(data.message);
        setSuccess(null);
      }
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
    setUploading(false);
  };
  return (
    <div>
      <Button
        size="xs"
        gradientMonochrome="success"
        onClick={() => handleUpload(videoId)}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>
      {error && <span className="text-xs text-red-500">{error}</span>}
      {success && <span className="text-xs text-green-500">{success}</span>}
    </div>
  );
}

export default ButtonUpload;
