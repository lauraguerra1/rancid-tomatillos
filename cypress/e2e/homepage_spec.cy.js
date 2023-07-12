describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 200,
      fixture: 'movies'
    })
    .visit('http://localhost:3000')
  })

  it('should display a banner and movie list', () => {
    cy.url().should('eq', 'http://localhost:3000/')
      .get('.title-container').find('.main-title')
      .get('.movie-container').find('.cover-container').should('have.length', 3)
      .get('.cover-container').first().find('.movie-cover[alt="Black Adam"]')
      .get('.cover-container').first().contains('p', '🍅 4.00')
      .get('.cover-container').last().find('.movie-cover[alt="R.I.P.D. 2: Rise of the Damned"]')
      .get('.cover-container').last().contains('p', '🍅 7.00')
  })

  it('should display a 500 level error', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 500})
    .get('.title-container').find('.main-title')
    .get('main').contains('h1', 'HTTP Error: 500 -- Please try again')
  })
  
  it('should display a 404 error', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 404}) 
    .get('.title-container').find('.main-title')
    .get('main').contains('h1', 'HTTP Error: 404 -- Please try again')
  })
})