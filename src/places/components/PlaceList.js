import React from "react";
import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UIElements/Card";
import Button from '../components/FormElements/Button'
import './PlaceList.css'
function PlaceList(props) {
  console.log(props)
  if (props.items.length === 0) {
    return (
      <div className="center down">
        <Card>
          <h2>No places found. Maybe create one?</h2>
       <Button to = '/places/new'  >share place</Button>
        </Card>
      </div>
    );
  }
 

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        
        <PlaceItem
          changer = {props.changer}
          key={place._id}
          id={place._id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId = {place.creator}
          cordinates = {place.location}
        />
      ))}
    </ul>
  );
}

export default PlaceList;
