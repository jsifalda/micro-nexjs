import { useEffect } from 'react'

const AuthStore = () => {
  useEffect(() => {
    const token = window.localStorage.getItem('token')
    console.log({ token })
    if (token) {
      window.requestAnimationFrame(() => {
        window.dispatchEvent(
          new CustomEvent('$MESSAGE', {
            detail: { type: 'auth', token },
            bubbles: true,
            composed: true,
            cancelable: false,
          }),
        )
        console.log('token sent!')
      })
    }

    window.addEventListener('auth', (e) => {
      console.log({ auth: e })
    })
  }, [])
  return null
}

export default AuthStore
