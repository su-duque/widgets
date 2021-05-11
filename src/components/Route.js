// No se importa React, porque Solo se necesita cuando se está escribiendo JSX
// import React from 'react';

/* useEffect hook se requiere cuando se va a configurar un event listener.
Se va a escuchar el evento que se produce en el componente Link, cada vez
que se le da click a alguna de las opciones del Header. Se le quiere
informar a este componente Route que la URL cambió cuando se hizo click */

/* El useState se usará porque se quiere que cada que se cambié la URL,
el componente Route se vuelva a renderizar y decida así según la URL qué
componente de debe mostrar */
import { useEffect, useState } from 'react';

const Route = ({ path, children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  // El state se inicializa con window.location.pathname

  /* Se requiere configurar el event Listener 1 sola vez para
  que empiece a escuchar el evento. Esto se hará cuando
  el componente se renderice en la pantalla por primera vez,
  por ello se agrega [] como segundo argumento del useEffect */
  useEffect(() => {
    const onLocationChange = () => {
      /* Cuando el evento ocurre, el estado se actualiza a lo que sea
       que haya en la barra de navegación */
      setCurrentPath(window.location.pathname);
    };

    /* Se escuchará un evento llamado popstate, y cada vez que éste
    ocurra, se ejcutará onLocationChange */
    window.addEventListener('popstate', onLocationChange);

    /* Nos queremos asegurar que si se deja de mostrar este componente
    en pantalla, se limpie el eventListener, por tanto se retornará un
    removeEventListener */
    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return currentPath === path
    ? children // True
    : null; // False
};

export default Route;
