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
  {
    label: 'Dutch',
    value: 'nl',
  },
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Spanish',
    value: 'es',
  },
];

const Translate = () => {
  //Se define el estado y se le provee una opción por defecto
  const [languague, setLanguague] = useState(options[0]);
  //Lo que el usuario escriba para traducir en el input se manejará con text
  const [text, setText] = useState('');

  return (
    <div>
      <Dropdown
        label='Select a languague'
        selected={languague}
        // callback para cuando se cambie el lenguaje seleccionado
        onSelectedChange={setLanguague}
        options={options}
      />
      {/* Se recibe el objeto evento con el callback onChange */}
      <div className='ui form'>
        <div className='field'>
          <label>Enter text</label>
          <input value={text} onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default Translate;
