import React, { Fragment } from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'


const Checkout = (props) => {
 
  // const [ings, setIngs] = useState(null)
  // const [price, setPrice] = useState(0)

  

  const checkoutCancelledHandler = () => {
    props.history.goBack()
  }

  const checkoutContinuedHandler = () => {
    props.history.replace('checkout/contact-data')
  }
  
    let summary = <Redirect to="/"/>
    if (props.ings) {
      let purchasedRedirect = props.purchased ? <Redirect to="/" /> : null
      summary = (
        <Fragment>
        {purchasedRedirect}
          <CheckoutSummary 
            ingredients={props.ings} 
            onCheckoutCancelled={checkoutCancelledHandler}
            onCheckoutContinued={checkoutContinuedHandler}
          />
          <Route 
            path={props.match.path + '/contact-data'} 
            component={ContactData}
          />
        </Fragment>
    )
    }
    return (
      <div>
        {summary}
      </div>
    )
  
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  purchased: state.order.purchased,
})





export default connect(mapStateToProps)(Checkout)
