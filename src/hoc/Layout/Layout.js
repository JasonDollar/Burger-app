import React, {useState} from 'react';
import {connect} from 'react-redux'
import classes from './Layout.module.css'
import Toolbar from '../../components/navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer'

const Layout  = props => {

  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false)
  
  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false)
  }

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible)
  }
  
    return (
      <React.Fragment>
        <Toolbar drawerToggleClicked={sideDrawerToggleHandler} isAuth={props.isAuthenticated}/>
        <SideDrawer closed={sideDrawerClosedHandler} open={sideDrawerIsVisible} isAuth={props.isAuthenticated}/>
        <main className={classes.content}>
          {props.children}
        </main>
      </React.Fragment>
    )
  
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
})


export default connect(mapStateToProps)(Layout)