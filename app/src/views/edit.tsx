import Header from '../components/Header'
import {useParams} from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import {default as mainApi} from '../services/api'

const Edit = () => {
  const {id} = useParams()
  const api = useMemo(() => new mainApi(id), [id])
  const [code, setCode] = useState("")

  const [auto, setAuto] = useState(setInterval(setCode(api.fetchText), 800))

  return (
    <>
      <Header id={id || ''} />
      <textarea value={code} onChange={e => handleInput(e.currentTarget.value)}></textarea>
    </>
  )
}

export default Edit