import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import axios from 'axios'
import PlaceList from '../components/PlaceList'

const dummy_array = [
  {
    id : 'u1',
    title : 'Empire state building',
    desription : 'one of the famous something in the world',
    imageUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg",
    address : " 20 W 34th St., New York, NY 10001, United States",
    location : {
      lat : 40.7484445,
      lng: -73.9878531,
    },
    craetor : 'u1'
  },
  {
    id : 'p2',
    title : 'idk',
    desription : 'one of the famous something in the world',
    imageUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg",
    address : " 20 W 34th St., New York, NY 10001, United States",
    location : {
      lat : 40.7484445,
      lng: -73.9878531,
    },
    craetor : 'u1'
  },

]
function UserPlaces() {
  const userId = useParams().userId
  const [changer,setChanger] = useState(false)
  console.log(changer)
  const [information, setInformation] = useState([])
  useEffect(()=>{
    axios.get(`http://localhost:5000/api/places/user/${userId}`)
        .then(result=>{
          console.log(result.data)
          setInformation(result.data)
        })
        .catch(Error=>{
          console.log(Error.response.data)
          setInformation([])
        })
  },[changer])
  
  

  
  return (
    <PlaceList changer = {setChanger} items = {information} />
  )
}

export default UserPlaces