import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import ContactUs from "./pages/ContactUs.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Pricing from "./pages/Pricing.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import ClientSignin from "./pages/ClientSignin.jsx";
import FreelancerSignin from "./pages/FreelancerSignin.jsx";
import FreelancerSignup from "./pages/FreelancerSignup.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/auth" element={<AuthPage />}>
            <Route index element={<ClientSignin />} />
            <Route path="freelancer-signin" element={<FreelancerSignin />} />
            <Route path="freelancer-signup" element={<FreelancerSignup />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
