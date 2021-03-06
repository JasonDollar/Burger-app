import React, { Component, Fragment } from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

import * as actions from '../../store/actions/index'

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  }
// needed when without redux
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search)
  //   const ingredients = {}
  //   let price = 0
  //   for (let param of query.entries()) {
  //     if(param[0] === 'price') {
  //       price = param[1]
  //     } else {
  //       ingredients[param[0]] = +param[1]
  //     }
  //   }
  //   this.setState({ingredients, price})
  // }

  

  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('checkout/contact-data')
  }
  render() {
    let summary = <Redirect to="/"/>
    if (this.props.ings) {
      let purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
      summary = (
        <Fragment>
        {purchasedRedirect}
          <CheckoutSummary 
            ingredients={this.props.ings} 
            onCheckoutCancelled={this.checkoutCancelledHandler}
            onCheckoutContinued={this.checkoutContinuedHandler}
          />
          <Route 
            path={this.props.match.path + '/contact-data'} 
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
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  purchased: state.order.purchased,
})





export default connect(mapStateToProps)(Checkout)
