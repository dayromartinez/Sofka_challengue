import React from "react";
import InitialPage from './components/initialPage/initialPage.js';
import Home from './components/home/home.js';
import CreateChallengue from './components/createChallengue/createChallengue.js';
import DetailsUser from './components/detailsUser/detailsUser.js'
import { Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>

      <Route path="/landingPage">
        <InitialPage />
      </Route>

      <Route path="/sofka_challengue/home">
        <Home />
      </Route>

      <Route path="/sofka_challengue/detalles_usuario" >
        <DetailsUser />
      </Route>

      <Route path="/sofka_challengue/crear_cuestionario">
        <CreateChallengue />
      </Route>

    </div>
  );
}

export default App;
