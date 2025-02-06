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
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFreelancerList();
  }, [currentUser?._id]);

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Freelancer user id</Table.HeadCell>
          <Table.HeadCell>profile picture</Table.HeadCell>
          <Table.HeadCell>name</Table.HeadCell>
          <Table.HeadCell>email</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {freelancers.map((freelancer) => (
            <Table.Row
              key={freelancer._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800 "
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {new Date(freelancer.createdAt).toLocaleDateString()}
              </Table.Cell>

              <Table.Cell>{freelancer.username}</Table.Cell>
              <Table.Cell>
                <img
                  src={freelancer.profilePicture}
                  alt={freelancer.name}
                  className="w-10 h-10 rounded-full"
                />
              </Table.Cell>
              <Table.Cell>{freelancer.name}</Table.Cell>
              <Table.Cell>{freelancer.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default DashFreelancerList;
