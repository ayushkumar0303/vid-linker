import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function DashClientsList() {
  const { currentUser } = useSelector((state) => state.user);
  const [clientsList, setClientsList] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(freelacersList[0].populate(freelacersList[0].clientId));
  // console.log(freelacersList);
  useEffect(() => {
    const fetchClientsList = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/server/video/get-clients-list/${currentUser?._id}`
        );
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
          setClientsList(data.clientList);
        } else {
          console.log(error.message);
        }
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    fetchClientsList();
  }, [currentUser?._id]);

  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  }
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 m-6">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Client User ID</Table.HeadCell>
          <Table.HeadCell>Profile Picture</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {clientsList.length > 0 ? (
            clientsList.map((client) => (
              <Table.Row
                key={client._id}
                className="bg-white hover:bg-gray-100 "
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
                  {new Date(client.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell className="text-sm text-gray-900 ">
                  {client.username}
                </Table.Cell>
                <Table.Cell>
                  <img
                    src={client.profilePicture}
                    alt={client.name}
                    className="w-10 h-10 rounded-full"
                  />
                </Table.Cell>
                <Table.Cell className="text-sm text-gray-900 ">
                  {client.name}
                </Table.Cell>
                <Table.Cell className="text-sm text-gray-900">
                  {client.email}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell
                colSpan="5"
                className="text-center text-gray-500 py-4"
              >
                No clients available
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}

export default DashClientsList;
