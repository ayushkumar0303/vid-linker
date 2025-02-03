import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserError,
  fetchUserStart,
  fetchUserSuccess,
} from "./store/store";

function App() {
  // const { currentUser } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       dispatch(fetchUserStart());
  //       const res = await fetch(`/server/user/get-user/${currentUser?._id}`);
  //       const data = await res.json();
  //       if (res.ok) {
  //         dispatch(fetchUserSuccess(data));
  //       } else {
  //         dispatch(fetchUserError(data));
  //       }
  //     } catch (error) {
  //       dispatch(fetchUserError(error));
  //     }
  //   };
  //   fetchData();
  // }, [currentUser?._id]);
  return (
    <>
      <Header />
      <div className="min-h-screen w-full">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
