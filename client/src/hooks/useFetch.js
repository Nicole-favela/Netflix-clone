import { useState, useEffect } from "react";
import axios from "axios";


export default function useFetch(url){
    const [data,setData] = useState([])
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    //const [horrormovies, setHorrormovies] = useState(''); 
    useEffect(() => {
     
   
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.get(url)
                    setData(response.data.results)
                }catch(err){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [url]);
    //const filteredData = data.filter((movie) => genre_id.includes(movie.genre_id));
    return { data, error, loading }

}