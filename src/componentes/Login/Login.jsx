import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

function Login() {
  //Aquí cogemos la función de login que nos provee el authcontext
  const { toogleLogin } = useContext(AuthContext);

  //Declaramos estas variables que nos servirán para el login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); //Esto para tener una manera de poner el error sin necesidad de hacer el document.getElementById etc

  const handleLogin = (e) => {
    e.preventDefault(); //Evitamos que el formulario se envíe
    if (username === 'gabi' && password === '1234') {
      toogleLogin(true); //Le dejamos entrar
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
