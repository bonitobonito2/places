import React, { Fragment } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import authSlice, { authSliceMethods } from "../../../store/authSlice";
import "./NavLinks.css";
export default function NavLinks(props) {
  const dispatch = useDispatch();
  const isLogined = useSelector((state) => state.authSlice.isLogined);
  const id = useSelector((state)=>state.authSlice.person.id)
  console.log(id)
  console.log(isLogined);
  const handler = () => {
    console.log("damawva");
    props.closeBar(false);
  };
  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authSliceMethods.removePerson())
    dispatch(authSliceMethods.logout());
  };
  return (
    <ul className="nav-links">
      {isLogined && (
        <Fragment>
          <li>
            <NavLink onClick={handler} to="/">
              All users
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handler} to={`/${id}/places`}>
              My places
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handler} to="/places/new">
              Add place
            </NavLink>
          </li>
          <li>
            <NavLink onClick={logoutHandler} to="/logout">
              logOut
            </NavLink>
          </li>
        </Fragment>
      )}
      {!isLogined && (
        <Fragment>
          <li>
            <NavLink onClick={handler} to="/">
              All users
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handler} to="/auth">
              Authenticate
            </NavLink>
          </li>
        </Fragment>
      )}
    </ul>
  );
}
