beforeEach(() => {

})

describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    cy.get('a[href*="use-context"]').click()

    cy.url().should('include', '/use-context')

    cy.get('h1').contains('No tasks yet')
  })
})

describe('Input values', () => {
  it('.type() - type into a DOM element', () => {
    cy.visit('http://localhost:3000/use-context/new')
    cy.get('input[name="title"]')
      .type('Title of task').should('have.value', 'Title of task')

    cy.get('textarea[name="description"]')
      .type('Description of task').should('have.value', 'Description of task')

  })
})

describe('Create task', () => {
  it('.click() - submit a form', () => {

    cy.get('input[name="title"]')
      .type('Title of task created')

    cy.get('textarea[name="description"]')
      .type('Description of task')
  
    cy.get('form').submit()

    cy.get('h1').contains('Title of task created')

  })
})

describe('Delete task', () => {
  
  it('.click() - delete a task', () => {
    cy.visit('http://localhost:3000/use-context/new')

    cy.get('input[name="title"]')
      .type('Task to delete')

    cy.get('textarea[name="description"]')
      .type('Description of task to delete')

    cy.get('form').submit()
    
    cy.get('button').last().click()

    cy.get('h1').contains('No tasks yet')

  })
})