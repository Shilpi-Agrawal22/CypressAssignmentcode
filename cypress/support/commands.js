
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add("text", { prevSubject: "element" }, subject => {
    return cy.wrap(subject, { log: false }).then($el => {
      var text = $el.get(0).text();
  
      Cypress.log({
        name: "text",
        message: "",
        consoleProps() {
          return {
            yielded: text,
          };
        },
      });
  
      return text;
    });
  });
  Cypress.Commands.add('textVerificationOnElement', (element, expectedText) => 
  { 
    const elementText= element.text()
    cy.log(elementText)
    //expect(elementText).to.include(expectedText)
    expect(elementText.includes(expectedText)).to.be.true
    //expect($element).to.have.text(expectedText)
  });
  
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
