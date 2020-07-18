import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import axios from 'axios';
import pizzaImage from './ivan-torres-MQUqbmszGGM-unsplash.jpg'

// YUP FORM SCHEMA - ONLY INCLUDES VALIDATION VALUES
const formSchema = yup.object().shape(
   {
      name: yup.string()
         .required('Name is Required')
         .min( 2, "Need at least 2 Characters"),
      size: yup.string()
         .required("Size is Required"),
      sauce: yup.string(),
      pepperoni: yup.boolean(),
      olives: yup.boolean(),
      peppers: yup.boolean(),
      cabbage: yup.boolean(),
      extratext: yup.string() 
   }
)


function Form() {
   
   //STATE=========================

   //DEFAULT STATE
   const [formState, setFormState] = useState(
      {
         name: "",
         size: "",
         sauce: "redsauce",
         pepperoni: false,
         olives: false,
         peppers: false,
         cabbage: false, 
         extratext: "",
      }
   )
   //ERROR STATE
   const [errorState, setErrorState] = useState(
      {
         name: "",
         pepperoni: "",
         olives: "",
         peppers: "",
         cabbage: ""
      }
   )
   //STATE FOR BUTTON AND JSON FORM RETURN
   const [displayForms, setDisplayForms] = useState([]);
   const [buttonState, setButtonState] = useState(true);

   //FUNCTIONS========================

   useEffect(() => {
      formSchema.isValid(formState)
        .then(valid => {
           setButtonState(!valid); // don't hardcode - base on value returned
      });
    }, [formState]);
   
   //VALIDATE
   const validate = (e) => {
      // CHECK IF IT IS A CHECKBOX INPUT OR NOT
      let value = ( e.target.type === 'checkbox' 
                     ? e.target.checked 
                     : e.target.value );
      
      yup.reach( formSchema, e.target.name )
         .validate(value)
            .then( (validation) => {
               setErrorState({
                  ...errorState,
                  [e.target.name]: "" 
               })
            })
            .catch( (error) => {
               setErrorState({
                  ...errorState,
                  [e.target.name]: error.errors[0]
               })
            })
   }

   //SUBMIT
   const submitForm = (e) => {
      //NEED TO PREVER RELOADING
      e.preventDefault();
      // POST
      axios.post( "https://reqres.in/api/users", formState )
      .then( (response) => {
         console.log("RESPONSE FROM API: ",response)
         addNewForm(response.data);
         //JSON CODE HERE ----->
      })
      .catch( error => console.log(error));
   }

   //INPUT
   const inputChange = (e) => {
      // NEEDED IN REACT TO KEEP THE SYNTHETIC EVENT FOR ASYNC EVENTS
      e.persist();
   
      //CALL VALIDATION
      validate(e);

      // CHECK IF IT IS A CHECKBOX INPUT OR NOT
      let value = ( e.target.type === 'checkbox' 
                     ? e.target.checked 
                     : e.target.value );
      //SET STATE OF THE FORM
      setFormState( {
         ...formState,
         [e.target.name] : value
      });
   }

   //DISPLAY JSON
   const addNewForm = ( newForm ) => {
      setDisplayForms( [...displayForms, newForm] )
   }

   // YUP INLINE STYLES
   let yupStyling = {
      color: 'red',
      fontSize: '.8rem'
   }
   
   return(

      <div>
         <StyledForm id="pizza-form" onSubmit={submitForm}>
            
            <PictureDiv>
               <img src={pizzaImage}/>
            </PictureDiv>

            {/* ----------- NAME -------------- */}
            <label htmlFor="name">
               Name
               <input
                  type='text'
                  name='name'
                  value={formState.name}
                  onChange={inputChange}
               />
                 { ( errorState.name.length > 0 ) 
                     ? <p style={yupStyling}>{errorState.name}</p> 
                     : null }
            </label>

            {/* ----------- SELECT -------------- */}
            <label htmlFor="size">
               Pick a Size
               <select name="size" onChange={inputChange}>
                  <option value="ten">10"</option>
                  <option value="fourteen">14"</option>
                  <option value="eighteen">18"</option>
                  <option value="death">Death By A Circle</option>
               </select>
            </label>

             {/* ---------RADIO BUTTONS-------------- */}
             <label>Pick A Sauce</label>
            <fieldset>
                <label className="radio-label">
                   <div>Red Sauce</div>
                    <input  
                        id="redsauce"
                        type='radio' 
                        name='sauce' 
                        onChange={inputChange}  
                        value='redsauce' />
                </label>
                <label className="radio-label">
                   <div>Green Sauce</div>
                    <input 
                        id="greensauce"
                        type='radio'   
                        name='sauce'   
                        onChange={inputChange}  
                        value='greensauce' />
                </label>
                <label className="radio-label">
                   <div>Blue Sauce</div>
                    <input 
                        type='radio' 
                        name='sauce' 
                        onChange={inputChange} 
                        value='bluesauce' />
                </label>
                <label className="radio-label">
                <div>Mystery Sauce</div>
                    <input 
                        type='radio' 
                        name='sauce' 
                        onChange={inputChange}  
                        value='mysterysauce' />
                </label>
            </fieldset>

             {/* -----------CHECKBOXES-------------- */}
             <label>These are the available toppings:</label>
            <Checkboxes>
              
               <div className="checkboxDiv">          
                  <input
                     type="checkbox"  id="pepperoni" 
                     name="pepperoni"
                     checked={formState.pepperoni}
                     onChange={inputChange} />               
                  <label htmlFor="pepperoni">Pepperoni</label>
               </div>

               <div className="checkboxDiv">          
                  <input
                     type="checkbox"  id="olives" 
                     name="olives"
                     checked={formState.olives}
                     onChange={inputChange} />               
                  <label htmlFor="olives">Olives</label>
               </div>

               <div className="checkboxDiv">          
                  <input
                     type="checkbox"  id="peppers" 
                     name="peppers"
                     checked={formState.peppers}
                     onChange={inputChange} />               
                  <label htmlFor="peppers">Peppers</label>
               </div>

               <div className="checkboxDiv">          
                  <input
                     type="checkbox"  id="cabbage" 
                     name="cabbage"
                     checked={formState.cabbage}
                     onChange={inputChange} />               
                  <label htmlFor="cabbage">Cabbage</label>
               </div>
            </Checkboxes>

            {/* -----------TEXTAREA-------------- */}
            <label htmlFor="extratext">
               Special Instructions :
               <textarea
                  id="extratext" name="extratext"
                  value={formState.extratext}
                  onChange={inputChange} />
            </label>

            {/* -----------SUBMIT-------------- */}
            <button 
               data-cy="submitInput" 
               disabled={buttonState}>   
                  Submit
            </button>

         </StyledForm>

         <DisplayOrder>
            <pre>{JSON.stringify(displayForms, null, 2)}</pre>
         </DisplayOrder>

      </div>
   )
}

