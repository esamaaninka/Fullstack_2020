


describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'Jape',
      name: 'Jaakko Blogaaja',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form opens by default', () => {
    //cy.visit('http://localhost:3000')
    cy.contains('Log in to the application')
    cy.contains('login')
  })


  describe('Login', function() {
    it('user can login success', function() {
      cy.contains('login').click()
      cy.get('#username').type('Jape')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Jaakko Blogaaja is logged in')
    })
    it('user login fails with wrong credentials', function(){
      cy.contains('login').click()
      cy.get('#username').type('Jape')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.error').contains('Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Jaakko Blogaaja is logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Jape', password: 'salasana' })
      cy.createBlog({
        title: 'another blog created by cypress',
        author: 'Cypress',
        url: 'https://cypress.io'
      })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Jape Blogaaja')
      cy.get('#url').type('https://www.blogs.com')
      cy.get('#create-button').click()

      cy.contains('a blog created by cypress')
    })
  })
})