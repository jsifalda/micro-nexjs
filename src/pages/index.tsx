// import './index.css'

import styled from '@emotion/styled'

import { useEffect } from 'react'

const HomeContainer = styled.div`
  background-color: blue;
  width: 100%;
`

const Home = () => {
  useEffect(() => {
    window.$home = true
    console.log('home mounted', window, window.$login, window.$home)
  }, [])

  return (
    <>
      <div>home in div</div>
      <span>home in span</span>
      <HomeContainer>
        {/* <iframe {...{ src: '/login' }} /> */}
        <import-fragment {...{ src: '/login' }} />
        <import-fragment {...{ src: '/auth/addWord' }} />
        <import-fragment {...{ src: '/auth/store' }} />
      </HomeContainer>
    </>
  )
}

export default Home
