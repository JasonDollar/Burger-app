import React, { Component } from 'react'
import axios from '../../../axios.orders'
import {connect} from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import classes from './ContactData.module.css'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorhandler'
import * as actions from '../../../store/actions/index'
import {checkValidity} from '../../../shared/utility'

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Your Name'
          },
          value: '',
          validation: {
              required: true
          },
          valid: false,
          touched: false
      },
      street: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Street'
          },
          value: '',
          validation: {
              required: true
          },
          valid: false,
          touched: false
      },
      zipCode: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'ZIP Code'
          },
          value: '',
          validation: {
              required: true,
              minLength: 5,
              maxLength: 5,
              isNumeric: true
          },
          valid: false,
          touched: false
      },
      country: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Country'
          },
          value: '',
          validation: {
              required: true
          },
          valid: false,
          touched: false
      },
      email: {
          elementType: 'input',
          elementConfig: {
              type: 'email',
              placeholder: 'Your E-Mail'
          },
          value: '',
          validation: {
              required: true,
              isEmail: true
          },
          valid: false,
          touched: false
      },
      deliveryMethod: {
          elementType: 'select',
          elementConfig: {
              options: [
                  {value: 'fastest', displayValue: 'Fastest'},
                  {value: 'cheapest', displayValue: 'Cheapest'}
              ]
          },
          value: 'fastest',
          validation: {},
          valid: true
      }
  },
  formIsValid: false,
  loading: false
}


  orderHandler = (e) => {
    e.preventDefault()
    const formData = {}

    for (let element in this.state.orderForm) {
      formData[element] = this.state.orderForm[element].value
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }

    this.props.onOrderBurger(order, this.props.token)
    
  }

  inputChangedHandler = (e, inputIdentifier) => {
    // shallow state copy
    const updatedOrderForm = {
      ...this.state.orderForm
    } 
    const updatedFormElement= {
      ...updatedOrderForm[inputIdentifier]
    }

    updatedFormElement.value = e.target.value
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true
    updatedOrderForm[inputIdentifier] = updatedFormElement

    let formIsValid = true

    for (let element in updatedOrderForm) {
      formIsValid = updatedOrderForm[element].valid && formIsValid
    }
    this.setState({orderForm: updatedOrderForm, formIsValid})
  }

  render() {
    const formElementsArray = []
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(item => (
          <Input 
            key={item.id}
            elementType={item.config.elementType} 
            elementConfig={item.config.elementConfig} 
            value={item.config.value}
            changed={(e) => this.inputChangedHandler(e, item.id)}
            invalid={!item.config.valid}
            shouldValidate={item.config.validation}
            touched={item.config.touched}
          />
        ))}
          
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    )

    if (this.props.loading === true) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
})

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))


