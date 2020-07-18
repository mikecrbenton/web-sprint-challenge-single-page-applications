import React from "react";
import { Link, Route, Switch } from 'react-router-dom';
import Form from './form';
import Home from './home';

const App = () => {
  return (
    <div>
      <div>
         <h1>Pizza World</h1>
         <div>
            <Link to="/">Home</Link>
            <Link to="/form">Form</Link>
         </div>
      </div>

    <Switch>
       <Route path="/form">
         <Form/>
       </Route>
       <Route path="/">
         <Home/>
       </Route>
    </Switch>

   </div>
  );
};
export default App;
