import { Button, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

function FreelancerSignup() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  // console.log(formdata);

  const handleGoogleAuth = async (event) => {
    event.preventDefault();
    const auth = getAuth(app);
    // console.log(auth);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // console.log(result);
      dispatch(signInStart());
      const res = await fetch("/server/auth/google-freelancer-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          profilePicture: result.user.photoURL,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/");
        dispatch(signInSuccess(data));
      } else {
        dispatch(signInFailure(data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

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
        navigate("/auth");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Join as a Freelancer or as a Client.
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

          <Button type="submit" gradientMonochrome="success">
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
        <div>
          <div className="flex py-2 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <Button
            outline
            onClick={handleGoogleAuth}
            gradientMonochrome="success"
            type="button"
            className="w-full flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-xl" />
            Join with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FreelancerSignup;
