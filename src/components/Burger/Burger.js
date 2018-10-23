import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
// import { arch } from 'os';
//igKey === ingredient Key
const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, index) => (
        <BurgerIngredient key={igKey + index} type={igKey} />))
    })
    .reduce((acc, cur) => {
      return acc.concat(cur)
    }, [])
    console.log(transformedIngredients)
    if (transformedIngredients.length === 0) {
      transformedIngredients = <p>Please start adding ingredients</p>
    }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={"bread-top"}/>
      {transformedIngredients}
      
      <BurgerIngredient type={"bread-bottom"}/>
    </div>
  )
}

export default Burger
