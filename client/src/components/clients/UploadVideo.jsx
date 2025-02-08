import { Button, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

function UploadVideo() {
  const { videoId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [isMetadataSubmitted, setIsMetadataSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  // console.log(params);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `/server/video/set-meta-data/${currentUser?._id}/${videoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (res.ok) {
        // navigate("/upload");
        setIsMetadataSubmitted(true);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleUpload = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/server/youtube/upload/${currentUser?._id}?videoId=${videoId}`
      );
      const data = await res.json();
      // console.log(data);
      if (res.ok) {
        navigate("/dashboard");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
          Video Metadata Submission
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Provide a title and description for the video you want to approve.
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          {/* Video Title Input */}
          <TextInput
            type="text"
            required
            placeholder="Video Title"
            className="w-full border-gray-300 focus:border-green-500"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {/* Video Description Input */}
          <Textarea
            placeholder="Video Description"
            required
            rows={4}
            className="w-full border-gray-300 focus:border-green-500"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          {/* Submit Button */}
          <Button
            disabled={isMetadataSubmitted}
            type="submit"
            outline
            gradientMonochrome="success"
          >
            Submit Metadata
          </Button>
        </form>
        {isMetadataSubmitted && (
          <Button
            onClick={handleUpload}
            type="button"
            disabled={loading}
            gradientMonochrome="success"
            className="w-full mt-4 text-white font-semibold "
          >
            {loading ? "Uploading Video" : "Upload Video"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default UploadVideo;
