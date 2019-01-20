import * as React from 'react';
import cn from 'classnames';
import { ITile } from 'models';
import 'styles/tile.css';

interface ITileProps extends ITile {
  isActive?: boolean;
  onClick?(evt: React.MouseEvent): void;
}

const Tile = React.memo(({ id, isActive, onClick }: ITileProps) => (
  <div
    role="button"
    tabIndex={0}
    className={cn('tile-container flex-center', { active: isActive })}
    onClick={onClick}
  >
    {id}
  </div>
));

export default Tile;
