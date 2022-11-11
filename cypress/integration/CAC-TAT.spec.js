//Aula 1 e 2-----------------------------------------------


///<reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('Verificar o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    //Exercício 1

    it('Preencher Campos Obrigatórios e Envie o Formulário', function() {
        cy.get('#firstName').type('Luiz Gustavo')
        cy.get('#lastName').type('Florindo')
        cy.get('#email').type('luizgustavoflorindo@gmail.com')
        cy.get('#phone').type('5511990025087')
        cy.get('#support-type > :nth-child(3)').click()
        cy.get('#check > [for="email"]').click()
        cy.get('#open-text-area').type('Mussum Ipsum, cacilds vidis litro abertis.', {delay: 0})

        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })

    //Exercício 2

    it('Preencher Campos Obrigatórios e Envie o Formulário', function() {
        cy.get('#firstName').type('Luiz Gustavo')
        cy.get('#lastName').type('Florindo')
        cy.get('#email').type('luizgustavoflorindo@gmail,com')
        cy.get('#phone').type('5511990025087')
        cy.get('#support-type > :nth-child(3)').click()
        cy.get('#check > [for="email"]').click()
        cy.get('#open-text-area').type('Mussum Ipsum, cacilds vidis litro abertis.', {delay: 0})

        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    //Exercício 3

    it('Campo telefone contunua vazio quando preenchido com valor não-númerico', function(){
        cy.get('#phone').type('abcdefgh').should('have.value', '')
    })

    //Exercício 4

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Luiz Gustavo')
        cy.get('#lastName').type('Florindo')
        cy.get('#email').type('luizgustavoflorindo@gmail.com')
        cy.get('#phone')
        cy.get('#support-type > :nth-child(3)').click()
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Mussum Ipsum, cacilds vidis litro abertis.', {delay: 0})

        cy.get('.button').click()
        cy.get('.error').should('be.visible')

    })

    //Exercício 5

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
       cy.get('#firstName').type('Luiz').should('have.value', 'Luiz')
       .clear().should('have.value', '')
        
    })

    //Exercício 6

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    //Exercício 7

    it('Envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

     //Exercício 8

     it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Luiz Gustavo')
        cy.get('#lastName').type('Florindo')
        cy.get('#email').type('luizgustavoflorindo@gmail.com')
        cy.get('#phone')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Mussum Ipsum, cacilds vidis litro abertis.')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

     })

     //Aula 3-----------------------------------

     //Exercício 1

     it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube')
        .should('have.value', 'youtube')
     })

     //Exercício 2

     it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria')
        .should('have.value', 'mentoria')
     })

     //Exercício 3

     it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product').select(1)
        .should('have.value', 'blog')
     })


     //Aula 4-----------------------------------

     //Exercício 1

     it('Marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.value', 'feedback')
     })

      //Exercício 2

      it('Marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]').should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked') 
        })
      })


      //Aula 5 -----------------------------------

      //Exercício 1

      it('Marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]').check().should('be.checked')
        .last().uncheck().should('not.be.checked')
      })

      //Aula 6 -----------------------------------

      //Exercício

      it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('#file-upload').should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            //console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
      })

      //Exercício Extra 1

      it('seleciona um arquivo simulando um drag-and-drop - arrastando arquivo', function() {
        cy.get('#file-upload').should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
            //console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
      })

      //Exercício Extra 2

      it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
        .selectFile('@sampleFile')
        .should(function($input) {
            //console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
      })


      //Aula 6 -----------------------------------

      //Exercício

      it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target' , '_blank')
      })

      //Exercício Extra 1

      it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
      })

 
      
  })