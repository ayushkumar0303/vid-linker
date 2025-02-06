import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchVideos = async () => {
      try {
        const res = await fetch(`/server/video/get-videos/${currentUser?._id}`);
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
    fetchClientsList();
  }, [currentUser?._id]);
  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <p>See all Clients</p>
          <Button outline>See More</Button>
        </div>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Client user id</Table.HeadCell>
              <Table.HeadCell>Video</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {clients.map((client) => (
                <Table.Row
                  key={client._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 "
                >
                  <Table.Cell>{client.username}</Table.Cell>
                  <Table.Cell>
                    <img
                      src={client.profilePicture}
                      alt={client.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell>{client.name}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <p>See all Videos</p>
          <Button outline>See More</Button>
        </div>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Client user id</Table.HeadCell>
              <Table.HeadCell>Video</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {videosForReview.map((video) => (
                <Table.Row
                  key={video._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 "
                >
                  <Table.Cell>{video.clientId.username}</Table.Cell>
                  <Table.Cell>
                    <video controls className="w-24 h-28">
                      <source src={video.videoUrl} />
                      Error getting this video
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

export default ClientDashComponent;
