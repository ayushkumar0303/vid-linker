import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

function ClientDashComponent() {
  const { currentUser } = useSelector((state) => state.user);
  const [clients, setClients] = useState([]);
  const [videosForReview, setVideosForReview] = useState([]);
  // console.log(freelacersList[0].populate(freelacersList[0].clientId));
  // console.log(freelacersList);
  useEffect(() => {
    const fetchClientsList = async () => {
      try {
        const res = await fetch(
          `/server/video/get-clients-list/${currentUser?._id}`
        );
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
          setClients(data.clientList);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchVideos = async () => {
      try {
        const res = await fetch(`/server/video/get-videos/${currentUser?._id}`);
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
          setVideosForReview(data.videos);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchVideos();
    fetchClientsList();
  }, [currentUser?._id]);
  return (
    <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
      {/* Clients Section */}
      <div className="flex justify-around">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center border-b pb-3">
            <p className="text-lg font-semibold text-gray-800">
              See all Clients
            </p>
            <Link to="/dashboard?tab=clients">
              <Button outline gradientMonochrome="success">
                See More
              </Button>
            </Link>
          </div>
          <div className="overflow-x-auto mt-4">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Client User ID</Table.HeadCell>
                <Table.HeadCell>Profile Picture</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {clients.map((client) => (
                  <Table.Row key={client._id} className="hover:bg-gray-100">
                    <Table.Cell className="p-3">{client.username}</Table.Cell>
                    <Table.Cell className="p-3">
                      <img
                        src={client.profilePicture}
                        alt={client.name}
                        className="w-10 h-10 rounded-full border"
                      />
                    </Table.Cell>
                    <Table.Cell className="p-3">{client.name}</Table.Cell>
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
            <Link to="/dashboard?tab=clients">
              <Button outline gradientMonochrome="success">
                See More
              </Button>
            </Link>
          </div>
          <div className="overflow-x-auto mt-4">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Client User ID</Table.HeadCell>
                <Table.HeadCell>Video</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {videosForReview.map((video) => (
                  <Table.Row key={video._id} className="hover:bg-gray-100">
                    <Table.Cell className="p-3">
                      {video.clientId.username}
                    </Table.Cell>
                    <Table.Cell className="p-3">
                      <video controls className="w-24 h-28 rounded-md border">
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
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDashComponent;
