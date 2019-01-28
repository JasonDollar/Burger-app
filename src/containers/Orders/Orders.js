import React, { Component } from 'react'

import axios from '../../axios.orders'
import {connect} from 'react-redux'

import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler'
import Spinner from '../../components/UI/Spinner/Spinner'

import * as actions from '../../store/actions/index'

import classes from './Orders.module.css'

export class Orders extends Component {
  
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId)
    // axios.get('/orders.json')
    //   .then(res => {
    //     const fetchOrders = []
    //     for (let key in res.data) {
    //       fetchOrders.push({
    //         ...res.data[key],
    //         id: key
    //       })
    //     }
    //     this.setState({
    //       loading: false,
    //       orders: fetchOrders
    //     })
    //   })
    //   .catch(err => this.setState({loading: false}))
  }

  render() {
    let  orders = <Spinner />
    if (!this.props.loading) {
      orders = (
        this.props.orders.map(item => (
            <Order 
              key={item.id}
              ingredients={item.ingredients}
              price={item.price}
            />
          ))
      )
    }
    return (
      <div>
        {orders}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
