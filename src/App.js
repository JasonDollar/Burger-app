import React, { useEffect, Suspense } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './hoc/Layout/Layout' 
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout'
// import Orders from './containers/Orders/Orders'
// import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
// import asyncComponent from './hoc/asyncComponent/asyncComponnet'
import * as actions from './store/actions'

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
})
const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
})
const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
})

const App = props => {
  
  useEffect(() => {
    props.onTryAutoSignup()
  }, [])
  
  
    let routes = (
      <Switch>
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={props => <Checkout {...props} />} />
          <Route path="/orders" component={props => <Orders {...props} />} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={props => <Auth {...props} />} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>
            {routes}
          </Suspense>
        
        </Layout>

      </div>
    );
  
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
