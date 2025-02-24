import { Button, TextInput } from "flowbite-react";
import React from "react";

function VideoReject() {
  const handleSubmit = async () => {};
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg bg-white p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
          Send Feedback
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextInput placeholder="Message" />
          <Button gradientMonochrome="success">Send</Button>
        </form>
      </div>
    </div>
  );
}

export default VideoReject;
