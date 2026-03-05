import { useState, useEffect } from 'react'

export const useFetch = (fetchFunction) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      setLoading(true)
      try {
        const result = await fetchFunction()
        if (isMounted) {
          setData(result || [])
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Error fetching data')
          setData([])
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => { isMounted = false }
  }, [fetchFunction])

  return { data, loading, error }
}