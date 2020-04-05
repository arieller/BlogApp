import React, { useReducer } from "react";

//you can create contexts for anything now, all you need is the arguments

export default (reducer, actions, initalState) => {
  //recieves reducer for state, state actions for the reducer, and initial state
  const Context = React.createContext(); // creates context object

  const Provider = ({ children }) => {
    //creates the provider with the children prop for HOC effect
    const [state, dispatch] = useReducer(reducer, initalState); //deconstructs created reducer based on params, state is initial state, dispatch to send actions to the reducer

    const boundActions = {}; //creates new actions object, bound actions
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch); // for each action in actions object, create the same action in boundActions, only that action will run with (dispatch).
    } //we are doing this because when we create context outside the blogContext scope, dispatch is not available.

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    ); //returns the wrapper
  };

  return { Context, Provider }; //the entire component returns the context object to be used in children components, and the wrapper (provider)
};
