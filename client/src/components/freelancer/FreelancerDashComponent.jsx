import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

function ClientDashComponent() {
  const { currentUser } = useSelector((state) => state.user);
  const [clients, setClients] = useState([]);
  const [videosForReview, setVideosForReview] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  // console.log(freelacersList[0].populate(freelacersList[0].clientId));
  // console.log(freelacersList);
  useEffect(() => {
    const fetchClientsList = async () => {
      try {
        setClientsLoading(true);
        const res = await fetch(
          `/server/video/get-clients-list/${currentUser?._id}?limit=5`
        );
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
          setClients(data.clientList);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
      setClientsLoading(false);
    };
    const fetchVideos = async () => {
      setVideoLoading(true);
      try {
        const res = await fetch(
          `/server/video/get-videos/${currentUser?._id}?limit=5`
        );
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
          setVideosForReview(data.videos);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
      setVideoLoading(false);
    };
    fetchVideos();
    fetchClientsList();
  }, [currentUser?._id]);
  return (
    <div className="flex justify-around flex-wrap">
      <div className="bg-white shadow-md rounded-lg p-6 m-6 min-w-[400px]">
        {clientsLoading ? (
          <h1 className="text-center">Loading...</h1>
        ) : (
          <>
            <div className="flex justify-between items-center border-b pb-3 m-3">
              <p className="text-lg font-semibold text-gray-800">
                Recent Clients
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
                  {clients.length > 0 ? (
                    clients.map((client) => (
                      <Table.Row key={client._id} className="hover:bg-gray-100">
                        <Table.Cell className="p-3">
                          {client.username}
                        </Table.Cell>
                        <Table.Cell className="p-3">
                          <img
                            src={client.profilePicture}
                            alt={client.name}
                            className="w-10 h-10 rounded-full border"
                          />
                        </Table.Cell>
                        <Table.Cell className="p-3">{client.name}</Table.Cell>
                      </Table.Row>
                    ))
                  ) : (
                    <Table.Row>
                      <Table.Cell
                        colSpan="3"
                        className="text-center text-gray-500 py-4 m-3"
                      >
                        No clients available
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </div>
          </>
        )}
      </div>

      {/* Videos Section */}
      <div className="bg-white shadow-md rounded-lg p-6 m-6 min-w-[400px]">
        {videoLoading ? (
          <h1 className="text-center">Loading...</h1>
        ) : (
          <>
            <div className="flex justify-between items-center border-b pb-3">
              <p className="text-lg font-semibold text-gray-800">
                Recent Videos
              </p>
              <Link to="/dashboard?tab=videos">
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
                  {videosForReview.length > 0 ? (
                    videosForReview.map((video) => (
                      <Table.Row key={video._id} className="hover:bg-gray-100">
                        <Table.Cell className="p-3">
                          {video.clientId.username}
                        </Table.Cell>
                        <Table.Cell className="p-3">
                          <video
                            controls
                            className="w-32 h-20 rounded-md border"
                          >
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
          </>
        )}
      </div>
    </div>
  );
}

export default ClientDashComponent;
