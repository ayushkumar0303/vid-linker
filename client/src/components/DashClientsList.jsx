import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function DashClientsList() {
  const { currentUser } = useSelector((state) => state.user);
  const [clientsList, setClientsList] = useState([]);
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
          setClientsList(data.clientList);
        } else {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchClientsList();
  }, [currentUser?._id]);

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Client user id</Table.HeadCell>
          <Table.HeadCell>profile picture</Table.HeadCell>
          <Table.HeadCell>name</Table.HeadCell>
          <Table.HeadCell>email</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {clientsList.map((client) => (
            <Table.Row
              key={client._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800 "
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {new Date(client.createdAt).toLocaleDateString()}
              </Table.Cell>

              <Table.Cell>{client.username}</Table.Cell>
              <Table.Cell>
                <img
                  src={client.profilePicture}
                  alt={client.name}
                  className="w-10 h-10 rounded-full"
                />
              </Table.Cell>
              <Table.Cell>{client.name}</Table.Cell>
              <Table.Cell>{client.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default DashClientsList;
