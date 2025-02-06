import { useState } from 'react'

export const useEventForm = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const request = async (name, email, date, time, guests ) => {
    
    // Testing
    // console.log("Name:", name);
    // console.log("Email:", email);
    // console.log("Date:", date);
    // console.log("Time:", time);
    // console.log("guests:", guests);

    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/events/event-request', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, email, date, time, guests  })
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