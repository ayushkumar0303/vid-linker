import { Alert, Button } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateError, updateStart, updateSuccess } from "../store/store";

function DashConnectAccount() {
  const { error, loading, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log(currentUser);
  // const navigate = useNavigate();
  if (loading) {
    return <h1>Loading...</h1>;
  }

  const handleDeleteYoutubeAuthToken = async () => {
    try {
      dispatch(updateStart());
      const res = await fetch(
        `/server/user/delete-youtube-auth/${currentUser._id}`,
        {
          method: "PUT",
        }
      );

      const data = await res.json();
      if (res.ok) {
        dispatch(updateSuccess(data));
      } else {
        dispatch(updateError(data));
      }
    } catch (error) {
      dispatch(updateError(error));
    }
  };
  return (
    <div>
      {currentUser?.youtubeAuthToken ? (
        <div>
          <Alert>Youtube Account Linked</Alert>
          <Button onClick={handleDeleteYoutubeAuthToken} color="failure">
            Disconect youtube account
          </Button>
        </div>
      ) : (
        <a href={`/server/youtube/connect?userId=${currentUser._id}`}>
          <Button outline>Connect Youtube Account</Button>
        </a>
      )}
    </div>
  );
}

export default DashConnectAccount;
