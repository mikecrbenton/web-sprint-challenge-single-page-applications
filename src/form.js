import React from 'react';
import styled from 'styled-components'


function Form() {
   
   
   
   return(
      <div>
         <StyledForm>
            {/* IMAGE HERE */}

            <label htmlFor="name">
               Name
               <input
                  type='text'
                  name='name'
                  value={}
               />
            </label>
         </StyledForm>
      </div>
   )
}

export default Form;

const StyledForm = styled.form`

`;