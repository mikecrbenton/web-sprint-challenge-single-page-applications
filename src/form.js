import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import axios from 'axios';


const formSchema = yup.object().shape(
   {
      name: yup.string()
         .required('Name is Required')
   }
)



function Form() {
   
   //STATE=========================

   //DEFAULT STATE
   const [formState, setFormState] = useState(
      {
         name: ""
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
   
      //NEED TO VALIDATE HERE

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
   
   return(
      <div>
         <StyledForm onSubmit={submitForm}>
            {/* IMAGE HERE */}

            <label htmlFor="name">
               Name
               <input
                  type='text'
                  name='name'
                  value={formState.name}
                  onChange={inputChange}
               />
            </label>

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