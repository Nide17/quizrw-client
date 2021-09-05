import React from 'react'
import { NavLink, Button } from 'reactstrap'
import PropTypes from 'prop-types'
import powerOff from '../../images/power-off.svg'

import { connect } from 'react-redux'
import { logout } from '../../redux/auth/auth.actions'

const Logout = ({ logout }) => {

  const logingout = () => {
    var signOut = window.confirm("Log out?");

    if (signOut) {
      logout()
      window.location.href = "/"
    }

    else return null
  }

  return (
    <>
      <NavLink onClick={logingout} href="#" className="m-0 p-0 px-sm-3">
        <Button color="warning" size="sm" className="py-0 px-1">
          <img src={powerOff} alt="logout to quiz blog" width="16" height="16" />
        </Button>
      </NavLink>
    </>
  )
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout)
