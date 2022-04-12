import { useContext, useState } from 'react';
import { mainContext } from '../provider/mainProvider';

const Box = ({ className }) => {
  const [currType, setCurrType] = useState();
  const { type, mouseActive } = useContext(mainContext);
  const [active, setActive] = useState(false);

  const setNewType = () => {
    setCurrType(type);
  }

  return (
    <td 
      onMouseOver={ () => {
        if (mouseActive) {
          setActive(!active);
          setNewType();
        }
      } }
      className={ active ? currType : className } 
    />
  )
}

export default Box;
