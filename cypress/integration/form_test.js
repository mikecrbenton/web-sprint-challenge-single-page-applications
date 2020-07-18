describe("Form Input Testing", ()=> {

   beforeEach( ()=> {
      cy.visit("http://localhost:3000/form")
   })
  
   // NAME
   it("Finds the Name Input", ()=> {
      cy.get('[for="name"] > input')
        .type("Mike")
        .should("have.value", "Mike")
        .type(" Benton")
        .should("have.value", "Mike Benton")
        .clear();
      cy.contains("Name is Required") 
      
   })
   // SELECT-CHECKBOXES
   it("Select Boxes Test", () => {
      cy.get('#pepperoni')
         .check()
      cy.get('#cabbage')
         .check()
      cy.get('#olives')
         .check()
   })
  
   // SUBMIT BUTTON DISABLED AND FUNCTIONAL
   it("Submit Button", () => {
      // NAME FIELD NOT FILLED OUT
      cy.get('[data-cy=submitInput]')
         .should('be.disabled')
      // FORM FILLED OUT
      cy.get('[for="name"] > input')
         .type("Mike Benton")
      cy.get('select')
         .select('ten')
      cy.get('[data-cy=submitInput]')
         .should('not.be.disabled')
      cy.get('[data-cy=submitInput]')
         .click()
  
   })
   // SUBMIT THE FORM
   it("Submit Form", () => {
      cy.get('#pizza-form').submit()
   })
  
  
  
  })