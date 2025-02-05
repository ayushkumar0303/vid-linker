import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

function DashReviewVideos() {
  const { currentUser } = useSelector((state) => state.user);
  const [videosForReview, setVideosForReview] = useState([]);
  // console.log(videosForReview);
  useEffect(() => {
    const fetchReviewVideos = async () => {
      try {
        const res = await fetch(
          `/server/video/get-review-videos/${currentUser?._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setVideosForReview(data.videosForReview);
        } else {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviewVideos();
  }, [currentUser?._id]);
  return videosForReview.length > 0 ? (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Time</Table.HeadCell>
          <Table.HeadCell>Freelancer user id</Table.HeadCell>
          <Table.HeadCell>Video</Table.HeadCell>
          <Table.HeadCell>Video status</Table.HeadCell>

          <Table.HeadCell>
            <span>Approve</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span>Reject</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {videosForReview.map((video) => (
            <Table.Row
              key={video._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800 "
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {new Date(video.updatedAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {new Date(video.updatedAt).toLocaleTimeString()}
              </Table.Cell>
              <Table.Cell>{video.freelancerId}</Table.Cell>

              <Table.Cell>
                <video width="120" controls>
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video.
                </video>
              </Table.Cell>

              <Table.Cell className="text-yellow-400">
                {video.videoStatus}
              </Table.Cell>

              <Table.Cell>
                <Link
                  to={`/dashboard/approve/${video._id}`}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Approve
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Link
                  to={`/dashboard/reject/${video._id}`}
                  className="font-medium text-red-600 hover:underline dark:text-cyan-500"
                >
                  Reject
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ) : (
    <h1>No Videos for review</h1>
  );
}

export default DashReviewVideos;
