import React from "react";
import Input from "../../places/components/FormElements/Input";
import axios from "axios";
import { useForm } from "../../shared/components/hooks/form-hook";
import ImageUpload from "../../places/components/FormElements/ImageUpload";
import { useSelector } from "react-redux/es/exports";
import Button from "../../places/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/Validator";
import "./Place.css";

function NewPlace() {
  const id = useSelector((state) => state.authSlice.person.id);
  const [inputHandler, state] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        vlaue: "",
        isValid: false,
      },
      address: {
        vlaue: "",
        isValid: false,
      },
      image : {
        value : undefined,
        isValid : false
      }
    },
    false
  );
  const submitHandler = (event) => {
    event.preventDefault();
    const data = new FormData
    data.append('title',state.inputs.title.value )
    data.append('description', state.inputs.description.value )
    data.append('address',state.inputs.address.value)
    data.append('creator' , id)
    console.log(data)
    data.append('image', state.inputs.image.value)

    console.log(state.inputs);
    axios.post(`http://localhost:5000/api/places`, data).then(result=>{
      console.log(result.data)
    }).catch(Error=>{
      console.log(Error.response.data)
    })
    
  };

  return (
    <form onSubmit={submitHandler} className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="please enter a valid title"
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(10)]}
        errorText="please enter at least 10 characters"
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="please enter a valid address"
        onInput={inputHandler}
      />
      <center>
      <ImageUpload center id='image' onInput = {inputHandler} />

      <br/>
      <Button type="submit" disabled={!state.isValid}>
        add place
      </Button >
      </center>
     
    </form>
  );
}

export default NewPlace;
