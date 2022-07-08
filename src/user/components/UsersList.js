import React, { Fragment } from "react";
import "./UsersList.css"
import Card from "../../shared/components/UIElements/Card";
import UserItem from "./UserItem";
export default function UsersList(props) {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
        <h2>No users found.</h2>
        </Card>
       
      </div>
    );
  }
  return (
  <Fragment>
 {props.items.map((user) => (
        <ul className="users-list">
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount = {user.places}
        />
          </ul>
      ))}
  </Fragment>
     
  
  );
}
