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
import FreelancerAuth from "./pages/FreelancerAuth.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import ClientAuth from "./pages/ClientAuth.jsx";
import Error404 from "./pages/Error404.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateDash from "./components/PrivateDash.jsx";
import VideoApprove from "./components/VideoApprove.jsx";
import VideoReject from "./components/VideoReject.jsx";
import UploadVideo from "./components/UploadVideo.jsx";
import DashComponent from "./components/FreelancerDashComponent.jsx";

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
            <Route path="/dashboard" element={<PrivateDash />}>
              {/* <Route index element={<DashComponent />} /> */}
              <Route path="approve/:videoId" element={<VideoApprove />} />
              <Route path="reject/:videoId" element={<VideoReject />} />
              <Route path="upload/:videoId" element={<UploadVideo />} />
            </Route>

            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/client" element={<ClientAuth />}>
              <Route index element={<ClientSignin />} />
            </Route>
            <Route path="/auth/freelancer" element={<FreelancerAuth />}>
              <Route index element={<FreelancerSignin />} />
              <Route path="signup" element={<FreelancerSignup />} />
            </Route>
          </Route>
          <Route path="/*" element={<Error404 />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
