import React from "react";
import { Link, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Form from './form';
import Home from './home';

const App = () => {
  return (
    <div>

      <Navbar>
         <nav>
            <h1>Pizza World</h1>
            <div>
               <Link to="/">Home</Link>
               <Link to="/form">Form</Link>
            </div>
         </nav>
      </Navbar>

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

const Navbar = styled.div`
   border: solid 6px #B22222;

   nav{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 2em;

      h1{
         font-size: 2.5rem;
         margin: .5em 0;
         text-shadow: 3px 3px 3px #909090;
      }
      a{
         padding: 0 .5em;
         text-decoration: none;
         color: black;
         font-weight: 700;
         font-size: 1.2rem;
      }
   }

`