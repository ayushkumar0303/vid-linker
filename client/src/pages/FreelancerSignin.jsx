import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { signInFailure, signInStart, signInSuccess } from "../store/store";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

function FreelancerSignin() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser);
  // console.log(currentUser);
  const dispatch = useDispatch();

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
      dispatch(signInStart());
      const res = await fetch("/server/auth/freelancer-signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      } else {
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
          Sign In
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
          {/* Email Input */}
          <TextInput
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          {/* Password Input */}
          <TextInput
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          {/* Submit Button */}
          <Button type="submit" gradientMonochrome="success">
            Sign In
          </Button>

          {/* Sign Up Link */}
          <div className="text-sm text-center text-gray-600">
            <span>Don't have an account?</span>
            <Link
              to="/auth?tab=freelancer-signup"
              className="text-blue-500 pl-2 hover:underline"
            >
              Sign Up
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
            onClick={handleGoogleAuth}
            outline
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

export default FreelancerSignin;
