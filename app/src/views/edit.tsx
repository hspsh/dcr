import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useMemo, useCallback } from 'react'
import mainApi from '../services/api'
import _, { DebouncedFunc } from 'lodash'

const Edit = () => {
  const { id } = useParams()
  const api = useMemo(() => new mainApi(id), [id])
  const [code, setCode] = useState("")
  const [timer, setTimer] = useState<Promise<void>>()

  const fetchDebounce = useCallback(
    _.debounce(async () => {
      setCode(await api.fetchText())
      setTimer(fetchDebounce())
    }, 800), [])

  useEffect(() => {
    setTimer(fetchDebounce())
  }, [])

  const postDebounce = useCallback(_.debounce(async () => {
    await api.postText(code)
    setTimer(fetchDebounce())
  }, 400), [])

  useEffect(() => setTimer(fetchDebounce()), [])

  const handleInput = () => {
    fetchDebounce.cancel()
    setTimer(postDebounce())
  }

  return (
    <>
      <Header id={id || ''} />
      <textarea value={code} onChange={() => handleInput()} />
    </>
  )
}

export default Edit