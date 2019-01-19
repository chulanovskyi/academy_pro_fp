import * as React from 'react';
import Grid from 'components/Grid';
import { matrix } from 'services';
import 'styles/app.css';

const App = () => (
  <div className="dnd-container flex-center">
    <Grid matrix={matrix}/>
  </div>
);

export default App;
