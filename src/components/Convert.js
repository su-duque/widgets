import React, { useState, useEffect } from 'react';
// axios se instala: npm install axios
import axios from 'axios';

// Recibirá el texto a traducir y el lenguaje al que se traducirá
const Convert = ({ language, text }) => {
  // Para almacenar el texto que se traduce:
  const [translated, setTranslated] = useState('');

  /* se crea debouncedText para no llamar la API cada que se oprima una
  tecla sino cuando se deje de escribir y hayan pasado 500ms. Cuando se
  carga el componente por 1ra vez, debouncedText es igual a text */
  const [debouncedText, setDebouncedText] = useState(text);

  /* El objetivo de este primer useEffect es crear un timer para actualizar
  debouncedText cada 500ms si no se ha actualizado text durante de ese
  tiempo y también tiene como objetivo retornar una función cleanup que
  cancela el timer si el usuario hizo una actualización del text*/
  // Se corre este hook cada que text cambia
  useEffect(() => {
    const timerId = setTimeout(() => {
      /*Se quiere correr esta arrow function cada que hayan pasado 500ms
      sin que se actualice text, por eso el segundo argumento de setTimeout
      es 500. Si pasan los 500ms exitosamente debouncedText será igual a text*/
      setDebouncedText(text);
    }, 500);

    /*Si text se actualiza antes de que hayan pasado los 500ms se desea
    cancelar el timer que se inició en setTimeout, por eso se retornará
    una cleanup function */
    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

  /*Cada que se tenga un nuevo texto (después de haber dejado de escribir
  durante 500ms), es decir, debouncedText se haya actualizado o haya
  un nuevo lenguaje, se correrá este segundo useEffect*/
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
            q: debouncedText,
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

    //console.log('New language or text');
  }, [language, debouncedText]);
  return (
    <div>
      <h1 className='ui header'>{translated}</h1>
    </div>
  );
};

export default Convert;
