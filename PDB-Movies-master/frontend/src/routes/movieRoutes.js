import axios from "axios";

const movieApi = axios.create({
    baseURL: "http://localhost:5000/api/movies",
    withCredentials: true
  })

export async function getMovieById(movie_id){      
      let data = await movieApi.get('/getMovie/'+movie_id).then(({data}) => data);
      return data;
}

export async function getMovies(){
  let data = await movieApi.get('get_all').then(({data})=> data);
  return data;
}

export async function getGenres(){
  let data = await movieApi.get('genres/get_all').then(({data}) => data);
  return data;
}

export async function getMoviesByGenre(genre_id){
  let data = await movieApi.get('get_all/genres/'+genre_id).then(({data})=> data);
  return data;
}

export async function getRatedMovies(){
  let data = await movieApi.get('getRated/').then(({data})=>data);
  return data;
}

export async function getFavouritesMovies(){
  let data = await movieApi.get('get/favourites').then(({data})=>data);
  return data;
}

export async function addToFavourites(movie_id) {
  let data = await movieApi.post('add/favourites',{movie_id: movie_id}).then(({data})=>data);
  return data;
}

export async function removeFromFavourites(movie_id) {
  let data = await movieApi.post('remove/favourites',{movie_id: movie_id}).then(({data})=>data);
  return data;
}

export async function addToWatch(movie_id) {
  let data = await movieApi.post('/add/toWatch',{movie_id: movie_id}).then(({data})=>data);
  return data;
}

export async function removeFromWatch(movie_id) {
  let data = await movieApi.post('/remove/toWatch',{movie_id: movie_id}).then(({data})=>data);
  return data;
}

export async function getToWatchMovies(){
  let data = await movieApi.get('/get/toWatch').then(({data})=>data);
  return data;
}

export async function getRecommendedMovies(){
  let data = await movieApi.get('/getRecommended').then(({data})=>data);
  return data;
}

export async function isFavourite(movie_id){
  let data = await movieApi.get('/is_favourite/'+movie_id).then(({data})=>data);
  return data;
}

export async function isTooWatch(movie_id){
  let data = await movieApi.get('/is_toWatch/'+movie_id).then(({data})=>data);
  return data;
}

export async function getFriendFavourites(user_id){
  let data = await movieApi.get('/get/favourites/'+user_id).then(({data})=>data);
  return data;
}

export async function getFriendRated(user_id){
  let data = await movieApi.get('/get/rated/'+user_id).then(({data})=>data);
  return data;
}