import React, { Fragment } from "react";
import Auth from "./user/pages/Auth";
import Users from "./user/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./user/pages/UpdatePlace";
import { Route, Routes, Navigate } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewPlace from "./user/pages/NewPlace";
import { useSelector } from "react-redux/es/exports";
const App = () => {
  const logined = useSelector((state) => state.authSlice.isLogined);

  return (
    <Fragment>
      <MainNavigation />
      <Routes>
        {logined && (
          <Fragment>
            <Route path="/:userId/places" element={<UserPlaces />} />
            <Route path="/" element={<Users />} />
            <Route path="/places/new" element={<NewPlace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/places/:id" element={<UpdatePlace />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Fragment>
        )}

        {!logined && (
          <Fragment>
            <Route path="/:userId/places" element={<UserPlaces />} />
            <Route path="/" element={<Users />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/auth" element={<Auth />} />
          </Fragment>
        )}
      </Routes>
    </Fragment>
  );
};

export default App;
