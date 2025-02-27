import { Spinner, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function DashClientVideo() {
  const { currentUser } = useSelector((state) => state.user);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seeMore, setSeeMore] = useState(true);
  // console.log(videos);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/server/video/get-review-videos/${currentUser?._id}`
        );
        const data = await res.json();
        // console.log(data);
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
        `/server/video/get-review-videos/${currentUser?._id}?startIndex=${startIndex}`
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
      <h1 className="text-center font-bold text-4xl">Client's Videos</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 m-6">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Time</Table.HeadCell>
            <Table.HeadCell>Video</Table.HeadCell>
            <Table.HeadCell>FreelancerId User ID</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Reject Message</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {videos.length > 0 ? (
              videos.map((video) => (
                <Table.Row key={video._id} className="hover:bg-gray-100">
                  <Table.Cell className="p-3">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="p-3">
                    {new Date(video.createdAt).toLocaleTimeString()}
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
                    {video.freelancerId?.username || "anonymous"}
                  </Table.Cell>

                  <Table.Cell className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        video.videoStatus === "Approved"
                          ? "bg-green-100 text-green-600"
                          : video.videoStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {video.videoStatus}
                    </span>
                  </Table.Cell>
                  {video.videoStatus === "Rejected" && (
                    <Table.Cell className="p-3 max-w-10">
                      <span>{video.videoRejectMessage}</span>
                    </Table.Cell>
                  )}
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell
                  colSpan="6"
                  className="text-center text-gray-500 py-4"
                >
                  No Videos
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

export default DashClientVideo;
