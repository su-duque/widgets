import React, { useState, useEffect } from 'react';
// axios se instala: npm install axios
import axios from 'axios';

// Recibirá el texto a traducir y el lenguaje al que se traducirá
const Convert = ({ language, text }) => {
  // Para almacenar el texto que se traduce:
  const [translated, setTranslated] = useState('');

  // Cada que se tenga un nuevo texto o un nuevo lenguaje se correrá el useEffect
  useEffect(() => {
    // cuando se hace una request dentro de useEffect no se puede usar directamente la sintáxis de async-await
    // Se debe encerrar el request dentro de otra función o se debe utilizar una promesa
    // en este caso se usar una helper-function que se marcará como async

    const doTranslation = async () => {
      // response = {data} - Se hace una destructuración
      // ese data es una respuesta de axios, pero la API de Google está respondiendo con otro objeto data
      const { data } = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {}, // No se inviará información en el body del request, por eso se deja vacío
        {
          // los parámetros se pasan como query parameters:
          params: {
            q: text,
            target: language.value, //language es un objeto con label y value
            key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM', //esta API es paga pero esta key es free
          },
        }
      );

      //Se tienen dos data, uno es de la respuesta de axios y el otro de la respues de la API
      setTranslated(data.data.translations[0].translatedText);
    };

    // Se llamará esta función cada que el componente se monta por primera vez
    // cada que cambie text o cada que cambie language
    doTranslation();

    console.log('New language or text');
  }, [language, text]);
  return (
    <div>
      <h1 className='ui header'>{translated}</h1>
    </div>
  );
};

export default Convert;
