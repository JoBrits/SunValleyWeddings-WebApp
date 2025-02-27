import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useUpdate = () => {
  
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const updateUser = async (id, updatedData) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`/api/user/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedData)
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    
    if (response.ok) {
      // update the user in local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({ type: 'UPDATE', payload: json })

      // update loading state
      setIsLoading(false)
    }
  }

  return { updateUser, isLoading, error }
}
