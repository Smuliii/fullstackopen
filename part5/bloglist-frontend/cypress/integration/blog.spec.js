describe('Blog', () => {
  beforeEach(() => {
    cy.request('POST', Cypress.env('apiUrl') + '/testing/reset')
    cy.fixture('user').as('user').then(user => {
      cy.request('POST', Cypress.env('apiUrl') + '/users', user)
    })
  })

  describe('not logged in', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should show login form', () => {
      cy.get('.login-form').children('h2').contains('Login')
    })

    it('should login succesfully with correct credentials', () => {
      cy.get('@user').then(user => {
        cy.get('#username').type(user.username)
        cy.get('#password').type(user.password)
        cy.get('form').submit()
        cy.get('.user-profile').children('h2').contains(`Hello, ${user.name}`)
      })
    })

    it('should fail login with incorrect credentials', () => {
      cy.get('#username').type('foobar')
      cy.get('#password').type('foobar')
      cy.get('form').submit()
      cy.get('.notification.error').contains('invalid username or password')
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.get('@user').then(user => cy.login(user))
      cy.fixture('blogs').as('blogs').each(blog => cy.addBlog(blog))
      cy.visit('/')
    })

    it('should be able to add new blog', () => {
      cy.get('@blogs').then(blogs => {
        const blog = blogs[0]
        cy.contains('Add new blog').click()
        cy.get('#title').type(blog.title)
        cy.get('#author').type(blog.author)
        cy.get('#url').type(blog.url)
        cy.get('.blog-form').submit()
        cy.get('.notification').contains(`A new blog '${blog.title}' by John doe was added!`)
        cy.get('.blog-list').children(':last').contains(blog.title)
      })
    })

    it('should be able to like a blog', () => {
      cy.get('.blog:last').as('blogItem')
      cy.get('@blogItem').find('.togglable-show').click()
      cy.get('@blogItem').find('.blog-likes').contains('Likes 0')
      cy.get('@blogItem').find('.blog-like').click()
      cy.get('@blogItem').find('.blog-likes').contains('Likes 1')
    })

    it('should be able to delete a blog', () => {
      cy.server()
      cy.route('DELETE', '/api/blogs/**').as('deleteBlog')
      cy.get('.blog:last').as('blogItem')
      cy.get('@blogItem').find('.togglable-show').click()
      cy.get('@blogItem').find('.blog-delete').click()
      cy.wait('@deleteBlog')
      cy.get('.blog').should('have.length', 2)
    })

    it('should have blogs ordered by likes', () => {
      cy.get('.blog-like-count').then($likes => {
        const likes = [...$likes].map(like => like.innerHTML)
        const sortedLikes = [...likes].sort((a, b) => b - a)
        expect(likes).to.deep.equal(sortedLikes)
      })
    })
  })
})
