describe('single movie page', () => {

  const stubSingleFetch = (id, status, response) => {
    cy.intercept('GET', `https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`, {
      statusCode: status, 
      body: response
    })
  }

  let blackAdam;
  let riseOfDamned;

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

    blackAdam = {
      "movie": {
      "id": 436270,
      "title": "Black Adam",
      "poster_path": "https://image.tmdb.org/t/p/original//pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
      "backdrop_path": "https://image.tmdb.org/t/p/original//bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
      "release_date": "2022-10-19",
      "overview": "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
      "genres": [
      "Action",
      "Fantasy",
      "Science Fiction"
      ],
      "budget": 200000000,
      "revenue": 384571691,
      "runtime": 125,
      "tagline": "The world needed a hero. It got Black Adam.",
      "average_rating": 4
      }
    }

    riseOfDamned = {
      "movie": {
      "id": 1013860,
      "title": "R.I.P.D. 2: Rise of the Damned",
      "poster_path": "https://image.tmdb.org/t/p/original//g4yJTzMtOBUTAR2Qnmj8TYIcFVq.jpg",
      "backdrop_path": "https://image.tmdb.org/t/p/original//kmzppWh7ljL6K9fXW72bPN3gKwu.jpg",
      "release_date": "2022-11-15",
      "overview": "When Sheriff Roy Pulsipher finds himself in the afterlife, he joins a special police force and returns to Earth to save humanity from the undead.",
      "genres": [
      "Fantasy",
      "Action",
      "Comedy",
      "Crime"
      ],
      "budget": 130,
      "revenue": 78324220,
      "runtime": 102,
      "tagline": "Meet the new law of the Afterlife.",
      "average_rating": 7
      }
    }
  })

  it('should select a movie and see it\'s details and return home', () => {
    stubSingleFetch(436270, 200, blackAdam)
    cy.get('.cover-container').first().find('.movie-cover[alt="Black Adam"]').click()
      .get('.movie-detail-container').children().should('have.length', 2)
      .get('.movie-detail-container').find('.movie-cover[alt="Black Adam"]')
      .get('.details').children().should('have.length', 9)
      .get('.details').contains('h1', 'Black Adam')
      .get('.details').contains('p', 'Budget: 200000000')
      .get('.exit-movie').find('.exit-movie-img').click()
      .get('.movie-container').find('.cover-container').should('have.length', 3)
  })

  it('should select a different movie and see it\'s details and return home', () => {
    stubSingleFetch(1013860, 200, riseOfDamned)
    cy.get('.cover-container').next().find('.movie-cover[alt="R.I.P.D. 2: Rise of the Damned"]').click()
      .get('.movie-detail-container').children().should('have.length', 2)
      .get('.movie-detail-container').find('.movie-cover[alt="R.I.P.D. 2: Rise of the Damned"]')
      .get('.details').children().should('have.length', 9)
      .get('.details').contains('h1', 'R.I.P.D. 2: Rise of the Damned')
      .get('.details').contains('p', 'Budget: 130')
      .get('.exit-movie').find('.exit-movie-img').click()
      .get('.movie-container').find('.cover-container').should('have.length', 3)
  })

  it('should display a 500 level error', () => {
    stubSingleFetch(436270, 500, blackAdam)
    cy.get('.cover-container').first().find('.movie-cover[alt="Black Adam"]').click()
      .get('.title-container').find('.main-title')
      .get('main').contains('h1', 'HTTP Error: 500 -- Please try again')
      .get('.movie-container').find('.cover-container').should('have.length', 3)
  })

  it('should display a 404 error', () => {
    stubSingleFetch(436270, 404, blackAdam)
    cy.get('.cover-container').first().find('.movie-cover[alt="Black Adam"]').click()
      .get('.title-container').find('.main-title')
      .get('main').contains('h1', 'HTTP Error: 404 -- Please try again')
      .get('.movie-container').find('.cover-container').should('have.length', 3)
  })
})