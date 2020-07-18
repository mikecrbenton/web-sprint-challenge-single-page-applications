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
        .clear()
      cy.contains("Name is Required")
         .type("d")
      cy.contains("Need at least 2 Characters")    
   })

   // SELECT-DROPDOWN
   it("Tests the Select Box", ()=> {
      cy.get('select')
         .select('ten')
         .should('have.value', 'ten')
   })

   // RADIOS
   it("Select Radios", () => {
      cy.get('#redsauce')
         .check()
      cy.get('#greensauce')
         .check()
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

   //TEXTAREA
   const someText = "When you deliver this pizza don't be scared by my lawn gnomes"

   it("Text Area Test", () => {
      cy.get('#extratext')
         .type(someText)
         .should("have.value",someText)
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