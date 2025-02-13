import React from "react";
import { Link } from "react-router";
import { Button, Card, List } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

function Home() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="min-h-screen bg-white">
      <header className="text-center py-16 px-4">
        <h1 className="text-4xl font-bold md:text-5xl">
          🎬 Effortless Video Uploads to YouTube
        </h1>
        <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
          🚀 Seamless collaboration between clients & freelancers. Upload videos
          directly to YouTube securely and efficiently.
        </p>
        {!currentUser ? (
          <div className="flex justify-center">
            <Link to="/auth">
              <Button gradientDuoTone="greenToBlue" className="mt-6">
                Get Started
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center">
            <p className="font-bold text-xl mt-6 bg-green-100 text-green-500 px-2 py-1 rounded-md shadow-sm">
              {`Welcome! ${currentUser.name.split(" ")[0]}`}
            </p>
          </div>
        )}
      </header>

      {/* How It Works */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">
          💡 How It Works?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <h3 className="text-xl font-bold flex items-center justify-center gap-2">
              <HiCheckCircle className="text-green-500" /> Freelancer Uploads
            </h3>
            <p className="text-gray-500">
              Editors upload finalized videos to our platform.
            </p>
          </Card>
          <Card className="text-center">
            <h3 className="text-xl font-bold flex items-center justify-center gap-2">
              <HiCheckCircle className="text-green-500" /> Client Approves
            </h3>
            <p className="text-gray-500">
              Clients preview and approve the video.
            </p>
          </Card>
          <Card className="text-center">
            <h3 className="text-xl font-bold flex items-center justify-center gap-2">
              <HiCheckCircle className="text-green-500" /> Auto Upload
            </h3>
            <p className="text-gray-500">
              Approved videos are securely uploaded to YouTube.
            </p>
          </Card>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-6 bg-green-100 w-full text-center">
        <h2 className="text-3xl font-semibold mb-6">📌 Key Features</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <h3 className="text-lg font-bold">🔥 Freelancer-Client Workflow</h3>
            <p className="text-gray-500">
              Streamlined collaboration for video projects.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold">🔄 One-Click Upload</h3>
            <p className="text-gray-500">No manual hassle, fast uploads.</p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold">🔑 Privacy First</h3>
            <p className="text-gray-500">
              OAuth authentication, no credential sharing.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold">📂 Temporary File Deletion</h3>
            <p className="text-gray-500">
              Ensures no data leakage after upload.
            </p>
          </Card>
        </div>
      </section>

      {/* Start Using */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-semibold">{` 🚀 Start Using It ${
          currentUser ? currentUser.name.split(" ")[0] : "Today"
        }!`}</h2>
        <div className="flex justify-center">
          {!currentUser && (
            <Link to="/auth">
              <Button gradientDuoTone="greenToBlue" className="mt-6">
                Sign Up Now
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
