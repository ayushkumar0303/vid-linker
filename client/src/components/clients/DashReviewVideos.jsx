import { Button, Spinner, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

function DashReviewVideos() {
  const { currentUser } = useSelector((state) => state.user);
  const [videosForReview, setVideosForReview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seeMore, setSeeMore] = useState(true);
  // console.log(videosForReview);
  useEffect(() => {
    const fetchReviewVideos = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/server/video/get-review-videos/${currentUser?._id}`
        );
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
          setVideosForReview(data.reviewVideos);
          if (data.reviewVideos.length < 5) {
            setSeeMore(false);
          } else {
            setSeeMore(true);
          }
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

  const handleSeeMore = async () => {
    const startIndex = videosForReview.length;
    try {
      const res = await fetch(
        `/server/video/get-review-videos/${currentUser?._id}?startIndex=${startIndex}`
      );

      const data = await res.json();
      // console.log(data);
      if (res.ok) {
        setVideosForReview([...videosForReview, ...data.reviewVideos]);
        if (data.reviewVideos.length < 5) {
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
      <h1 className="text-center font-bold text-4xl">Videos for Review</h1>
      <div className="overflow-x-auto rounded-lg shadow-md p-6 m-6 bg-white">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Video</Table.HeadCell>
            <Table.HeadCell>Freelancer user id</Table.HeadCell>

            <Table.HeadCell>
              <span>Approve</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span>Reject</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {videosForReview.length > 0 ? (
              videosForReview.map((video) => (
                <Table.Row key={video._id} className="bg-white">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
                    {new Date(video.updatedAt).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell>
                    <video
                      controls
                      className="min-w-32 h-32 w-44 rounded-md border"
                    >
                      <source src={video.videoUrl} />
                      Error loading video
                    </video>
                  </Table.Cell>
                  <Table.Cell>
                    {video.freelancerId?.username || "anonymous"}
                  </Table.Cell>

                  {/* Video Preview */}

                  {/* Approve and Reject Links */}
                  <Table.Cell>
                    <Link to={`/approve/${video._id}`}>
                      <Button gradientMonochrome="info" size="xs">
                        Approve
                      </Button>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/reject/${video._id}`}>
                      <Button gradientMonochrome="failure" size="xs">
                        Reject
                      </Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))
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

export default DashReviewVideos;
