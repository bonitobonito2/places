import React, { useEffect, useState } from "react";
import axios from "axios";
import UsersList from "../components/UsersList";
export default function Users() {
  const [users,setUsers] = useState([])
  useEffect(()=>{
    
    axios.get('http://localhost:5000/user')
    .then(result=>{
      console.log(result.data.result)
      setUsers(result.data.result)
    })
    .catch(Error=>{
      console.log(Error)
    })
  },[])
  const USERS = [
    {
      id: "u1",
      name: "Zaal",
      image:
        "https://scontent.ftbs5-3.fna.fbcdn.net/v/t39.30808-6/288833820_1081452439118176_3783386371362536150_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0D7SjPl2QTEAX8oQ6TP&_nc_ht=scontent.ftbs5-3.fna&oh=00_AT-M3mA3uzw5S-I61OYndmtK3W9k-qkUECt6LutnU9yWpg&oe=62C4B711",
      places: 3,
    },
  ];
  return <UsersList items={users} />;
}
