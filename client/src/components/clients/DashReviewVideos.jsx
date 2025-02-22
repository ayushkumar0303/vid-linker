import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

function DashReviewVideos() {
  const { currentUser } = useSelector((state) => state.user);
  const [videosForReview, setVideosForReview] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(videosForReview);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const fetchReviewVideos = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/server/video/get-review-videos/${currentUser?._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setVideosForReview(data.videosForReview);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    fetchReviewVideos();
  }, [currentUser?._id]);

  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  }
  return (
    <div className="overflow-x-auto rounded-lg shadow-md p-6 m-6 bg-white">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Time</Table.HeadCell>
          <Table.HeadCell>Freelancer user id</Table.HeadCell>
          <Table.HeadCell>Video</Table.HeadCell>

          <Table.HeadCell>
            <span>Approve</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span>Reject</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {videosForReview.length > 0 ? (
            videosForReview.map(
              (video) =>
                video.freelancerId && (
                  <Table.Row key={video._id} className="bg-white">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
                      {new Date(video.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
                      {new Date(video.updatedAt).toLocaleTimeString()}
                    </Table.Cell>
                    <Table.Cell>{video.freelancerId.username}</Table.Cell>

                    {/* Video Preview */}
                    <Table.Cell>
                      <video controls className="w-32 h-20 rounded-md">
                        <source src={video.videoUrl} type="video/mp4" />
                        Your browser does not support the video.
                      </video>
                    </Table.Cell>

                    {/* Approve and Reject Links */}
                    <Table.Cell>
                      <a
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        href={`/server/youtube/connect/${currentUser?._id}?videoId=${video._id}`}
                        className="rounded-full font-medium text-green-600 hover:underline px-2 py-1 hover:bg-green-100"
                      >
                        Approve
                      </a>
                      {hover && (
                        <div className="absolute z-10 bg-yellow-100 px-2 py-1 bottom-2 right-20 rounded-lg text-yellow-500">
                          Link your Youtube Account
                        </div>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        to={`/reject/${video._id}`}
                        className="px-2 py-1 font-medium text-red-600 hover:underline hover:bg-red-100 rounded-full"
                      >
                        Reject
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                )
            )
          ) : (
            <Table.Row>
              <Table.Cell
                colSpan="7"
                className="text-center text-gray-500 py-4"
              >
                No Videos for Review
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}

export default DashReviewVideos;
