import { useState, useEffect } from "react";
import axios from "axios";


export default function useRecommendations(url, movieSeed){
    const [data,setData] = useState([])
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

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
     
  
    }, [url, movieSeed]);
   
    return { data, error, loading }

}