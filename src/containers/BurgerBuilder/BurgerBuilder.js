import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler'
import * as actions from '../../store/actions/index'

import axios from '../../axios.orders'


const BurgerBuilder = props => {


  const [purchasing, setPurchasingState] = useState(false)

  useEffect(() => {
    props.onInitIngredients()
  }, [])

  

  const updatePurchaseState = (ingredients) => {

    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey] // zwraca wartosc jaka mial dany klucz
      })
      .reduce((acc, cur) => {
        return acc + cur
      }, 0)

      return sum > 0
    
  }


  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasingState(true)
    } else {
      props.onSetAuthRedirectPath('/checkout')
      props.history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasingState(false)
  }

  const purchaseContinueHandler = () => {
    props.onInitPurchase()
    props.history.push('/checkout')

  }


    const disabledInfo = {
      ...props.ings
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null
    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if (props.ings) {
      burger = ( 
        <React.Fragment>
          <Burger ingredients={props.ings}/>
          <BuildControls 
            ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={updatePurchaseState(props.ings)}
            price={props.price}
            ordered={purchaseHandler}
            isAuth={props.isAuthenticated}
          />
        </React.Fragment>
      )

      orderSummary = <OrderSummary 
      ingredients={props.ings} 
      purchaseCanceled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
      price={props.price}
    />
    }

    // if (state.loading) {
    //   orderSummary = <Spinner />
    // } 


    return (
      <React.Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
      </React.Fragment>
    )
  
}

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.token !== null

})

const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
  onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))

