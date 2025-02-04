import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { signInFailure, signInStart, signInSuccess } from "../store/store";

function FreelancerSignin() {
  const [formdata, setFormData] = useState({});
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser);
  // console.log(currentUser);
  const dispatch = useDispatch();
  // console.log(formdata);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch("/server/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
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
    <div>
      <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
        <TextInput
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={(e) => setFormData({ ...formdata, email: e.target.value })}
        ></TextInput>
        <TextInput
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setFormData({ ...formdata, password: e.target.value })
          }
        ></TextInput>
        <Button type="submit">Sign In</Button>
        <div className="text-sm">
          <span>Don't have account?</span>
          <Link to="/auth/freelancer/signup" className="text-blue-500 pl-3">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default FreelancerSignin;
