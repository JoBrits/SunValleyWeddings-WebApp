import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (name, surname, email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, surname, email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      return json;  // Return the error response
    }
    
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'SIGNUP', payload: json})

      // update loading state
      setIsLoading(false)
      setError(null)
    }
  }

  return { signup, isLoading, error }
}