import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function DashFreelancerList() {
  const { currentUser } = useSelector((state) => state.user);
  const [freelancers, setFreelancers] = useState([]);
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
    fetchFreelancerList();
  }, [currentUser?._id]);

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 m-6">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Freelancer User ID</Table.HeadCell>
          <Table.HeadCell>Profile Picture</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {freelancers.length > 0 ? (
            freelancers.map((freelancer) => (
              <Table.Row
                key={freelancer._id}
                className="bg-white hover:bg-gray-100 "
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
                  {new Date(freelancer.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell className="text-sm text-gray-900 ">
                  {freelancer.username}
                </Table.Cell>
                <Table.Cell>
                  <img
                    src={freelancer.profilePicture}
                    alt={freelancer.name}
                    className="w-10 h-10 rounded-full"
                  />
                </Table.Cell>
                <Table.Cell className="text-sm text-gray-900 ">
                  {freelancer.name}
                </Table.Cell>
                <Table.Cell className="text-sm text-gray-900 ">
                  {freelancer.email}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell
                colSpan="5"
                className="text-center text-gray-500 py-4"
              >
                No freelancers available
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}

export default DashFreelancerList;
