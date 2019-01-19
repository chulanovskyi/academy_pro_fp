import * as React from 'react';
import cn from 'classnames';
import 'styles/tile.css';

const Tile = React.memo(({id, isActive, onClick}) => (
  <div
    role="button"
    tabIndex={0}
    className={cn("tile-container flex-center", {active: isActive})}
    onClick={onClick}
  >
    {id}
  </div>
));

export default Tile;
