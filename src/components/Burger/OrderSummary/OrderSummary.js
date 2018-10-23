import React, {Component} from 'react'
import Button from '../../UI/Button/Button'
// import { privateEncrypt } from 'crypto';

class OrderSummary extends Component {
  // TODO this could be funcional component
  componentWillUpdate() {
    console.log("OS will update")
  }
  
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{textTransform: 'capitalize'}} >{igKey}</span>: {this.props.ingredients[igKey]}
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
      <strong><p>Total Price: {(this.props.price / 10).toFixed(2)}</p></strong>
      <p>Continue to checkout?</p>
      <Button clicked={this.props.purchaseCanceled} btnType={'Danger'}>CANCEL</Button>
      <Button clicked={this.props.purchaseContinued} btnType={'Success'}>CONTINUE</Button>
    </React.Fragment>
    )
  }
}


export default OrderSummary
