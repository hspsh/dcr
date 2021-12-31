import {useLocation} from 'react-router-dom'
import ColorHash from 'color-hash'
import './Header.scss'

const colorHash = new ColorHash({lightness: 0.68});

const Header = (props: { id: string }) => {

  const location = useLocation();
  return (
    <header style={{background: colorHash.hex("" + props.id)}}>
      <p>File: 
        <span className="filePath">
          {location.pathname}
        </span>
      </p>
    </header>
  )
}



export default Header
