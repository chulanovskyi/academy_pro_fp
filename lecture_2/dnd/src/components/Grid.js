import * as React from 'react';
import Tile from 'components/Tile';
import { data } from 'services';
import * as R from 'ramda';
import 'styles/grid.css';

const Grid = () => (
  <div className="grid-container">
    {R.map(column => (
      R.map((item, index) => (
        <Tile
          key={`${item}_${index}`}
          text={item}
        />
      ), column)
    ), data)}
  </div>
);

export default Grid;
