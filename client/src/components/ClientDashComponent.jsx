import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
        console.log(data.freelancersList);
        if (res.ok) {
          setFreelancers(data.freelancersList);
        } else {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `/server/video/get-review-videos/${currentUser?._id}`
        );
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setVideosForReview(data.videos);
        } else {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
    fetchFreelancerList();
  }, [currentUser?._id]);
  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <p>See all freelancers</p>
          <Button outline>See More</Button>
        </div>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Freelancer user id</Table.HeadCell>
              <Table.HeadCell>Profile Picture</Table.HeadCell>

              <Table.HeadCell>name</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {freelancers.map((freelancer) => (
                <Table.Row
                  key={freelancer._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 "
                >
                  <Table.Cell>{freelancer.username}</Table.Cell>
                  <Table.Cell>
                    <img
                      src={freelancer.profilePicture}
                      alt={freelancer.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell>{freelancer.name}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <p>See all uploaded videos</p>
          <Button outline>See More</Button>
        </div>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Freelancer user id</Table.HeadCell>
              <Table.HeadCell>Video</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {videosForReview.map((video) => (
                <Table.Row
                  key={video._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 "
                >
                  <Table.Cell>{video.freelancerId.username}</Table.Cell>
                  <Table.Cell>
                    <video controls className="w-24 h-28">
                      <source src={video.videoUrl} type="video/mp4" />
                      Your browser does not support the video.
                    </video>
                  </Table.Cell>
                  <Table.Cell>{video.videoStatus}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default FreelancerDashComponent;
