import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import axios from 'axios';


const formSchema = yup.object().shape(
   {
      name: yup.string()
         .required('Name is Required'),
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

   //FUNCTIONS

   useEffect(() => {
      formSchema.isValid(formState)
        .then(valid => {
           setButtonState(!valid); // don't hardcode - base on value returned
      });
    }, [formState]);
   
   //VALIDATE=======================

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

   //SUBMIT=========================

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
   //INPUT==========================
   
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

   //DISPLAY JSON=====================
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
            {/* IMAGE HERE */}

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
                        type='radio' 
                        name='sauce' 
                        onChange={inputChange}  
                        value='redsauce' />
                </label>
                <label className="radio-label">
                   <div>Green Sauce</div>
                    <input 
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

         <div>
            <pre>{JSON.stringify(displayForms, null, 2)}</pre>
         </div>

      </div>
   )
}

export default Form;

const StyledForm = styled.form`

`;

const Checkboxes = styled.div`

`;