import * as React from 'react';
import Tile from 'components/Tile';
import * as R from 'ramda';
import 'styles/grid.css';

const onOutsideClick = (e, node, action) => {
  e.preventDefault();
  e.stopPropagation();
  if (e.target.closest(`.${node.current.className}`) === null) {
    if (node && action) {
      action();
    }
  }
};

const deselectOnOutsideClick = (node, action) => () => {
  const deselect = (e) => onOutsideClick(e, node, action);
  document.addEventListener('click', deselect);

  return () => {
    document.removeEventListener('click', deselect);
  }
};

const Grid = ({ matrix }) => {
  const [activeTile, setActive] = React.useState({});
  const gridRef = React.useRef(null);
  React.useEffect(deselectOnOutsideClick(gridRef, () => setActive({})));

  return (
    <div className="grid-container" ref={gridRef}>
      {R.map(column => (
        R.map(item => (
          <Tile
            key={item.id}
            isActive={item.id === activeTile.id}
            onClick={() => setActive(item)}
            {...item}
          />
        ), column)
      ), matrix)}
    </div>
  );
};

export default Grid;
