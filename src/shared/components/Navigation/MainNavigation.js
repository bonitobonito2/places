import React, { Fragment, useState } from "react";
import MainHeader from "./MainHeader";
import { useSelector } from "react-redux/es/hooks/useSelector";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import "./MainNavigation.css";
import Backdrop from "../UIElements/Backdrop";
export default function MainNavigation() {
  const isLogined = useSelector(state=>state.authSlice.isLogined)
  console.log(isLogined)
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const drawerOpenHandler = (event)=>{
    event.preventDefault()
      setDrawerIsOpen(true)
  }
  const drawerCloseHandler = (event)=>{
    event.preventDefault()
    setDrawerIsOpen(false)
  }
  return (
    <Fragment>

   {drawerIsOpen && <Backdrop onClick = {drawerCloseHandler} />}
   <SideDrawer show = {drawerIsOpen} className = 'main-navigation__drawer-nav'>
      <NavLinks closeBar = {setDrawerIsOpen} />
    </SideDrawer> 
    <MainHeader>
      <button onClick={drawerOpenHandler} className="main-navigation__menu-btn">
        <span />
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title ">
        <Link to="/">your places</Link>
      </h1>
      <nav className="main-navigation__header-nav">
        <NavLinks  closeBar = {setDrawerIsOpen} />
      </nav>
    </MainHeader> 
       </Fragment>
  );
}
