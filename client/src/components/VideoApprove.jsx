import { Button, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

function VideoApprove() {
  const { videoId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
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
        window.location.href = `/server/youtube/connect/${currentUser?._id}?videoId=${videoId}`;
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          type="text"
          required={true}
          placeholder="Video title"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <Textarea
          type="text"
          placeholder="Video Discription"
          required={true}
          onChange={(e) =>
            setFormData({ ...formData, discription: e.target.value })
          }
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default VideoApprove;
