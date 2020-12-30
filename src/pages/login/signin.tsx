import styled from '@emotion/styled'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import redaxios from 'redaxios'

const Form = styled.form`
  background-color: purple;
  display: flex;
  flex-direction: column;
`

interface LoginData {
  email: string
  password: string
}

const getToken = async (params) => {
  console.log({ params })
  return redaxios.post('http://104.248.88.214:1234/api', {
    operation: 'getToken',
    params,
  })
  // return redaxios('http://104.248.88.214:1234/api', {
  //   method: 'post',
  //   headers: { 'Content-Type': 'application/json; charset=utf-8' },
  //   body: JSON.stringify({
  //     operation: 'getToken',
  //     params,
  //   }),
  // })
}

const useLocalStorage = (key: string, initial?: any) => {
  const item = null
  const setItem = useCallback((value: any) => {
    window.localStorage.setItem(key, value)
  }, [])
  return [item, setItem] as const
}

const useSsrLocalStorage = (key: string, initial?: string) => {
  return typeof window === 'undefined'
    ? [initial, (value: string) => undefined]
    : useLocalStorage(key, initial)
}

const LoginSignIn = () => {
  const { handleSubmit, register } = useForm<LoginData>()
  const [authenticated, setAuthenticated] = useState(false)
  const [login] = useMutation(getToken)
  const [, setToken] = useSsrLocalStorage('token')
  const onSubmit = useCallback(async (values: LoginData) => {
    // window.dispatchEvent(new CustomEvent('message', { detail: { values } }))
    window.dispatchEvent(
      new CustomEvent('$MESSAGE', {
        detail: { values },
        bubbles: true,
        composed: true,
        cancelable: false,
      }),
    )
    // console.log('sent!')
    // try {
    //   const result = await login(values)
    //   const data = result.data?.getToken
    //   console.log({ data })
    //   setToken(data?.token)
    //   // useSsrLocalStorage('token', data?.token)
    //   // useSsrLocalStorage('auth', data?.auth)
    // } catch (e) {
    //   console.error(e)
    // }
  }, [])

  useEffect(() => {
    console.log('adding auth event lsitener')
    window.addEventListener(
      'auth',
      (e) => {
        console.log('authenticated', e)
        setAuthenticated(true)
      },
      false,
    )
  }, [])

  return authenticated ? (
    'login no need'
  ) : (
    <Form {...{ onSubmit: handleSubmit(onSubmit) }}>
      <input {...{ name: 'email', ref: register({ required: true }) }} />
      <input
        {...{
          name: 'password',
          type: 'password',
          ref: register({ required: true }),
        }}
      />
      <button {...{ type: 'submit' }}>login</button>
    </Form>
  )
}

export default LoginSignIn
