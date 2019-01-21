import * as React from 'react';
import cn from 'classnames';
import { ITile } from 'models';
import { useInput } from 'hooks/tile';
import { rearrangeMatrix } from 'services/matrix';
import 'styles/tile.css';

interface ITileProps extends ITile {
  isActive?: boolean;
  onClick?(evt: React.MouseEvent): void;
}

const TileControls = (tile: ITile) => {
  const rowInput = useInput(tile.row.toString());
  const colInput = useInput(tile.column.toString());

  return (
    <div className="tile-controls">
      <div className="col-control">
        <span className="title">Column</span>
        <input
          name="column"
          type="text"
          defaultValue={colInput.value}
          onChange={colInput.onChange}
        />
      </div>
      <div className="row-control">
        <span className="title">Row</span>
        <input name="row" type="text" defaultValue={rowInput.value} onChange={rowInput.onChange} />
      </div>
      <div className="confirm-container">
        <button type="button" onClick={() => rearrangeMatrix}>
          Save
        </button>
      </div>
    </div>
  );
};

const Tile = React.memo((props: ITileProps) => (
  <div
    role="button"
    tabIndex={0}
    className={cn('tile-container flex-center', { active: props.isActive })}
    onClick={props.onClick}
  >
    {props.id}
    {props.isActive && <TileControls {...props} />}
  </div>
));

export default Tile;
