import { createFileRoute } from '@tanstack/react-router'
import {useEffect, useState} from 'react'
import {fetchData} from '../services/fetchData.js'


export const Route = createFileRoute('/users')({
  component: RouteComponent,
})

function RouteComponent() {
  const [values, setValues] = useState({
    url: 'https://api.freeapi.app/api/v1/public/cats/cat/random',
    page: 1,
    limit: 10,
    method: 'GET'
  })
  const [data, setData] = useState(null)
  
  useEffect( () => {
    const controller = new AbortController();
    if(!data){

      const handleFetch = async () => {
        const res = await fetchData(values.url, values.page, values.limit, values.method, controller)
        return res;
      }
      handleFetch().then(res => setData(res)).catch(err => console.log('Data fetching error: ', err))
    }
  
    return () => {
      controller.abort();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.page])
  

  

  return <div>{JSON.stringify(data)}</div>
}
