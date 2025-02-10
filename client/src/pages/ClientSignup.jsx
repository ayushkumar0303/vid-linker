import { Alert, Button, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { signInFailure, signInStart, signInSuccess } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

function ClientSignup() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error: errorMessage } = useSelector((state) => state.user);
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
      const res = await fetch("/server/auth/google-client-auth", {
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
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(signInFailure(error.message));
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("/server/auth/client-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/auth?tab=client-signin");
      } else {
        // console.log(data.message);
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      // console.log(error.message);
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="flex justify-center">
      <div className="max-w-sm w-full bg-white p-6 m-3 rounded-lg shadow-md border-2">
        <h2 className="text-2xl font-bold text-center mb-2">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Join as a Client.
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
            <Link to="/auth?tab=client-signin" className="text-blue-500 pl-1">
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
        {errorMessage && (
          <Alert className="mt-2" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default ClientSignup;
