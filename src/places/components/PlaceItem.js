import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import Mapp from "../../shared/components/UIElements/Map";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "./FormElements/Button";
import axios from "axios";
import "./PlaceItem.css";
function PlaceItem(props) {
  const [showMap, setShowMap] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const openMapHandler = () => setShowMap(true);
  const [myItem,setMyItem] = useState(false)
  const logined = useSelector((state) => state.authSlice.isLogined);
  const myId = useSelector(state=>state.authSlice.person.id)
  console.log(myId)
  console.log(props)
  useEffect(()=>{
    if(myId === props.creatorId){ 
      setMyItem(true)
    }
  })
  const closeMapHandler = () => setShowMap(false);
  const closeDelete = (event) => {
    event.preventDefault();
    setShowDeleteWarning(false);
  };
  const openDelete = () => setShowDeleteWarning(true);

  const submitDelete = async (event) => {
    event.preventDefault();
    try{
      const result = await axios.delete(`http://localhost:5000/api/places/${props.id}`)
      const data = result.data
      props.changer(state=>!state)
      console.log(data)
    }catch(eror){
      if(eror){
        console.log(eror)
        props.changer(state=>!state)
      }
    }
    setShowDeleteWarning(false);
  };

  
  return (
    <Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <Button type="button" onClick={closeMapHandler}>
            close
          </Button>
        }
      >
        <div className="map-container">
          <Mapp cordinates={props.cordinates} />
        </div>
      </Modal>

      <Modal
        show={showDeleteWarning}
        onCancel={closeDelete}
        header="Are you sure u want to delete this place?"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <Fragment>
            <Button onClick={submitDelete} danger>
              yes
            </Button>
            <Button onClick={closeDelete}>no</Button>
          </Fragment>
        }
      >
        <div>
          <p>Notice : you will not be able to get back this item</p>
        </div>
      </Modal>

      <li className="place-item">
        <div className="place-item__image">
          <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
        </div>
        <div className="place-item__info">
          <h2>{props.title}</h2>
          <h3>{props.address}</h3>
          <p>{props.description}</p>
        </div>
        <div className="place-item__actions">
          <Button inverse onClick={openMapHandler}>
            View place on map
          </Button>
          {logined && myItem && (
            <Fragment>
              <Button to={`/places/${props.id}`}>Edit</Button>
              <Button onClick={openDelete} danger>
                Delete
              </Button>
            </Fragment>
          )}
        </div>
      </li>
    </Fragment>
  );
}

export default PlaceItem;
