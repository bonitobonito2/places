import React, { useReducer, useEffect } from "react";
import classes from "./Input.module.css";
import { validate } from "../../../shared/components/util/Validator";
const inputReducer = (state, action) => {
  switch (action.type) {
    case "change":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "touch":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};
function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || '',
    isValid:  props.valid || false,
    isTouched:false,
  });
  const { id, onInput } = props;

  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [value,isValid,id,onInput]);


  const changeHandler = (event) => {
    console.log("shemovedi");
    dispatch({
      type: "change",
      val: event.target.value,
      validators: props.validators,
    });
  };


  const touchHandler = () => {
    dispatch({ type: "touch" });
  };
  const content =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );

  return (
    <div
      className={`${classes["form-control"]} ${
        !inputState.isValid &&
        inputState.isTouched &&
        classes["form-control--invalid"]
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {content}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}

export default Input;
