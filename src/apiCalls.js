const handleError = (response) => {
  if(response.ok) {
    return response.json()
  } else {
    throw new Error(`HTTP Error: ${response.status} -- Please try again`)
  }
} 

const getAllMovies = async () => {
  const response = await fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
  const data = await handleError(response)
  return data.movies
}

export {getAllMovies}