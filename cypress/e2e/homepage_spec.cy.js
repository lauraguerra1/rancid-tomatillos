describe('Home page view', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 200,
      fixture: 'movies'
    })
    .visit('http://localhost:3000')
  })

  it('should display a banner, a search form, and movie list', () => {
    cy.url().should('eq', 'http://localhost:3000/')
      .get('.title-container').find('.main-title')
      .get('.search-container').find('input[placeholder="search movie title"]')
      .get('.search-container').find('.search-rating')
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

  it('should search for a movie title', () => {
    cy.get('.search-container').find('input').type('black')
      .get('.movie-container').find('.cover-container').should('have.length', 1)
      .get('.cover-container').first().find('.movie-cover[alt="Black Adam"]')
      .get('.cover-container').first().contains('p', '🍅 4.00')
  })

  it('should display a message and image if the search is not found', () => {
    cy.get('.search-container').find('input').type('some movie')
      .get('.movie-container').find('.cover-container').should('have.length', 0)
      .get('.movie-container').contains('Sorry, no movies to display! Try a different search')
      .get('.empty-state[alt="spilled popcorn"]')
  })

  it('should filter ratings', () => {
    cy.get('.search-container').find('select').select('🍅 4-6')
      .get('.movie-container').find('.cover-container').should('have.length', 2)
      .get('.cover-container').first().find('.movie-cover[alt="Black Adam"]')
      .get('.cover-container').first().contains('p', '🍅 4.00')
      .get('.cover-container').last().find('.movie-cover[alt="The Woman King"]')
      .get('.cover-container').last().contains('p', '🍅 4.00')

  })

  it('should clear all filter results', () => {
    cy.get('.search-container').find('input[placeholder="search movie title"]').type('woman')
      .get('.search-container').find('.search-rating').select('🍅 4-6')
      .get('.search-container').find('#clear-search-btn').click()
      .get('.movie-container').find('.cover-container').should('have.length', 3)
      .get('.search-container').find('input').should('have.value', '')
      .get('.search-container').find('.search-rating').should('have.value', '["0","10"]')
  })

  it('should be able to search based off remaining movies from filter', () => {
    cy.get('.search-container').find('.search-rating').select('🍅 4-6')
      .get('.search-container').find('input[placeholder="search movie title"]').type('woman')
      .get('.movie-container').find('.cover-container').should('have.length', 1)
      .get('.cover-container').first().find('.movie-cover[alt="The Woman King"]')
      .get('.cover-container').first().contains('p', '🍅 4.00')
  })

  it('should be able to filter based off remaining movies from search', () => {
    cy.get('.search-container').find('input[placeholder="search movie title"]').type('the')
      .get('.search-container').find('.search-rating').select('🍅 6-8')
      .get('.movie-container').find('.cover-container').should('have.length', 1)
      .get('.cover-container').first().find('.movie-cover[alt="R.I.P.D. 2: Rise of the Damned"]')
      .get('.cover-container').first().contains('p', '🍅 7.00') 
  })

  it('should display a messge and image for bad URL\'s and allow page exit', () => {
    cy.visit('http://localhost:3000/potatoes')
      .get('p').contains('We\'re sorry, this page does not exist! Please go back.')
      .get('.empty-state[alt="person sitting in movie theater seat while drinking a soda and spilling popcorn"]')
      .get('.exit-movie').find('.exit-movie-img').click()
      .url().should('eq', 'http://localhost:3000/')
  })
})