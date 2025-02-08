import React from "react";
import { Navbar, Button, TextInput, Textarea, Card } from "flowbite-react";
import { HiMail, HiLocationMarker, HiPhone } from "react-icons/hi";

function ContactUs() {
  return (
    <div>
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl font-bold md:text-5xl">📞 Get in Touch</h1>
        <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
          Have questions? We're here to help! Contact us for support or
          inquiries.
        </p>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Card className="p-6 shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
          <form className="space-y-4">
            <TextInput type="text" placeholder="Your Name" required />
            <TextInput type="email" placeholder="Your Email" required />
            <Textarea rows="4" placeholder="Your Message" required />
            <Button gradientDuoTone="greenToBlue" className="w-full">
              Send Message
            </Button>
          </form>
        </Card>

        {/* Contact Information */}
        <Card className="p-6 shadow-md border border-gray-200 text-center">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="text-gray-600">Reach out to us directly.</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <HiMail className="text-green-500 text-2xl" />
              <p className="text-gray-600">support@videosync.com</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <HiPhone className="text-green-500 text-2xl" />
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <HiLocationMarker className="text-green-500 text-2xl" />
              <p className="text-gray-600">Bangalore, India</p>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-semibold">📩 Let's Connect!</h2>
        <p className="text-gray-500 mt-2">We'd love to hear from you.</p>
        <div className="flex justify-center">
          <Button gradientDuoTone="greenToBlue" className="mt-6">
            Send a Message
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
