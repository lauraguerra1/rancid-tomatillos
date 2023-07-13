describe('single movie page', () => {

  const stubSingleFetch = (id, status, response) => {
    cy.intercept('GET', `https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`, {
      statusCode: status, 
      fixture: response
    })
  }

  let blackAdam;
  let riseOfDamned;
  let blackAdamVideos;
  let riseOfDamnedVideos;

  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 200,
      fixture: 'movies'
    })
    .visit('http://localhost:3000')

    blackAdam = './black-adam'
    blackAdamVideos = './black-adam-videos'
    riseOfDamned = './rise-of-damned'
    riseOfDamnedVideos = './rise-of-damned-videos'
  })

  it('should select a movie and see it\'s details and return home', () => {
    stubSingleFetch(436270, 200, blackAdam)
    stubSingleFetch('436270/videos', 200, blackAdamVideos)
    cy.get('.cover-container').first().find('.movie-cover[alt="Black Adam"]').click()
      .url().should('eq', 'http://localhost:3000/436270')
      .get('.movie-detail-container').children().should('have.length', 2)
      .get('.movie-detail-container').find('.movie-cover[alt="Black Adam"]')
      .get('.details').children().should('have.length', 9)
      .get('.details').contains('h1', 'Black Adam')
      .get('.details').contains('p', 'Budget: 200000000')
      .get('[data-cy="https://www.youtube.com/embed/mkomfZHG5q4"]').should('have.length', 1)
      .get('.exit-movie').find('.exit-movie-img').click()
      .url().should('eq', 'http://localhost:3000/')
      .get('.movie-container').find('.cover-container').should('have.length', 3)
  })

  it('should select a different movie and see it\'s details and return home', () => {
    stubSingleFetch(1013860, 200, riseOfDamned)
    stubSingleFetch('1013860/videos', 200, riseOfDamnedVideos)
    cy.get('.cover-container').next().find('.movie-cover[alt="R.I.P.D. 2: Rise of the Damned"]').click()
      .url().should('eq', 'http://localhost:3000/1013860')
      .get('.movie-detail-container').children().should('have.length', 2)
      .get('.movie-detail-container').find('.movie-cover[alt="R.I.P.D. 2: Rise of the Damned"]')
      .get('.details').children().should('have.length', 9)
      .get('.details').contains('h1', 'R.I.P.D. 2: Rise of the Damned')
      .get('.details').contains('p', 'Budget: 130')
      .get('[data-cy="https://www.youtube.com/embed/L_REOJnLLNI"]').should('have.length', 1)
      .get('.exit-movie').find('.exit-movie-img').click()
      .url().should('eq', 'http://localhost:3000/')
      .get('.movie-container').find('.cover-container').should('have.length', 3)
  })

  it('should display a 500 level error', () => {
    stubSingleFetch(436270, 500, blackAdam)
    stubSingleFetch('436270/videos', 500, blackAdamVideos)
    cy.get('.cover-container').first().find('.movie-cover[alt="Black Adam"]').click()
      .url().should('eq', 'http://localhost:3000/436270')
      .get('.title-container').find('.main-title')
      .get('h1').contains('HTTP Error: 500 -- Please try again')
  })

  it('should display a 404 error', () => {
    stubSingleFetch(436270, 404, blackAdam)
    stubSingleFetch('436270/videos', 404, blackAdamVideos)
    cy.get('.cover-container').first().find('.movie-cover[alt="Black Adam"]').click()
      .url().should('eq', 'http://localhost:3000/436270')
      .get('.title-container').find('.main-title')
      .get('h1').contains('HTTP Error: 404 -- Please try again')
  })
})