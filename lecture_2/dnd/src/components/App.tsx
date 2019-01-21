import * as React from 'react';
import Grid from 'components/Grid';
import { createMatrix } from 'services/matrix';
import 'styles/app.css';

const App = () => {
  const [matrix, updateMatrix] = React.useState(createMatrix(3)(3));
  console.log(matrix);
  const x = createMatrix(3);
  console.log(x);
  return (
    <div className="dnd-container flex-center">
      <Grid matrix={matrix} />
    </div>
  );
};

export default App;
