import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useMemo, useCallback } from 'react'
import mainApi from '../services/api'
import _ from 'lodash'
import styled from 'styled-components'

const StyledTextArea = styled('textarea')`
  width: calc(100% - 1rem);
  height: calc(100% - 3rem);
  > svg {
    width: 100%;
    height: 100%;
  }
`

const Edit = () => {
  const { id } = useParams()
  const api = useMemo(() => new mainApi(id), [id])
  const [code, setCode] = useState("")

  const fetchDebounce = useCallback(
    _.debounce(async () => {
      setCode(await api.fetchText())
      fetchDebounce()
    }, 800), [])

  useEffect(() => {
    fetchDebounce()
  }, [])

  const postDebounce = useCallback(_.debounce(async (text:string) => {
    console.log(text)
    await api.postText(text)
    fetchDebounce()
  }, 400), [])

  useEffect(() => {fetchDebounce()}, [])

  const handleInput = (text: string) => {
    setCode(text)
    fetchDebounce.cancel()
    postDebounce.cancel()
    postDebounce(text)
  }

  return (
    <>
      <Header id={id || ''} />
      <StyledTextArea value={code} onChange={(e) => handleInput(e.currentTarget.value)} />
    </>
  )
}

export default Edit