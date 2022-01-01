import Header from '../components/Header'
import {useParams} from 'react-router-dom'
import React, { useState } from 'react'
import {default as apiClass} from '../services/api'

const Edit = () => {
  const {id} = useParams()

  const api = new apiClass(id)

  const resetTimeout = (prevTimeout: ReturnType<typeof setTimeout> | undefined, val: string, time: number): ReturnType<typeof setTimeout> => {
    if (prevTimeout !== undefined) {
      clearTimeout(prevTimeout)
    }
    return setTimeout(() => {
      api.postText(val)
    }, time)
  }
  
  // fetch text from api and set it to state
  const [code, setCode] = useState("")

  api.fetchText().then(text => setCode(text))

  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | undefined>(undefined)
  const handleInput = (val: string) => {
    setTimer(resetTimeout(timer, val, 420))
  };

  return (
    <>
      <Header id={id || ''} />
      <textarea value={code} onChange={e => handleInput(e.currentTarget.value)}></textarea>
    </>
  )
}

export default Edit