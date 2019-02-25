import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/UI/Spinner/Spinner'
import {checkValidity} from '../../shared/utility'
import * as actions from '../../store/actions/index'

import classes from './Auth.module.css'

const Auth = props => {
 
    const [controls, setControls] = useState({
      email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Mail Adress'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Password'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
      },
    })
    const [isSignUp, setIsSignUp] = useState(true)
  

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== '/') {
      props.onSetAuthRedirectPath()
    }
  }, [])



  const inputChangedHandler = (e, controlName) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: e.target.value,
        valid: checkValidity(e.target.value, controls[controlName].validation),
        touched: true,
      }
    } 
    setControls(updatedControls)

  }

  const submitHandler = (e) => {
    e.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignUp)
  }

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp)

  }


    const formElementsArray = []
    for (let key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key]
      })
    }

    let form = formElementsArray.map(item => (
      <Input 
        key={item.id}
        elementType={item.config.elementType} 
        elementConfig={item.config.elementConfig} 
        value={item.config.value}
        invalid={!item.config.valid}
        shouldValidate={item.config.validation}
        touched={item.config.touched}
        changed={(e) => inputChangedHandler(e, item.id)}
      />
    ))

    if (props.loading) {
      form = <Spinner />
    }

    let errorMessage = null
    if (props.error) {
      errorMessage = (
        <p>{props.error.message}</p>
      )
    }

    let authRedirect = null
    if (props.isAuthenticated) {
      authRedirect = <Redirect to={props.authRedirectPath} />
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={submitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button 
          btnType="Danger"
          clicked={switchAuthModeHandler}
        >
          SWITCH TO {isSignUp ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>
    )
  
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
})

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