export default Form;

const PictureDiv = styled.div`
   img{
      max-width: 100%;
   }
`;

const StyledForm = styled.form`
   border: 8px solid #B22222;
   display: flex;
   flex-direction: column;
   width: 40%;
   margin: 1em auto;
   padding: .5em;

   label{
      margin: .5em ;
      display:flex;
      flex-direction: column;
      align-items: flex-start;
      font-weight: 700;
   }
   input{
      width: 75%;
      padding: .6em .3em;
      margin: .3em 0;
      border: 2px solid #B22222;
   }
   button{
      width: 25%;
      margin: 1em auto;
      padding: .3em;
      border: 2px solid #B22222;
   }
   select{
      width: 78%;
      padding: .6em .3em;
      margin: .3em 0;
      border: 2px solid #B22222;
      font-weight: 700;  
   }
   /*-----RADIO BUTTONS--------*/
   fieldset{
      border: 2px solid #B22222;
      width: 92%;
      margin: 8px;
      padding: .6em .3em;
   }
   .radio-label{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: left;

      div{
         width: 30%;
      }
      input{
         width: 10%;
         color: #B22222;
      }
   }

   textarea{
      border: 2px solid #B22222;
      width: 96%;
      height: 40px;
      margin: .3em 0;
      padding: .6em .3em;
      font-weight: 900;
      font-size: 1.2rem;
   }

   button{
      border: 4px solid #B22222;
      font-size: 1.3rem;
   }
`;

const Checkboxes = styled.div`
   display: flex;
   justify-content: space-around;
   flex-wrap: wrap;

   .checkboxDiv{
      display: flex;
      align-items: center;
      width: 35%;
      border: 2px solid #B22222;
      padding: 0 1em;
      margin: 5px .5em;

      input{
         width:25%;
      }
   }
`;

const DisplayOrder = styled.div`
   border: 3px solid #B22222;
   width: 30%;
   margin: 0 auto;

   pre{
      text-align: center;
   }
`;