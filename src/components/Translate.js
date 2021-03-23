import React, { useState } from 'react';
import Dropdown from './Dropdown';

const options = [
  {
    label: 'Afrikaans',
    value: 'af',
  },
  {
    label: 'Arabic',
    value: 'ar',
  },
  {
    label: 'Hindi',
    value: 'hi',
  },
];

const Translate = () => {
  //Se define el estado y se le provee una opción por defecto
  const [languague, setLanguague] = useState(options[0]);

  return (
    <div>
      <Dropdown
        selected={languague}
        onSelectedChange={setLanguague}
        options={options}
      />
    </div>
  );
};

export default Translate;
