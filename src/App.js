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

const showAccordion = () => {
  if (window.location.pathname === '/') {
    return <Accordion items={items} />;
  }
};

const showList = () => {
  if (window.location.pathname === '/list') {
    return <Search />;
  }
};

const showDropdown = () => {
  if (window.location.pathname === '/dropdown') {
    return <Dropdown />;
  }
};

const showTranslate = () => {
  if (window.location.pathname === '/translate') {
    return <Translate />;
  }
};

/* En lugar de todas las funciones anteriores, Sería mejor implementar
una función que haga todas las validaciones, pero esta no es una solución
tipo React. Lo mejor es crear un Componente */
const showComponent = (route, component) => {
  return window.location.pathname === route ? component : null;
}

// export default () => { // <-- App podría tener esta forma
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
      {/* <Translate /> */}
      {showAccordion()}
      {showList()}
      {showDropdown()}
      {showTranslate()}
    </div>
  );
};

export default App;
