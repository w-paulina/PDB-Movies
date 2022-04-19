import axios from "axios";

const ratingApi = axios.create({
    baseURL: "http://localhost:5000/api/ratings",
    withCredentials: true
})

export async function getRatingsByMovieId(movie_id){      

    let data = await ratingApi.get('/getRates/'+movie_id).then(({data}) => data);
    return data;
}

export async function addRating(rate, movie_id){
    ratingApi.post('/add',{ 
        rate: rate,  
        movie_id: movie_id
    })
}

export async function getUserRate(movie_id){
    let data = await ratingApi.post('/getRate',{movie_id:movie_id}).then(({data})=>data);
    //console.log(data.rate)
    return data.rate;
}
