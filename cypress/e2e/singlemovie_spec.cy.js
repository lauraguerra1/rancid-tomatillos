describe('single movie page', () => {

  const stubSingleFetch = (id, status, response) => {
    cy.intercept('GET', `https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`, {
      statusCode: status, 
      body: response
    })
  }

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

  it('should select a movie', () => {
    const blackAdam = {
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
    stubSingleFetch(436270, 200, blackAdam)
    cy.get('.cover-container').first().find('.movie-cover[alt="Black Adam"]').click()
      .get('.movie-detail-container').children().should('have.length', 2)
      .get('.movie-detail-container').find('.movie-cover[alt="Black Adam"]')
      .get('.details').children().should('have.length', 9)
      .get('.details').contains('h1', 'Black Adam')
      .get('.details').contains('p', 'Released: 2022-10-19')
      .get('.exit-movie').find('.exit-movie-img')
  })
})