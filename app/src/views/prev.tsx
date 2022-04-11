import Header from '../components/Header'
import {useParams} from 'react-router-dom'
import parser from 'html-react-parser'
import mainApi from '../services/api'
import { useEffect, useCallback, useMemo, useState } from 'react'
import _ from 'lodash'
import styled from 'styled-components'

const Image = styled.div`
  width: 100%;
  height: calc(100% - 3rem);
  > svg {
    width: 100%;
    height: 100%;
  }
`

const Prev = () => {
  const { id } = useParams()
  const api = useMemo(() => new mainApi(id), [id])
  const [img, setImg] = useState('')

  const fetchDebounce = useCallback(
    _.debounce(async () => {
      setImg(await api.fetchImg().then(entry => entry.content))
      fetchDebounce()
    }, 3200), [])

  useEffect(() => {
    fetchDebounce()
  }, [fetchDebounce])
  return (
    <>
      <Header id={id || ''}/>
      <Image>{parser(img)}</Image>
    </>
  )
}

export default Prev