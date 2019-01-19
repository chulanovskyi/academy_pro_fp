import * as React from 'react';
import 'styles/tile.css';

const Tile = React.memo((props) => (
  <div className="tile-container flex-center">
    {props.text}
  </div>
));

export default Tile;
