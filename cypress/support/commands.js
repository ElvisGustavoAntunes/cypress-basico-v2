Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Gustavo', { delay: 0})
    cy.get('#lastName').type('Antunes', { delay: 0})
    cy.get('#email').type('elvisgustavoantunes@gmail.com', { delay: 0})
    cy.get('#open-text-area').type('Estou tentando aprender a utilizar o Cypress', { delay: 0})
    cy.contains('button','Enviar').click()
    cy.get('.success').should('be.visible')
})