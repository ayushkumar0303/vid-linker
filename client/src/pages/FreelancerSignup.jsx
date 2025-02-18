import { Alert, Button, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../store/store";

function FreelancerSignup() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  // console.log(formdata);
  const dispatch = useDispatch();
  const { error: errorMessage } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/server/auth/freelancer-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/auth?tab=freelancer-signin");
      } else {
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-sm w-full bg-white p-6 m-3 rounded-lg shadow-md border-2">
        <h2 className="text-2xl font-bold text-center mb-2">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Join as a Freelancer.
        </p>
        <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
          <TextInput
            type="text"
            name="firstName"
            placeholder="First name"
            required
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <TextInput
            type="text"
            name="lastName"
            placeholder="Last name (Optional)"
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <TextInput
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextInput
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <Button type="submit" gradientMonochrome="success" disabled={loading}>
            Sign Up
          </Button>
          <div className="text-sm text-center">
            <span>Already a member?</span>
            <Link
              to="/auth?tab=freelancer-signin"
              className="text-blue-500 pl-1"
            >
              Sign In
            </Link>
          </div>
        </form>

        {errorMessage && (
          <Alert className="mt-2" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default FreelancerSignup;
