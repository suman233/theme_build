import './App.css';
import { useContext } from 'react';
import Header from './Component/Common/Header';
import Home from './Pages/Home';
import { ThemeContext } from './Component/Theme/Context';
import Register from './Pages/AuthPage/Register';


function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className={`App ${theme}`}>
        <Header />
        {/* <Home /> */}
        <Register/>
      </div>

    </>
  );
}

export default App;
