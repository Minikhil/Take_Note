import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasing: false
    }

    addIngredientHandler = (type) =>{
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      //using spread operator to create copy of ingredients state
      const updatedIngredients = {
          ...this.state.ingredients
      }
      //updating the specific type in copy state
      updatedIngredients[type] = updatedCount;

      //updating the price
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice
      const newPrice = oldPrice + priceAddition;

      //set actual state to copy state and update price
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    }

    removeIngridentHandeler = (type) =>{
      const oldCount = this.state.ingredients[type];
      //case which prevents removing ingridents not present, keeps count from going into negative
      if(oldCount <= 0){
        return;
      }
      const updatedCount = oldCount - 1;
      //using spread operator to create copy of ingredients state
      const updatedIngredients = {
          ...this.state.ingredients
      }
      //updating the specific type in copy state
      updatedIngredients[type] = updatedCount;

      //updating the price
      const priceSub = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice
      const newPrice = Math.abs(oldPrice - priceSub);

      //set actual state to copy state and update price
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients})

    }

    purchasingHandler = () =>{
        this.setState({purchasing: true})
    }

    purchaseCancellHandler = () =>{
        this.setState({purchasing: false})
    }
    purchaseContinuedHandler = ()=>{
        alert('You continue');
    }




    render () {
      //crete copy of ingridents state
      const disabledInfo = {
        ...this.state.ingridents
      }
      for(let key in disabledInfo){
        //updates the values for keys with true or false
        disabledInfo[key] = (disabledInfo[key]=== 0)
      }
      //when no ingridents added will equal fasle
      const purchaseable = (this.state.totalPrice===4)

      //Dynamically showOrderSummary on click of Order Now btn
      let showOrderSummary = null;
      if(this.state.purchasing){
        showOrderSummary = (<Modal show={this.state.purchasing} modelClosed={this.purchaseCancellHandler} ><OrderSummary ingredients = {this.state.ingredients} purchaseCancelled={this.state.purchaseCancellHandler} purchaseContinued={this.state.purchaseContinuedHandler}/> </Modal>)
      }






        return (
            <Aux>
                <Modal show={this.state.purchasing} modelClosed={this.purchaseCancellHandler} ><OrderSummary ingredients = {this.state.ingredients} purchaseCancelled={this.purchaseCancellHandler} purchaseContinued={this.purchaseContinuedHandler} price={this.state.totalPrice}/> </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls  ingredientAdded={this.addIngredientHandler} ingredientSub = {this.removeIngridentHandeler} disabled={disabledInfo} price={this.state.totalPrice} purchaseable={purchaseable} ordered={this.purchasingHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;
