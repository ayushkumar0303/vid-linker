import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import ContactUs from "./pages/ContactUs.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Pricing from "./pages/Pricing.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import Error404 from "./pages/Error404.jsx";
import PrivateDash from "./components/PrivateDash.jsx";

import VideoReject from "./components/clients/VideoReject.jsx";
import UploadVideo from "./components/clients/UploadVideo.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import FreelancerSignin from "./pages/FreelancerSignin.jsx";
import ClientSignin from "./pages/ClientSignin.jsx";
import ClientSignup from "./pages/ClientSignup.jsx";
import FreelancerSignup from "./pages/FreelancerSignup.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/dashboard" element={<PrivateDash />} />
            <Route path="/auth" element={<AuthPage />} />

            {/* <Route index element={<DashComponent />} /> */}

            <Route path="reject/:videoId" element={<VideoReject />} />
            <Route path="upload/:videoId" element={<UploadVideo />} />
            {/* <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} /> */}
          </Route>
          <Route path="/*" element={<Error404 />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
