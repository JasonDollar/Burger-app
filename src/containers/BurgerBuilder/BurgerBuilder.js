import React, { Component } from 'react'
import {connect} from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler'
import * as burgerBuilderActions from '../../store/actions/index'

import axios from '../../axios.orders'


export class BurgerBuilder extends Component {

  state = {
    purchasing: false,
  }

  componentDidMount() {
    // console.log(this.props)
    // 
    this.props.onInitIngredients()
  }

  updatePurchaseState = (ingredients) => {

    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey] // zwraca wartosc jaka mial dany klucz
      })
      .reduce((acc, cur) => {
        return acc + cur
      }, 0)

      return sum > 0
    
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type]
  //   const updatedCount = oldCount + 1
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   }
  //   updatedIngredients[type] = updatedCount
  //   const priceAddition = INGREDIENT_PRICES[type]
  //   const oldPrice = this.state.totalPrice
  //   const newPrice = oldPrice + priceAddition
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice
  //   })
  //   this.updatePurchaseState(updatedIngredients)
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type]
  //   if (oldCount <= 0) {
  //     return
  //   }
  //   const updatedCount = oldCount - 1
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   }
  //   updatedIngredients[type] = updatedCount
  //   const priceDeduction = INGREDIENT_PRICES[type]
  //   const oldPrice = this.state.totalPrice
  //   const newPrice = oldPrice - priceDeduction
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice
  //   })
  //   this.updatePurchaseState(updatedIngredients)
  // }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
    // redux will take care of it
    // this.setState({loading: true})
   
  //   const queryParams = []
  //   for (let i in this.state.ingredients) {
  //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
  //   }
  //   queryParams.push('price=' + this.props.price)
  //   const queryString = queryParams.join('&')
  //   this.props.history.push({
  //     pathname: '/checkout',
  //     search: '?' + queryString
  //   })
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if (this.props.ings) {
      burger = ( 
        <React.Fragment>
          <Burger ingredients={this.props.ings}/>
          <BuildControls 
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      )

      orderSummary = <OrderSummary 
      ingredients={this.props.ings} 
      purchaseCanceled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      price={this.props.price}
    />
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />
    // } 


    return (
      <React.Fragment>
      <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
})

const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
  onIngredientRemoved: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
  onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))

