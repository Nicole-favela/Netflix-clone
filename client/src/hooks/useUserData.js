import { useState, useEffect } from "react";
import axios from "axios";


export default function useUserData(url, callback){
    const [data,setData] = useState([])
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
     
   
        (
            async function(){
                try{
                    setLoading(true)
                    const res = await axios.get(url)
                    console.log('in user data hook: ',res.data.data)
                    setData(res.data.data)
                    callback(res.data.data)
                }catch(err){
                    console.error(err)
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [url, callback]);
   
    return { data, error, loading }

}