import React from 'react';

const Link = ({ href, className, children }) => {
  const onClick = (event) => {
    // Helper function - Event handler
    //Para evitar que la página se recargue cada que se haga click en los links:
    event.preventDefault(); //Previene el comportamiento normal del navegador
    // Función del navegador para controlar la URL:
    window.history.pushState({}, '', href); // Se le pasa un objeto y string vacíos

    // Para decirle al componente Route que la URL cambió:
    // se emitirá un navEvent object
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <a onClick={onClick} href={href} className={className}>
      {children} {/* children es el texto del Header de cada pestaña */}
    </a>
  );
};

export default Link;
