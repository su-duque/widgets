import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ options, selected, onSelectedChange }) => {
  // selected es el objeto que contiene el label y el valor

  const [open, setOpen] = useState(false);

  // Se quiere obtener una referencia del elemento padre de todo el componente Dropdown,
  // por eso se le asignará ref a <div className='ui form'>
  const ref = useRef();

  // Se quiere que solo se ejecute 1 vez, cuando se renderice el componente, por eso []
  // y es porque solo se debe configurar el Event Listener solo 1 vez
  useEffect(() => {
    const onBodyClick = (event) => {
      console.log('Body click');
      // console.log('Clicked Element', event.target);
      if (ref.current && ref.current.contains(event.target)) {
        return; // Se hace un return early si el evento está dentro del componente Dropdown,
        // se valida que el elemento que ocasionó el evento esté dentro del <div className='ui form'> que es igual a ref.current
        // .contains() se puede utilizar con cualquier elemento del DOM para checkear si un elemento está contenido en otro
        // return early quiere decir que no se ejecutará el setOpen(false)
      }
      // Como queremos cerrar el Dropdown cuando se haga click en cualquier lado,
      // se llama setOpen y se setea en false.
      setOpen(false);
    };
    console.log('Se configura el Event Listener del Body');
    document.body.addEventListener(
      'click',
      onBodyClick, // Callback function que se ejecuta cuando hay un evento click en el body
      { capture: true } // Se utiliza para que Dropdown no esté siempre cerrado y se pueda controlar.
    );

    return () => {
      // Cleanup function, se requiere porque se implementó un botón que aparece y desaparece el componente
      // entonces se debe hacer cleanup para que el useEffect no se invoque si el componente no se está mostrando
      console.log('Se remueve el event listener del Body');
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null; // Para que no se muestre en la pantalla
      // Esto se hace porque ya estamos renderizando el elemento selected,
      // no lo queremos volver a renderizar en la lista de elementos renderedOptions
    }
    return (
      // cuando se selecciona uno de los elementos de la lista, se llama la función
      // onSelectedChange con la opción seleccionada, la función está en App que es
      // onSelectedChange={setSelected}, como se setea un useState, se vuelve a
      // renderizar App pasandole a Dropdown la información del nuevo elemento
      // seleccionado en la prop selected.
      // El componente Dropdown se vuelve a renderizar ya mostrando el nuevo elemento seleccionado
      <div
        key={option.value}
        className='item'
        onClick={() => {
          // console.log('item clicked');
          onSelectedChange(option);
        }}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} className='ui form'>
      <div className='field'>
        <label className='label'>Select a Color</label>
        <div
          onClick={() => {
            // console.log('Dropdown clicked')
            setOpen(!open);
          }}
          // Si open es true se le agrega a 'ui selection dropdown' - 'visible active',
          // sino se agrega un string vacío
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className='dropdown icon'></i>
          {/* El label del elemento seleccionado se muestra en el campo que 
          se clickea para desplegar el Dropdown */}
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
