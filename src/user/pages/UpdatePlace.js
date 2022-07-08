import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "../../shared/components/hooks/form-hook";
import { useParams } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../places/components/FormElements/Input";
import "./Place.css";
import axios from "axios";
import Button from "../../places/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/Validator";


function UpdatePlace() {
  const params = useParams().id;

  const [loading, setLoading] = useState(true);
  const [filtered,setFiltered] = useState([])

  const [inputHandler, state, changeStateHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        vlaue: "",
        isValid: false,
      },
    },
    false
  );
  console.log(filtered)
  const submitHandler = async(event)=>{
    event.preventDefault()
    setLoading(true)
    try{
      const result = axios.patch(`http://localhost:5000/api/places/${params}`,{title : state.inputs.title.value, description  : state.inputs.description.value})
      const data = await result
      console.log(data)
      setFiltered(data.data)
      alert('place changed')
      setLoading(false)
    }catch(err){
      console.log(err.response)
    }
  }


  
  useEffect(()=>{
    const takeByid = async(id)=>{
      try{
        const result = axios.get(`http://localhost:5000/api/places/${id}`)
        const data = await result
      
        setFiltered(data.data)
      }catch(err){
        console.log(err.response)
      }
    }
    takeByid(params)
  },[])
  console.log(filtered)
  useEffect(() => {
    changeStateHandler(
      {
        title: {
          value: filtered.length != 0 ? filtered[0].title : "",
          isValid: true,
        },
        description: {
          value: filtered.length != 0 ? filtered[0].desription : "",
          isValid: true,
        },
      },
      true
    );

    setLoading(false);
  }, []);
  
  // console.log(filtered.length)
  if (filtered.length === 0) {
    return (
      <Fragment>
        <br />
        <br />
        <br />
        <div className="center">
          <Card>
            <h2>could not fin a place</h2>
          </Card>
        </div>
      </Fragment>
    );
  }
  if (loading) {
    return (
      <div className="center">
        <br />
        <h2>loading...</h2>
      </div>
    );
  }
  return (
    <form onSubmit={submitHandler} className="place-form">
      <br />
      <br />

      <Input
        id="title"
        element="input"
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
        erorText="Please enter a valid text"
        onInput={inputHandler}
        value={filtered[0].title}
        valid={state.inputs.title.isValid}
      />

      <Input
        id="description"
        element="textarea"
        label="description"
        validators={[VALIDATOR_MINLENGTH(10)]}
        erorText="Please enter at least 10 characters)"
        onInput={inputHandler}
        value={filtered[0].description}
        valid={state.inputs.description.isValid}
      />
      <center>
      <Button type="submit" disabled={!state.isValid}>
        UPTDATE
      </Button>
     </center>
    </form>
  );
  }

export default UpdatePlace;
