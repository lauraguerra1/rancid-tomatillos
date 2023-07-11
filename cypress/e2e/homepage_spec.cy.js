describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 200,
      body: {
        "movies": [
          {
            "id": 436270,
            "poster_path": "https://image.tmdb.org/t/p/original//pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
            "backdrop_path": "https://image.tmdb.org/t/p/original//bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
            "title": "Black Adam",
            "average_rating": 4,
            "release_date": "2022-10-19"
          },
          {
            "id": 724495,
            "poster_path": "https://image.tmdb.org/t/p/original//438QXt1E3WJWb3PqNniK0tAE5c1.jpg",
            "backdrop_path": "https://image.tmdb.org/t/p/original//7zQJYV02yehWrQN6NjKsBorqUUS.jpg",
            "title": "The Woman King",
            "average_rating": 4,
            "release_date": "2022-09-15"
          },
          {
            "id": 1013860,
            "poster_path": "https://image.tmdb.org/t/p/original//g4yJTzMtOBUTAR2Qnmj8TYIcFVq.jpg",
            "backdrop_path": "https://image.tmdb.org/t/p/original//kmzppWh7ljL6K9fXW72bPN3gKwu.jpg",
            "title": "R.I.P.D. 2: Rise of the Damned",
            "average_rating": 7,
            "release_date": "2022-11-15"
          }
        ]
      }
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