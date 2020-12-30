// import './login.css'

import styled from '@emotion/styled'
import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const Container = styled.div`
  width: 100%;
  background-color: red;
`

const DefaultLoginRoute = () => {
  return <>'login again'</>
}

const Login = () => {
  // useEffect(() => {
  //   window.$login = true
  //   console.log('login mounted', window, window.$login, window.$home)
  // }, [])

  return (
    <Container>
      {/* <Router {...{}}>
        <Switch>
          <Route {...{ render: (props) => <DefaultLoginRoute {...props} /> }} />
        </Switch>
      </Router> */}
      <import-fragment {...{ src: '/login/signin' }} />
    </Container>
  )
}

export default Login
