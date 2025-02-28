import { Alert, Button, Spinner, Table } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ButtonUpload from "../clients/ButtonUpload";

function DashFreelancerVideo() {
  const { currentUser } = useSelector((state) => state.user);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [seeMore, setSeeMore] = useState(true);

  let vidId;
  // const navigate()

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/server/video/get-videos/${currentUser?._id}`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setVideos(data.videos);
          if (data.videos.length < 5) {
            setSeeMore(false);
          } else {
            setSeeMore(true);
          }
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    fetchVideos();
  }, [currentUser?._id]);

  const handleSeeMore = async () => {
    const startIndex = videos.length;
    try {
      const res = await fetch(
        `/server/video/get-videos/${currentUser?._id}?startIndex=${startIndex}`
      );

      const data = await res.json();
      // console.log(data);
      if (res.ok) {
        setVideos([...videos, ...data.videos]);
        if (data.videos.length < 5) {
          setSeeMore(false);
        } else {
          setSeeMore(true);
        }
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return (
      <p className="text-center">
        <Spinner color="success" aria-label="Success spinner example" />
      </p>
    );
  }
  return (
    <div>
      <h1 className="text-center font-bold text-5xl">Videos send for Review</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 m-6">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Video</Table.HeadCell>
            <Table.HeadCell>Client User ID</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Information</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {videos.length > 0 ? (
              videos.map((video) => (
                <Table.Row key={video._id} className="hover:bg-gray-100">
                  <Table.Cell className="p-3">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell className="p-3">
                    <video
                      controls
                      className="min-w-32 h-32 w-44 rounded-md border"
                    >
                      <source src={video.videoUrl} />
                      Error loading video
                    </video>
                  </Table.Cell>
                  <Table.Cell className="p-3">
                    {video.clientId?.username || "anonymous"}
                  </Table.Cell>

                  <Table.Cell className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        video.videoStatus === "Uploaded"
                          ? "text-green-600 bg-green-100"
                          : video.videoStatus === "Approved"
                          ? "text-blue-600 bg-blue-100"
                          : video.videoStatus === "Pending"
                          ? "text-yellow-600 bg-yellow-100"
                          : "text-red-600 bg-red-100"
                      }`}
                    >
                      {video.videoStatus}
                    </span>
                  </Table.Cell>
                  {video.videoStatus === "Rejected" && (
                    <Table.Cell className="p-3 max-w-10 min-w-7">
                      <span className="italic">Reject message: </span>
                      <span className="text-red-500">
                        {video.videoRejectMessage}
                      </span>
                    </Table.Cell>
                  )}
                  {video.videoStatus === "Approved" && (
                    <Table.Cell className="p-3 max-w-10 min-w-7">
                      <span className="italic">Channel name:</span>
                      <span className="text-blue-500">
                        {video.youtubeChannelName}
                      </span>
                      <div className="flex gap-2 justify-center items-center">
                        <ButtonUpload videoId={video._id} />
                      </div>
                    </Table.Cell>
                  )}
                  {video.videoStatus === "Uploaded" && (
                    <Table.Cell className="p-3 max-w-10 min-w-7">
                      <span className="italic">Uploaded to:</span>
                      <span className="text-green-500">
                        {video.youtubeChannelName}
                      </span>
                    </Table.Cell>
                  )}
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell
                  colSpan="5"
                  className="text-center text-gray-500 py-4"
                >
                  No Videos Sent for Review
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
      {seeMore && (
        <p
          className="text-center text-green-500 cursor-pointer "
          onClick={handleSeeMore}
        >
          See more
        </p>
      )}
    </div>
  );
}

export default DashFreelancerVideo;
