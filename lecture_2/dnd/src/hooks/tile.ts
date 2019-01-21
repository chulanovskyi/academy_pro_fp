import { useState } from 'react';

export const useInput = (initValue = '') => {
  const [value, setValue] = useState(initValue);
  return {
    value,
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => setValue(evt.target.value)
  };
};
