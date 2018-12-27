import * as actionTypes from './actionTypes'
import axios from '../../axios.orders'
// import {dispatch} from 'redux'

export const addIngredient = ingName => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: ingName
})

export const removeIngredient = ingName => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: ingName
})

export const setIngredient = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://my-burger-de0b5.firebaseio.com/ingredients.json')
      .then(resp => {
        dispatch(setIngredient(resp.data))
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed())
      })
  }
}