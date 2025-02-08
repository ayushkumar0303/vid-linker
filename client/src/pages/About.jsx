import React from "react";
import { Link } from "react-router";
import { Avatar, Button, Card, List } from "flowbite-react";
function About() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl font-bold md:text-5xl">🎥 About VidLinker</h1>
        <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
          🚀 The ultimate platform for freelancers & clients to seamlessly
          upload, review, and publish videos directly to YouTube.
        </p>
      </section>
      {/* Why Choose Us */}
      <section className="py-16 px-6 bg-gray-100 w-full text-center">
        <h2 className="text-3xl font-semibold">🌟 Why Choose Us?</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
          <Card>
            <h3 className="text-lg font-bold">💼 Simplified Collaboration</h3>
            <p className="text-gray-500">
              Bridging the gap between freelancers and clients.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold">🔒 Secure Authentication</h3>
            <p className="text-gray-500">
              OAuth ensures no credentials are shared.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold">📂 Auto File Management</h3>
            <p className="text-gray-500">
              Files are deleted after upload to maintain privacy.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold">⚡ Fast YouTube Integration</h3>
            <p className="text-gray-500">One-click video publishing.</p>
          </Card>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold">👨‍💻 Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="flex flex-col items-center">
            <Avatar size="lg" img="https://i.pravatar.cc/100?img=1" />
            <h3 className="text-lg font-bold mt-4">Ayush</h3>
            <p className="text-gray-500">Founder & Developer</p>
          </Card>
          <Card className="flex flex-col items-center">
            <Avatar size="lg" img="https://i.pravatar.cc/100?img=2" />
            <h3 className="text-lg font-bold mt-4">Samayra</h3>
            <p className="text-gray-500">AI Assistant</p>
          </Card>
          <Card className="flex flex-col items-center">
            <Avatar size="lg" img="https://i.pravatar.cc/100?img=3" />
            <h3 className="text-lg font-bold mt-4">John Doe</h3>
            <p className="text-gray-500">UI/UX Designer</p>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default About;
