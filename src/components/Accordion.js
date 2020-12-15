import React, { useState } from 'react';

const Accordion = ({ items }) => {
  // Se hace un Array Destructuring:
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    console.log('Title Clicked', index);
    setActiveIndex(index);
  };

  const renderedItems = items.map((item, index) => {
    // Para desplegar el acordeon, se necesita la palabra active en la clase
    // y debe estar 'active' cuando el index coincida con el valor del estado
    const active = index === activeIndex ? 'active' : '';

    return (
      <React.Fragment key={item.title}>
        {/* El title es único, por eso se puede poner como una key */}
        <div
          className={`title ${active}`}
          onClick={() => onTitleClick(index)}
          // se encierra en un Arrow Function para que no se ejecute cuando se
          // renderice la lista, sino cuando se le dé click a los items
        >
          <i className='dropdown icon'></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });

  return (
    <div className='ui styled accordion'>
      {renderedItems}
      {/* <h1>{activeIndex}</h1> */}
    </div>
  );
};

export default Accordion;
