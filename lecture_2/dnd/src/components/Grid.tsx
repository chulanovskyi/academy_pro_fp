import * as React from 'react';
import * as R from 'ramda';
import Tile from 'components/Tile';
import { ITile, Matrix } from 'models';
import 'styles/grid.css';

interface IGridProps {
  matrix: Matrix;
}

type ClickEvent = React.MouseEvent | Event;
type Node = React.RefObject<HTMLDivElement>;
type Action = () => void;

const onOutsideClick = (
  evt: ClickEvent,
  node: Node,
  action: Action
) => {
  evt.preventDefault();
  evt.stopPropagation();
  if (evt.target && node.current) {
    const isOutsideNode = (evt.target as Element).closest(`.${node.current.className}`) === null;
    isOutsideNode && action();
  }
};

const deselectOnOutsideClick = (node: Node, action: Action) => () => {
  const deselect = (evt: ClickEvent) => onOutsideClick(evt, node, action);
  document.addEventListener('click', deselect);

  return () => {
    document.removeEventListener('click', deselect);
  };
};

const Grid = ({ matrix }: IGridProps) => {
  const [activeTile, setActive] = React.useState({});
  const gridRef = React.useRef(null);
  React.useEffect(deselectOnOutsideClick(gridRef, () => setActive({})));

  const getMatrix = () => (
    R.map(column => (
      R.map(item => (
        <Tile
          key={item.id}
          isActive={item.id === (activeTile as ITile).id}
          onClick={() => setActive(item)}
          {...item}
        />
      ), column)
    ), matrix)
  );

  return (
    <div className="grid-container" ref={gridRef}>
      {getMatrix()}
    </div>
  );
};

export default Grid;
