import React from "react";
import { Footer } from "flowbite-react";
import { SiLinkfire } from "react-icons/si";
import { Link } from "react-router";

function FooterComponent() {
  return (
    <Footer container className="border-t-2 border-green-500 py-6">
      <div className="w-full max-w-6xl mx-auto text-center">
        {/* Footer Top Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-semibold flex items-center gap-1">
            Vid
            <span className="text-green-500">
              <SiLinkfire />
            </span>
            Linker
          </div>

          {/* Navigation Links */}
          <Footer.LinkGroup className="flex flex-wrap justify-center gap-6 mt-4 sm:mt-0">
            <Footer.Link as="div">
              <Link to="/">Home</Link>
            </Footer.Link>
            <Footer.Link as="div">
              <Link to="/about">About</Link>
            </Footer.Link>
            {/* <Footer.Link as="div">
                <Link to="/pricing">Pricing</Link>
              </Footer.Link> */}
            <Footer.Link as="div">
              <Link to="/contact-us">Contact</Link>
            </Footer.Link>
          </Footer.LinkGroup>
        </div>

        {/* Divider */}
        <Footer.Divider className="my-4 border-gray-400" />

        {/* Copyright Section */}
        <Footer.Copyright
          by="Vid-Linker™ Developed by Ayush Kumar"
          year={new Date().getFullYear()}
          className="text-gray-600"
        />
      </div>
    </Footer>
  );
}

export default FooterComponent;
