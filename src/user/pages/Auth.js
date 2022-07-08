import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import Input from "../../places/components/FormElements/Input";
import { authSliceMethods } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import classes from "./Auth.module.css";
import ImageUpload from "../../places/components/FormElements/ImageUpload";
import Button from "../../places/components/FormElements/Button";
import { useForm } from "../../shared/components/hooks/form-hook";
import axios from "axios";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/Validator";
import Card from "../../shared/components/UIElements/Card";
function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogined = useSelector((state) => state.authSlice.isLogined);
  console.log(isLogined);
  const [signup, setsignup] = useState(false);
  const [inputHandler, state] = useForm(
    {
      email: {
        value: "",
        isValid: "",
      },
      password: {
        value: "",
        isValid: "",
      },
    },
    false
  );

  const [inputHandler1, state1] = useForm(
    {
      name: {
        value: "",
        isValid: "",
      },
      email: {
        value: "",
        isValid: "",
      },
      password: {
        value: "",
        isValid: "",
      },
      image : undefined,
    },
    false
  );
  console.log(state1.inputs)
  const switchModeHandler = () => {
    setsignup((state) => !state);
  };
  const submitHandler = (event) => {
    console.log(state1);
    event.preventDefault();
   

    axios
      .post("http://localhost:5000/user/auth", {
        email: state.inputs.email.value,
        password: state.inputs.password.value,
      })
      .then((response) => {
        
        console.log(response.data.message);
        const information = response.data.message
        dispatch(authSliceMethods.setPerson({
          name : information.name,
          email : information.email,
          image : information.image,
          id : information._id
        }))
        dispatch(authSliceMethods.login());
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data.message);
      });
  };

  const submitHandler1 = async (event) => {
    event.preventDefault();
    
    const formData  = new FormData()
    formData.append('email', state1.inputs.email.value)
    formData.append('name', state1.inputs.name.value)
    formData.append('password', state1.inputs.password.value)
    formData.append('image', state1.inputs.image.value )
    axios
      .post("http://localhost:5000/user/create", formData)
      .then((response) => {
        const data = response.data;
        console.log(data.message);


        switchModeHandler();
        alert("user created");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <center>
      <Card className={classes.authentication}>
        {!signup && (
          <Fragment>
            
            <h2>login required</h2>
            <hr />

            <form onSubmit={submitHandler}>
              <Input
                element="input"
                id="email"
                type="email"
                label="E-mail"
                validators={[VALIDATOR_EMAIL()]}
                errorText="please enter a valid email address"
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="password"
                type="password"
                label="password"
                validators={[VALIDATOR_MINLENGTH(8)]}
                errorText="please enter at least 8 chars"
                onInput={inputHandler}
              />
              <Button type="submit" disabled={!state.isValid}>
                log in
              </Button>
           
            </form>
            <Button onClick={switchModeHandler} inverse>
              switch to sign up
            </Button>
          </Fragment>
        )}
        {signup && (
          <Fragment>
            <h2>create account</h2>
            <hr />

            <form onSubmit={submitHandler1}>
              <Input
                element="input"
                id="name"
                type="name"
                label="your name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please enter a valid name address"
                onInput={inputHandler1}
              />
                   <ImageUpload id = 'image' center ={true} onInput = {inputHandler1}/>
              <Input
                element="input"
                id="email"
                type="email"
                label="E-mail"
                validators={[VALIDATOR_EMAIL()]}
                errorText="please enter a valid email address"
                onInput={inputHandler1}
              />
              <Input
                element="input"
                id="password"
                type="password"
                label="password"
                validators={[VALIDATOR_MINLENGTH(8)]}
                errorText="please enter at least 8 chars"
                onInput={inputHandler1}
              />
            
              <Button type="submit" disabled={!state1.isValid}>
                create account
              </Button>
            </form>
            <Button inverse onClick={switchModeHandler} inversed>
              switch to login
            </Button>
          </Fragment>
        )}
      </Card>
    </center>
  );
}

export default Auth;
