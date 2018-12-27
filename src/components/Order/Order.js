import React from 'react'

import classes from './Order.module.css'

const Order = ({ingredients, price}) => {
  const mappedIngredients = []

  for (let ingredientName in ingredients) {
    mappedIngredients.push({name: ingredientName, amount: ingredients[ingredientName]})
  }

  const ingredientOutput = mappedIngredients.map(item => {
    return <span 
      key={item.name} 
      style={{
        textTransform: 'capitalize', 
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px',
      }}
    >{item.name} ({item.amount})</span>
  })
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD {(price / 100).toFixed(2)}</strong></p> 
      {/*number jest tu jako string ale przy dzieleniu nastepuje konwersja */}
    </div>
  )
}

export default Order
