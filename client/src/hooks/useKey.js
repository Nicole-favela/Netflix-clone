import { useState, useEffect } from "react";
import axios from "axios";


export default function useKey(){

    const [key, setKey] = useState(''); 
    useEffect(() => {
     
          axios.get('http://localhost:3001/getkey')
          .then(res=>{
              console.log('key is now: ', res.data)
              setKey(JSON.stringify(res.data))
              
          }).catch(()=>{ 
              console.log("error getting key")
          })
  
   
    }, []);
    // try {
    //     const res = await fetch('http://localhost:3001/getkey');
    //     // const data = await response.json();
    //     return JSON.stringify(res.data)
    //   } catch (error) {
    //     console.error(error);
    //     throw new Error('Error fetching API key');
    //   }
          return key
   
  
}
//export default fetchKey