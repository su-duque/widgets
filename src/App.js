import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Dropdown from './components/Dropdown';
import Search from './components/Search';
import Translate from './components/Translate';

const items = [
  {
    title: 'What is React?',
    content: 'React is a front end javascript framework',
  },
  {
    title: 'Why use React?',
    content: 'React is a favorite JS library among engineers',
  },
  {
    title: 'How do you use React?',
    content: 'You use React by creating components',
  },
];

const options = [
  {
    label: 'The Color Red',
    value: 'red',
  },
  {
    label: 'The Color Green',
    value: 'green',
  },
  {
    label: 'A Shade of blue',
    value: 'blue',
  },
];

const App = () => {
  // const [selected, setSelected] = useState(options[0]);
  // const [showDropdown, setShowDropdown] = useState(true);

  return (
    <div>
      {/* <Accordion items={items} /> */}
      {/* <Search /> */}

      {/* <button onClick={() => setShowDropdown(!showDropdown)}>
        Toggle Dropdown
      </button>*/}
      {/* - Si showDropdown es true se muestra el componente, sino no se muestra nada null - */}
      {/* - A Dropdown se le pasa el selected item, una callback function para actualizar el
      selected item y la lista de items de la cual el user puede elegir - */}
      {/* - Se implementó el toggle para ver la importancia del clenup en el event handler - */}
      {/*{showDropdown ? (
        <Dropdown
          label={'Select a color'}
          selected={selected}
          onSelectedChange={setSelected}
          options={options}
        />
      ) : null}
      */}

      <Translate />
    </div>
  );
};

export default App;
