import React from 'react'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) =>{
    const ingredientSummary = Object.keys(props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{textTransform: 'capitalize'}} >{igKey}</span>: {props.ingredients[igKey]}
          </li>
        )
      })
    return (
      <React.Fragment>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
      {ingredientSummary}
      </ul>
      <strong><p>Total Price: {(props.price / 100).toFixed(2)}</p></strong>
      <p>Continue to checkout?</p>
      <Button clicked={props.purchaseCanceled} btnType={'Danger'}>CANCEL</Button>
      <Button clicked={props.purchaseContinued} btnType={'Success'}>CONTINUE</Button>
    </React.Fragment>
    )
  }



export default OrderSummary
