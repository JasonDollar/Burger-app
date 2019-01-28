import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
]

const BuildControls = (props) => {
  return (
    <div  className={classes.BuildControls}>
      <p>Burger Price: <strong>{(props.price/100).toFixed(2)}</strong></p>
      {controls.map(item => 
          <BuildControl 
            key={item.label} 
            label={item.label} 
            added={() => {props.ingredientAdded(item.type)}}
            removed={() => {props.ingredientRemoved(item.type)}}
            disabled={props.disabled[item.type]} // zwroci true lub false dla danego typu
          />
        )}
      <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>
      {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
      
      </button>
    </div>
  )
}

export default BuildControls
