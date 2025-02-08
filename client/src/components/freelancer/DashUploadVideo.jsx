import {
  Button,
  FileInput,
  Label,
  List,
  Select,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { storage } from "../../appwrite";
import { ID } from "appwrite";

function DashUploadVideo() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [video, setVideo] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");
  const [videoUploadLoading, setVideoUploadLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [clientFound, setClientFound] = useState(true);
  const [clientsSuggestions, setClientsSuggestions] = useState([]);
  const navigate = useNavigate();
  // console.log(formData);
  // console.log(clientsSuggestions);
  // console.log(clientQuery);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // console.log(file);
    if (file) {
      setVideo(file);
    }
  };

  const uploadFile = async () => {
    try {
      setVideoUploadLoading(true);
      const res = await storage.createFile(
        "679e19a3001ccb5a563f",
        ID.unique(),
        video
      );

      if (res?.$id) {
        const result = storage.getFileView("679e19a3001ccb5a563f", res.$id);
        setFormData({ ...formData, videoUrl: result.href });
        setVideoPreviewUrl(result.href);
      }
    } catch (error) {
      console.log(error.message);
    }
    setVideoUploadLoading(false);
  };

  useEffect(() => {
    if (video) {
      uploadFile();
    }
  }, [video]);

  useEffect(() => {
    if (searchQuery.length === 0) {
      setClientsSuggestions([]);
      return;
    }
    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch(
          `/server/user/fetch-clients?search=${searchQuery}`
        );
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
          setClientsSuggestions(data);
          setClientFound(true);
        } else {
          // console.log(data);
          setClientsSuggestions([]);
          setClientFound(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    }, 300);
    // fetchClients(searchQuery);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleClientSelect = (client) => {
    setFormData({ ...formData, clientId: client._id });
    setSearchQuery(client.username);
    setSelectedClient(true);
  };
  const handleClientChange = async (event) => {
    // console.log(event.target.value);
    setSearchQuery(event.target.value);
    // setClientQuery(event.target.value);
    setSelectedClient(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`/server/video/upload-video/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/dashboard");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="relative p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto my-10">
      <form onSubmit={handleSubmit}>
        {/* Client User Id Section */}
        <Label className="block mb-4 text-lg font-semibold text-gray-700">
          Client User Id
          <TextInput
            type="text"
            required
            placeholder="Client User Id"
            value={searchQuery}
            onChange={(event) => handleClientChange(event)}
            className="mt-2"
          />
        </Label>

        {/* Client Suggestions Dropdown */}
        {clientsSuggestions.length > 0 && !selectedClient && (
          <List className="absolute z-10 bg-white w-full list-none border-2 p-3 border-green-500 shadow-lg rounded-lg mt-0">
            {clientsSuggestions.map((client) => (
              <List.Item
                key={client._id}
                className="border p-2 cursor-pointer hover:bg-green-100 rounded-md"
                onClick={() => handleClientSelect(client)}
              >
                {client.username}
              </List.Item>
            ))}
          </List>
        )}

        {/* No client found message */}
        {!clientFound && (
          <List className="absolute z-10 bg-white w-full list-none border-2 p-3 border-green-500 shadow-lg rounded-lg mt-0">
            <List.Item className="border p-2 text-gray-500">
              No client found
            </List.Item>
          </List>
        )}

        {/* File Upload Section */}
        <div className="mt-6 w-full">
          <Label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 "
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 ">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 ">
                SVG, PNG, JPG, or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              type="file"
              accept="video/*"
              required
              onChange={handleFileChange}
              id="dropzone-file"
              className="hidden"
            />
          </Label>
        </div>
        {videoPreviewUrl && (
          <div className="mt-6 w-full">
            <video controls className="w-full h-56">
              <source src={videoPreviewUrl} />
            </video>
          </div>
        )}
        {/* Submit Button */}
        <div className="mt-6">
          <Button
            type="submit"
            gradientMonochrome="success"
            // outline
            disabled={videoUploadLoading || !selectedClient}
            className="w-full py-1 px-2 bg-teal-500 text-white rounded-lg "
          >
            {videoUploadLoading ? "Uploading..." : "Upload Video"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DashUploadVideo;
