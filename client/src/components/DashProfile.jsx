import { Alert, Button, Modal, Spinner, TextInput, Card } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  updateStart,
  updateError,
  updateSuccess,
  deleteFailure,
  deleteStart,
  deleteSuccess,
  signOutSuccess,
} from "../store/store";

import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

function DashProfile() {
  // const user = useSelector((state) => state.user);
  // console.log(user);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(null);
  const username = useRef();
  const password = useRef();
  const email = useRef();
  const dispatch = useDispatch();
  // console.log(imageURL);

  const { error, loading, currentUser } = useSelector((state) => state.user);

  const handleFormData = async (event) => {
    event.preventDefault();

    try {
      dispatch(updateStart());
      setUserUpdateSuccess(null);
      const res = await fetch(`/server/user/update-user/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(updateSuccess(data));
        setUserUpdateSuccess("User's Update Successfull");
      } else {
        dispatch(updateError(data.message));
      }
    } catch (error) {
      // console.log(error.message);
      dispatch(updateError(error.message));
    }
  };

  const handleDeleteUser = async () => {
    // console.log(currentUser._id);
    try {
      dispatch(deleteStart());
      const res = await fetch(`/server/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      // console.log(data);
      if (res.ok) {
        dispatch(deleteSuccess());
        navigate("/signIn");
      } else {
        dispatch(deleteFailure(data.message));
      }
    } catch (error) {
      // console.log(error.message);
      dispatch(deleteFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      const res = await fetch("/server/user/sign-out", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signOutSuccess());
        navigate("/auth");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    dispatch(updateError(null));
    dispatch(deleteFailure(null));
  }, []);

  // console.log(imageURL);
  // console.log(currentUser.profilePicture);
  return (
    <div className="flex flex-grow flex-col items-center ">
      {currentUser && (
        <Card className="min-w-96">
          <h1 className="flex font-bold text-5xl justify-center pb-5">
            Profile
          </h1>
          <form className="pt-4 flex flex-col gap-3" onSubmit={handleFormData}>
            {/* Profile Image */}
            <div className="flex justify-center relative min-h-24 ">
              <img
                src={currentUser.profilePicture}
                className="rounded-full h-24 w-24 object-cover"
                alt="Profile Picture"
              />
            </div>

            {/* Username Input */}
            <TextInput
              type="text"
              id="username"
              ref={username}
              placeholder="Username"
              defaultValue={currentUser.username}
            />

            {/* Email Input */}
            <TextInput
              type="email"
              id="email"
              ref={email}
              placeholder="Email"
              defaultValue={currentUser.email}
            />

            {/* Password Input */}
            <TextInput
              type="password"
              ref={password}
              id="password"
              placeholder="Enter password (Old or New if want to change)"
              required
            />

            {/* Submit Button */}
            <Button type="submit" gradientMonochrome="success">
              {loading ? (
                <>
                  <Spinner aria-label="Spinner button example" size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Update"
              )}
            </Button>
          </form>

          {/* Delete Account & Sign Out */}
          <div className="flex justify-between mt-2">
            <span
              className="text-red-400 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Delete Account
            </span>
            <span
              className="text-red-400 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </span>
          </div>

          {/* Error and Success Alerts */}
          <div className="pt-2">
            {error && <Alert color="failure">{error}</Alert>}
            {userUpdateSuccess && (
              <Alert color="success">Update successful</Alert>
            )}
          </div>

          {/* Delete Account Modal */}
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                  Are you sure you want to delete your account?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDeleteUser}>
                    {"Yes, I'm sure"}
                  </Button>
                  <Button color="gray" onClick={() => setShowModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </Card>
      )}
    </div>
  );
}

export default DashProfile;
