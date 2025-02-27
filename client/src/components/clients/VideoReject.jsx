import { Button, TextInput } from "flowbite-react";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

function VideoReject() {
  const { videoId } = useParams();
  const message = useRef();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `/server/video/video-reject/${currentUser._id}/${videoId}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            message: message.current.value,
          }),
        }
      );

      const data = await res.json();
      // console.log(data);
      if (res.ok) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg bg-white p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
          Send Feedback
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextInput placeholder="Message" ref={message} maxLength="100" />
          <Button gradientMonochrome="success" type="submit">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default VideoReject;
