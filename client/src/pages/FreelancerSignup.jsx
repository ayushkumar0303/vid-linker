import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";

function FreelancerSignup() {
  const [formdata, setFormData] = useState({});
  const navigate = useNavigate();
  // console.log(formdata);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("/server/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/auth/freelancer");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
        <TextInput
          type="text"
          name="firstName"
          placeholder="First name"
          required
          onChange={(e) =>
            setFormData({ ...formdata, firstName: e.target.value })
          }
        ></TextInput>
        <TextInput
          type="text"
          name="lastName"
          placeholder="Last name"
          onChange={(e) =>
            setFormData({ ...formdata, lastName: e.target.value })
          }
        ></TextInput>
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
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default FreelancerSignup;
