import React, {  useEffect } from 'react'

import axios from '../../axios.orders'
import {connect} from 'react-redux'

import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler'
import Spinner from '../../components/UI/Spinner/Spinner'

import * as actions from '../../store/actions/index'


const Orders = props => {
  useEffect(() => {
    props.onFetchOrders(props.token, props.userId)
  }, [])
  

    let  orders = <Spinner />
    if (!props.loading) {
      orders = (
        props.orders.map(item => (
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
