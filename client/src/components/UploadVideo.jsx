import { Button } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

function UploadVideo() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const handleUpload = async () => {
    try {
      const res = await fetch(
        `/server/youtube/upload/${currentUser?._id}?videoId=${videoId}`
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        navigate("/dashboard");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button onClick={handleUpload} outline>
        Upload
      </Button>
    </div>
  );
}

export default UploadVideo;
