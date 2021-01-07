import React, { useState } from 'react';

const Dropdown = ({ options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null; //Para que no se muestre nada en la pantalla
      // Esto se hace porque ya estamos renderizando el elemento selected,
      // no lo queremos volver a renderizar en la lista de elementos renderedOptions
    }
    return (
      // cuando se selecciona uno de los elementos de la lista, se llama la función onSelectedChange con la opción seleccionada,
      // la función está en App que es onSelectedChange={setSelected}, como se setea un useState, se vuelve a renderizar App
      // pasandole a Dropdown la información del nuevo elemento seleccionado en la prop selected
      // Dropdown se vuelve a renderizar ya mostrando el nuevo elemento seleccionado
      <div
        key={option.value}
        className='item'
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div className='ui form'>
      <div className='field'>
        <label className='label'>Select a Color</label>
        <div
          onClick={() => setOpen(!open)}
          // Si open es true se le agrega a 'ui selection dropdown' - visible active,
          //  sino se agrega un string vacío
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className='dropdown icon'></i>
          <div className='text'>{selected.label}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
