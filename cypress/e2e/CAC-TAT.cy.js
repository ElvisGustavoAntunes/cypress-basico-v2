/// <reference types="Cypress" />

describe('Central de Atendimento TAT', function () {
  const three_segunds_in_ms = 3000;
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('./src/index.html');
  })

  it('verifica o título da aplicação', function () {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
  })

  it('preenche os campos obrigatórios e envia o formulário', function () {

    cy.clock()

    cy.get('#firstName').type('Gustavo')
    cy.get('#lastName').type('Antunes')
    cy.get('#email').type('elvisgustavoantunes@gmail.com')
    cy.get('#open-text-area').type('Estou tentando aprender a utilizar o Cypress',)
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
    cy.tick(three_segunds_in_ms)
    cy.get('.success').should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.get('#firstName').type('Gustavo', { delay: 0 })
    cy.get('#lastName').type('Antunes', { delay: 0 })
    cy.get('#email').type('elvisgmail.com', { delay: 0 })
    cy.get('#open-text-area').type('Estou tentando aprender a utilizar o Cypress', { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('Valida campo telefone vazio', function () {
    cy.get('#phone').type('guasfd', { delay: 0 }).should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('#firstName').type('Gustavo', { delay: 0 })
    cy.get('#lastName').type('Antunes', { delay: 0 })
    cy.get('#email').type('elvisgustavoantunes@gmail.com', { delay: 0 })
    cy.get('#phone-checkbox').check()
      .should('be.checked')
    cy.get('#open-text-area').type('Estou tentando aprender a utilizar o Cypress', { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })


  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName').type('Gustavo', { delay: 0 }).should('have.value', 'Gustavo').clear().should('have.value', '')
    cy.get('#lastName').type('Antunes', { delay: 0 }).should('have.value', 'Antunes').clear().should('have.value', '')
    cy.get('#email').type('elvisgustavoantunes@gmail.com', { delay: 0 }).should('have.value', 'elvisgustavoantunes@gmail.com').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {

    cy.clock()

    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(three_segunds_in_ms)
    cy.get('.error').should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function () {
    cy.fillMandatoryFieldsAndSubmit()
  })

  it('seleciona um produto (YouTube) por seu texto', function () {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function () {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function () {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type = "checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function ($input) {
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function ($input) {
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function ($input) {
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing').should('be.visible')
  });
  
  it.only('Encontra o gato escondido', () => {
    cy.get('#cat').invoke('show').should('be.visible')
  });
})