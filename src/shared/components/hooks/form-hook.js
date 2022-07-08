import { useCallback, useReducer } from "react";
const formReducer = (state, action) => {
  switch (action.type) {
    case "input_change":
      let formIsValid = true;
      for (const inputID in state.inputs) {
        if (inputID === action.inputID) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputID].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputID]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case 'setData':
      return{
        
        inputs : action.inputs,
        formIsValid : action.formValid
      }  
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  const [state, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
    isTouched : false
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "input_change",
      value: value,
      isValid: isValid,
      inputID: id,
    });
  }, []);

  const  changeStateHandler = useCallback((inputData,FormValidity)=>{
      dispatch({type : 'setData', inputs : inputData, formValid: FormValidity })
  },[])
  return [inputHandler,state, changeStateHandler]
};
