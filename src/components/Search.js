import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  // Term se actualiza a medida que el usuario va escribiendo
  const [term, setTerm] = useState('programming');
  const [results, setResults] = useState([]);

  console.log('API Results', results);

  // Se ejecuta la primera vez que se renderiza el componente
  // y cuando Term cambia
  useEffect(() => {
    // Se crea una función search, porque no es posible que la función principal de useEffect sea async-await
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term,
        },
      });
      setResults(data.query.search);
    };
    if (term && !results.length) {
      // Si term es != '' && no se ha realizado una búsqueda antes
      // Para que realice una búsqueda inmediata cuando se carga por primera vez la página
      search();
    } else {
      // Para que realice la búsqueda 1s luego de que se termine de escribir
      const timeoutId = setTimeout(() => {
        if (term) {
          // Si term es diferente de '',
          // Se usa para que cuando se borre completamente la barra de busqueda no salga error
          search();
        }
      }, 1000); // 1 segundo

      return () => {
        clearTimeout(timeoutId); // Elimina el setTimeout
      };
    }
  }, [term]);

  const renderedResults = results.map((result) => {
    return (
      <div className='item' key={result.pageid}>
        <div className='right floated content'>
          <a
            className='ui button'
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className='content'>
          <div className='header'>{result.title}</div>
          {/* Se hace lo siguinete pues la API de Wikipedia, 
          devuelve los snippet con unos <span> embebidos */}
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
          {/* {result.snippet} */}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className='ui form'>
        <div className='field'>
          <label>Enter search text</label>
          <input
            className='input'
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className='ui celled list'>{renderedResults}</div>
    </div>
  );
};

export default Search;
