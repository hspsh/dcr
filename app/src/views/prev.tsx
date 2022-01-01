import Header from '../components/Header'
import {useParams} from 'react-router-dom'

const Prev = () => {
  const {id} = useParams()
  return (
    <>
      <Header id={id || ''}/>
    </>
  )
}

export default Prev