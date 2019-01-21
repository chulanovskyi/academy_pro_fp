import * as React from 'react';
import * as R from 'ramda';
import Tile from 'components/Tile';
import { onOutsideClick } from 'services/dom';
import { ITile, Matrix, ClickEvent, Action, DivNode } from 'models';
import 'styles/grid.css';

interface IGridProps {
  matrix: Matrix;
}

const deselectOnOutsideClick = (node: DivNode, action: Action) => () => {
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

  const renderMatrix = () =>
    R.map(
      column =>
        R.map(
          item => (
            <Tile
              key={item.id}
              isActive={item.id === (activeTile as ITile).id}
              onClick={() => setActive(item)}
              {...item}
            />
          ),
          column
        ),
      matrix
    );

  return (
    <div className="grid-container" ref={gridRef}>
      {renderMatrix()}
    </div>
  );
};

export default Grid;
