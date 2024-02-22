/// <reference types="cypress" />
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    //  afterEach(() => {
    //    cy.screenshot()
    // });

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('natali.teste@teste.com.br')
        cy.get('#password').type('teste@1234')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, natali.teste (não é natali.teste? Sair)')

    })

    it('Deve exibir uma mensagem de erro ao inserir o usuário invalido', () => {
        cy.get('#username').type('natali@teste.com.br')
        cy.get('#password').type('teste@1234')
        cy.get('.woocommerce-form > .button').click()
        //cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido.')
        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve exibir uma mensagem de erro ao inserir uma senha invalida', () => {
        cy.get('#username').type('natali.teste@teste.com.br')
        cy.get('#password').type('teste@124')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Erro: A senha fornecida para o e-mail natali.teste@teste.com.br está incorreta. Perdeu a senha?')
        cy.get('.woocommerce-error').should('exist')
    });
    it('Deve fazer logincom sucesso - Usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, natali.teste (não é natali.teste? Sair)')
    });
    it('Deve fazer logincom sucesso - Usando Fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, { log: false })
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, natali.teste (não é natali.teste? Sair)')

        })

    });
    it.only('Deve fazer login com sucesso - Usando Comandos Customizados', () => {
        cy.login('natali.teste@teste.com.br', 'teste@1234')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, natali.teste (não é natali.teste? Sair)')

    });
})