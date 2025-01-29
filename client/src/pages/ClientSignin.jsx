import { Button, TextInput } from "flowbite-react";
import React from "react";
import { app } from "../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";

function ClientSignin() {
  const navigate = useNavigate();
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth(app);
    // console.log(auth);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch("/server/auth/google-client", {
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
        <Button type="submit">Google</Button>
      </form>
    </div>
  );
}

export default ClientSignin;
