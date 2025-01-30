import { useState } from 'react'

export const useBookingForm = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const request = async (name, email, events) => {
    
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/bookings/request', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, email, events })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    
    if (response.ok) {
      // update loading state
      setIsLoading(false)
    }
  }

  return { request, isLoading, error }
}