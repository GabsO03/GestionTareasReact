import React, { createContext, useState } from 'react';

export const AuthContext = createContext(); //Creo el contexto para el auth

export function AuthProvider({ children }) {
  //Inicializo la variable y el setter de loggeado que me servirá para el login
  const [loggeado, setLoggeado] = useState(() => localStorage.getItem('loggeado') === 'true');

  const toggleLogin = (loggear = false) => {//Controlo lo que hace la función según lo que introduzca ene l parámetro
    setLoggeado(loggear);

    //Dependiendo de lo que entre se logea o no
    if (loggear) {
      localStorage.setItem('loggeado', 'true');
    }
    else {
      localStorage.removeItem('loggeado');
    }
  }

  return (
    //Paso las funciones y la variable con el provider
    <AuthContext.Provider value={{ loggeado, toggleLogin }}> 
      {children}
    </AuthContext.Provider>
  );
}
