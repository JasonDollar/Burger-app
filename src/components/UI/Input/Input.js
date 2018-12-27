import React from 'react'

import classes from './Input.module.css'

const Input = (props) => {
  let inputElement = null
  const inputClasses = [classes.InputElement]

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid)
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = (
          <input 
            {...props.elementConfig} 
            className={inputClasses.join(' ')} 
            value={props.value} 
            onChange={props.changed}
          /> 
        )
      //props.elementConfig ktore element dostanie sa to tak jak normalne atrubuty html,
      // zdefiniowane w konfiguracji ContactData , np type="text", dany input bd wiedzial jak je wykorzystac
      break
    case ('textarea'):
      inputElement = (
          <textarea 
          {...props.elementConfig} 
          className={inputClasses.join(' ')} 
          value={props.value}
          onChange={props.changed}
          />
        )
      break
    case ('select'):
      inputElement = (
          <select  
            className={inputClasses.join(' ')} 
            value={props.value}
            onChange={props.changed}
          >
            {props.elementConfig.options.map(item => (
              <option key={item.value} value={item.value}>{item.displayValue}</option>
            ))}
          </select>
        )
      break
    default:
      inputElement = (
          <input 
            {...props.elementConfig} 
            className={inputClasses.join(' ')} 
            value={props.value}
            onChange={props.changed}
          />
        )
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default Input
