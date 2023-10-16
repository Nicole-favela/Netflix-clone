
import { useState, useEffect } from "react";
import axios from "axios";
export default function useCredits(url){
    const [data,setData] = useState([])
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
     
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.get(url)
                    //console.log('response is: ', response)
                    setData(response.data)
                }catch(err){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
     
  
    }, [url]);
   
    return { data, error, loading }

}