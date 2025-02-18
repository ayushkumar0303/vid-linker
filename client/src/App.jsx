import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/FooterComponent";
import { Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserError,
  fetchUserStart,
  fetchUserSuccess,
  signOutSuccess,
} from "./store/store";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  if (currentUser) {
    const cookieExists = async () => {
      const res = await fetch(`/server/user/access-token-check`);
      if (!res.ok) {
        dispatch(signOutSuccess());
        navigate("/");
      }
    };
    cookieExists();
  }

  // console.log("jdjdj");
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
  //         dispatch(fetchUserError(data.message));
  //       }
  //     } catch (error) {
  //       dispatch(fetchUserError(error));
  //     }
  //   };
  //   fetchData();
  // }, [currentUser?._id]);
  return (
    <div className="min-w-64">
      <Header />
      <div className="min-h-screen w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
