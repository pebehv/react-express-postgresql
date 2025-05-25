import React, { useState } from 'react';

const Contador = () => {
  // Declarar una variable de estado llamada "contador" y su función actualizadora "setContador"
  const [contador, setContador] = useState(0);

  return (
    <div>
      <h1>Contador: {contador}</h1>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
      <button onClick={() => setContador(contador - 1)}>Decrementar</button>
    </div>
  );
};

export default Contador;