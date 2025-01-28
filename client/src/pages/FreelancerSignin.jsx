import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";

function FreelancerSignin() {
  const [formdata, setFormData] = useState({});
  const navigate = useNavigate();
  // console.log(formdata);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("/server/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/");
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
      </form>
    </div>
  );
}

export default FreelancerSignin;
