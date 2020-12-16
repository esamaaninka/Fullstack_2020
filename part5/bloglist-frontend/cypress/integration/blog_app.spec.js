


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
})