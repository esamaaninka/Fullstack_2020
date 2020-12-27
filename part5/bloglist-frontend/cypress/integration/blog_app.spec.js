


describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'Jape',
      name: 'Jaakko Blogaaja',
      password: 'salasana'
    }
    const user2 = {
      username: 'Jaska',
      name: 'Jaakko Blogisti',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)

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
        url: 'https://cypress.io',
        likes: 0
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

    it('a blog can be liked', function() {
      cy.contains('another blog created by cypress')
      cy.get('#like-button').click()

      cy.contains('1')

    })
    it('a biog can be removed by author only', function () {
      // Jape logged in and created blog. logout first and try to
      // remove as other user
      cy.contains('Logout').click()

      cy.get('#username').type('Jaska')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.get('#delete-button').click()

      cy.contains('another blog created by cypress')
      // how to get the error to UI? 
      //cy.get('.error').contains('Not allowed')

    })

    it('a blog can be removed by author', function() {

      cy.contains('another blog created by cypress')
      cy.get('#delete-button').click()

      cy.get('html').should('not.contain', 'another blog created by cypress')
    })

    it('blogs arranged in popularity order', function() {
      // create first some blogs
      cy.createBlog({
        title: 'a blog created by cypress',
        author: 'Cypress',
        url: 'https://cypress.io',
        likes: 10
      })

      cy.createBlog({
        title: 'third blog created by cypress',
        author: 'Cypress',
        url: 'https://cypress.io',
        likes: 5
      })
      
      
      cy.contains('another blog created by cypress')
      cy.contains('third blog created by cypress')
      
      // check the order is correct
      cy.get('.blogList').then(blogs => {
        cy.wrap(blogs[0]).contains(10)
        cy.wrap(blogs[1]).contains(5)
        cy.wrap(blogs[2]).contains(0)
      })

    }) 
  })
})