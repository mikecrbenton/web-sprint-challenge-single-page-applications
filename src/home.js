import React from 'react';
import pizzaImage from './ivan-torres-MQUqbmszGGM-unsplash.jpg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


function Home() {
   return(
      <HomeWrapper>
         <div className="jumbotron-text">
            <h2>Pizza! Right?</h2>
            <Link to='/form'>Order Here</Link>
         </div>
      </HomeWrapper>
   )
}

export default Home;

const HomeWrapper = styled.div`
   background-image: url(${pizzaImage});
   width: 100%;
   background-size: cover;
   background-position: center;
   height: 100vh;
   /*FLEX*/
   display: flex;
   justify-content: center;
   align-items: center;

   .jumbotron-text{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h2{
         color: #fff;
         font-size: 5rem;
         background: rgba(0,0,0, .4);
         padding: .4em;
      }
      a{
         color:#fff;
         text-decoration: none;
         border: 3px solid white;
         padding: .5em 1em;
         font-weight: 700;
         font-size: 1.2rem;
         box-shadow: 0px 0px 5px black;
         background: rgba(0,0,0, .4);
         margin-bottom: 3em;
            &:hover {
               background: rgba(255,255,255, .2);
            }
            &:active{
               box-shadow: none;
      }
   }
`;