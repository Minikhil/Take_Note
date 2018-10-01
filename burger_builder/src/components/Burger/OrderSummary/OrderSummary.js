import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

//need to add logic so use {return();}; for function body else use ();
const orderSummary = (props) =>{
  const ingridentSummary = Object.keys(props.ingredients)
        .map(igKey=>{
            return (<li key={igKey}> <span style={{textTransform: 'capitalize'}}> {igKey} </span>: {props.ingredients[igKey]} </li>);
        })



  return(
    <Aux>
      <h3> Your Order </h3>
      <p> A delicious burger with the following ingridients:</p>
      <ul> {ingridentSummary} </ul>
      <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
      <p> Continue to Checkout </p>
      <Button clicked={props.purchaseCancelled} btnType="Danger">CANCEL</Button>
      <Button clicked={props.purchaseContinued} btnType="Success">CONTINUE</Button>


    </Aux>
  );
};

export default orderSummary;
