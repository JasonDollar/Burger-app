import * as actionTypes from '../actions/actionTypes'

import { updateObj } from '../utility'

const initialState = {
  ingredients: null,
  totalPrice: 400,
  error: false,
  building: false,
}

const INGREDIENT_PRICES = {
  salad: 50,
  cheese: 40,
  meat: 130,
  bacon: 70
}

const addIngredient = (state, action) => {
  const updatedIngredients = updateObj(state.ingredients, {[action.ingredientName]: state.ingredients[action.ingredientName] + 1})
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updateObj(state, updatedState)
}

const removeIngredient = (state, action) => {
  const updatedIngredients = updateObj(state.ingredients, {[action.ingredientName]: state.ingredients[action.ingredientName] - 1})
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  }
  return updateObj(state, updatedState)
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
    case actionTypes.SET_INGREDIENTS: 
      return updateObj(state, {
        ingredients: action.ingredients,
        totalPrice: 400,
        error: false,
        building: false,
      })
    case actionTypes.FETCH_INGREDIENTS_FAILED: 
      return updateObj(state, {error: true})
    default:
      return state
  }
}

export default reducer