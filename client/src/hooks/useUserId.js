import { useState, useEffect } from "react";
import axios from 'axios'

export default function useUserId(url, headers){
    const [data,setData] = useState([])
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
     
   
        (
            async function(){
                try{
                    setLoading(true)
                    const res = await axios.get(url, {headers})
                    if (res.data.user && res.data.user._id) {
                        console.log('in user data hook:', res.data.user._id);
                        setData(res.data.user._id);
                      } else {
                        console.log('User data not available in response:', res.data);
                      }
                  
                    //setData(res.data.user._id)
                    
                }catch(err){
                    console.error(err)
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [url]);
   
    return { data, error, loading }

}