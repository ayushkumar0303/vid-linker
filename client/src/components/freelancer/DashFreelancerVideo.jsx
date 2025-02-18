import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function DashFreelancerVideo() {
  const { currentUser } = useSelector((state) => state.user);
  const [videos, setVideos] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/server/video/get-videos/${currentUser?._id}`);
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
          setVideos(data.videos);
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
  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  }
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 m-6">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Time</Table.HeadCell>
          <Table.HeadCell>Client User ID</Table.HeadCell>
          <Table.HeadCell>Video</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {videos.length > 0 ? (
            videos.map(
              (video) =>
                video.clientId && (
                  <Table.Row key={video._id} className="hover:bg-gray-100">
                    <Table.Cell className="p-3">
                      {new Date(video.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell className="p-3">
                      {new Date(video.createdAt).toLocaleTimeString()}
                    </Table.Cell>
                    <Table.Cell className="p-3">
                      {video.clientId.username}
                    </Table.Cell>
                    <Table.Cell className="p-3">
                      <video controls className="w-32 h-20 rounded-md border">
                        <source src={video.videoUrl} />
                        Error loading video
                      </video>
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
                  </Table.Row>
                )
            )
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
  );
}

export default DashFreelancerVideo;
