import { useEffect, useState } from 'react'

const useFetch = <T,>(url: string, token: string) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const json = await res.json()

        setData(json.data) // Adjust this based on your actual API response
        setLoading(false)
      } catch (error: any) {
        setError(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [url, token])

  return { loading, error, data }
}

export default useFetch
