import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

function FreelancerDashComponent() {
  const { currentUser } = useSelector((state) => state.user);
  const [freelancers, setFreelancers] = useState([]);
  const [videosForReview, setVideosForReview] = useState([]);
  // console.log(freelacersList[0].populate(freelacersList[0].clientId));
  // console.log(freelacersList);
  useEffect(() => {
    const fetchFreelancerList = async () => {
      try {
        const res = await fetch(
          `/server/video/get-freelancers-list/${currentUser?._id}`
        );
        const data = await res.json();
        // console.log(data.freelancersList);
        if (res.ok) {
          setFreelancers(data.freelancersList);
        } else {
          console.log(error.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `/server/video/get-review-videos/${currentUser?._id}`
        );
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
          setVideosForReview(data.videos);
        } else {
          console.log(error.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchVideos();
    fetchFreelancerList();
  }, [currentUser?._id]);
  return (
    <div className="p-6 bg-gray-100 min-h-screen ">
      {/* Clients Section */}
      <div className="flex justify-around">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center border-b pb-3">
            <p className="text-lg font-semibold text-gray-800">
              See all Freelancers
            </p>
            <Link to="/dashboard?tab=freelancers">
              <Button outline gradientMonochrome="success" size="sm">
                See More
              </Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <Table
              hoverable={true}
              className="border-2 border-gray-200 rounded-lg"
            >
              <Table.Head>
                <Table.HeadCell>Freelancer User ID</Table.HeadCell>
                <Table.HeadCell>Profile Picture</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {freelancers.map((freelancer) => (
                  <Table.Row key={freelancer._id} className="bg-white ">
                    <Table.Cell>{freelancer.username}</Table.Cell>
                    <Table.Cell>
                      <img
                        src={freelancer.profilePicture}
                        alt={freelancer.name}
                        className="w-12 h-12 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell>{freelancer.name}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>

        {/* Videos Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center border-b pb-3">
            <p className="text-lg font-semibold text-gray-800">
              See all Videos
            </p>
            <Link to="/dashboard?tab=videos">
              <Button outline gradientMonochrome="success" size="sm">
                See More
              </Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <Table
              hoverable={true}
              className="border-2 border-gray-200 rounded-lg"
            >
              <Table.Head>
                <Table.HeadCell>Freelancer User ID</Table.HeadCell>
                <Table.HeadCell>Video</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {videosForReview.map((video) => (
                  <Table.Row key={video._id} className="bg-white ">
                    <Table.Cell>{video.freelancerId.username}</Table.Cell>
                    <Table.Cell>
                      <video controls className="w-24 h-28 rounded-md">
                        <source src={video.videoUrl} type="video/mp4" />
                        Your browser does not support the video.
                      </video>
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          video.videoStatus === "Approved"
                            ? "text-green-600 bg-green-100"
                            : video.videoStatus === "Pending"
                            ? "text-yellow-600 bg-yellow-100"
                            : "text-red-600 bg-red-100"
                        } font-semibold`}
                      >
                        {video.videoStatus}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
      {/* Additional Information */}
      <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800">
          Welcome to the Client Dashboard
        </h3>
        <p className="text-gray-600 mt-2">
          As a client, you can view all available freelancers and their
          profiles. You can also track the videos that have been uploaded by
          freelancers for review. If you want to see more, simply click "See
          More" to view additional freelancers or videos.
        </p>
      </div>
    </div>
  );
}

export default FreelancerDashComponent;
