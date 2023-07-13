describe('single movie page', () => {

  const stubSingleFetch = (id, status, response) => {
    cy.intercept('GET', `https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`, {
      statusCode: status, 
      body: response
    })
  }

  let blackAdam;
  let riseOfDamned;

  const blackAdamVideos = {
    "videos": [
    {
    "id": 1,
    "movie_id": 436270,
    "key": "I9B6rwW35GQ",
    "site": "YouTube",
    "type": "Featurette"
    },
    {
    "id": 2,
    "movie_id": 436270,
    "key": "b1pMQasDnhM",
    "site": "YouTube",
    "type": "Clip"
    },
    {
    "id": 3,
    "movie_id": 436270,
    "key": "F_pYZ2HEW3E",
    "site": "YouTube",
    "type": "Featurette"
    },
    {
    "id": 4,
    "movie_id": 436270,
    "key": "0RnGge4t_ZU",
    "site": "YouTube",
    "type": "Behind the Scenes"
    },
    {
    "id": 5,
    "movie_id": 436270,
    "key": "wajuHqcA_Rg",
    "site": "YouTube",
    "type": "Featurette"
    },
    {
    "id": 6,
    "movie_id": 436270,
    "key": "NtHe_10HpSk",
    "site": "YouTube",
    "type": "Featurette"
    },
    {
    "id": 7,
    "movie_id": 436270,
    "key": "NnjCUbIfKoM",
    "site": "YouTube",
    "type": "Featurette"
    },
    {
    "id": 8,
    "movie_id": 436270,
    "key": "L1D0I_Q93UY",
    "site": "YouTube",
    "type": "Featurette"
    },
    {
    "id": 9,
    "movie_id": 436270,
    "key": "3-mscP3eIts",
    "site": "YouTube",
    "type": "Behind the Scenes"
    },
    {
    "id": 10,
    "movie_id": 436270,
    "key": "TjhoHrYX4NY",
    "site": "YouTube",
    "type": "Featurette"
    },
    {
    "id": 11,
    "movie_id": 436270,
    "key": "DoQBBTdCNQE",
    "site": "YouTube",
    "type": "Featurette"
    },
    {
    "id": 12,
    "movie_id": 436270,
    "key": "PAe6E8msc_Y",
    "site": "YouTube",
    "type": "Teaser"
    },
    {
    "id": 13,
    "movie_id": 436270,
    "key": "2RV5D0xK-9I",
    "site": "YouTube",
    "type": "Teaser"
    },
    {
    "id": 14,
    "movie_id": 436270,
    "key": "YQweXN2fBz4",
    "site": "YouTube",
    "type": "Teaser"
    },
    {
    "id": 15,
    "movie_id": 436270,
    "key": "mkomfZHG5q4",
    "site": "YouTube",
    "type": "Trailer"
    },
    {
    "id": 16,
    "movie_id": 436270,
    "key": "DvCFc5JtkkA",
    "site": "YouTube",
    "type": "Trailer"
    },
    {
    "id": 17,
    "movie_id": 436270,
    "key": "N73oTiIIJe0",
    "site": "YouTube",
    "type": "Teaser"
    },
    {
    "id": 21,
    "movie_id": 436270,
    "key": "JaV7mmc9HGw",
    "site": "YouTube",
    "type": "Trailer"
    }
    ]
    }

  const riseOfDamnedVideos = {
    "videos": [
    {
    "id": 37,
    "movie_id": 1013860,
    "key": "gtM9lv0clGc",
    "site": "YouTube",
    "type": "Clip"
    },
    {
    "id": 39,
    "movie_id": 1013860,
    "key": "L_REOJnLLNI",
    "site": "YouTube",
    "type": "Trailer"
    }
    ]
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
    stubSingleFetch('436270/videos', 200, blackAdamVideos)
    cy.get('.cover-container').first().find('.movie-cover[alt="Black Adam"]').click()
      .url().should('eq', 'http://localhost:3000/436270')
      .get('.movie-detail-container').children().should('have.length', 2)
      .get('.movie-detail-container').find('.movie-cover[alt="Black Adam"]')
      .get('.details').children().should('have.length', 9)
      .get('.details').contains('h1', 'Black Adam')
      .get('.details').contains('p', 'Budget: 200000000')
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
      .get('main').contains('h1', 'HTTP Error: 500 -- Please try again')
  })

  it('should display a 404 error', () => {
    stubSingleFetch(436270, 404, blackAdam)
    stubSingleFetch('436270/videos', 404, blackAdamVideos)
    cy.get('.cover-container').first().find('.movie-cover[alt="Black Adam"]').click()
      .url().should('eq', 'http://localhost:3000/436270')
      .get('.title-container').find('.main-title')
      .get('main').contains('h1', 'HTTP Error: 404 -- Please try again')
  })
})