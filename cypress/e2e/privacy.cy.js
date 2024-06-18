/// <reference types="Cypress" />

//const cypress = require("cypress");


Cypress._.times(3, function(){
    it.only('testa a página da política de privacidade de forma independente', () => {
    
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    });
})
