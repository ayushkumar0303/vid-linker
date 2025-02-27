import { Alert, Button, TextInput, Textarea } from "flowbite-react";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

function VideoReject() {
  const { videoId } = useParams();
  const message = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
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
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg bg-white p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
          Why are you rejecting this video
        </h2>
        <p className="text-center text-sm text-gray-800 mb-2">Send feedback</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Textarea
            placeholder="Message"
            ref={message}
            maxLength="100"
            rows="3"
            cols="10"
            className="resize-none"
          />
          <Button gradientMonochrome="success" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </form>
        {!loading && error && (
          <Alert className="mt-2" color="failure">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default VideoReject;
