import { number, string } from 'prop-types';
import React from 'react'
import { useState, useEffect } from 'react';

const host =  "https://get-flix-back-end-liolle.vercel.app"

const addMovieInfo = async (satus:string[],setLinks:React.Dispatch<React.SetStateAction<string[]>>,n:number) =>{
    let URL = host+`/api/movies/random?n=${n}/`
    
    try {
        ``
        let response = await fetch(URL)
        let data = await response.json()
        if (data){
            let buffer:string[] = []
            data.forEach((element:any) => {
                buffer.push(element['image'])
            });
            
            setLinks(buffer)
        } 

    } catch (error) {
        
    }
}



const setI = (idx:number,setIdx:React.Dispatch<React.SetStateAction<number>>,len:number)=>{
    setIdx((idx+1)%len)
    setI(idx,setIdx,len)
    
} 

type Props = {
    n: number;
    timeoutRange: [number,number]
};



const SlideImgDiv = ({n,timeoutRange}:Props)=>{

    let [imageLinks, setLinks] =  useState<string[]>([])
    let [idx,setIdx] = useState<number>(0)

    let min = Math.min(timeoutRange[0]*1000,timeoutRange[1]*1000)
    let max = Math.max(timeoutRange[0]*1000,timeoutRange[1]*1000)

    
    useEffect(() => {
       addMovieInfo(imageLinks,setLinks,n)
    }, []);

    
    useEffect(() => {
        setTimeout(() => {
            setIdx((idx+1)%n)
            
        }, Math.floor(Math.random()*max) + min);
      }, [idx]);

    //Math.floor(Math.random()*max) + min
    return (

            // <div className={` w-full h-full `} style={{ backgroundImage: `url(${imageLinks[idx]})` }}>
            //     .
            // </div>
            <img className="block object-cover object-center w-full h-full rounded-lg"
             src={imageLinks[idx]} alt=''></img>
        
    )
    
}

export default SlideImgDiv;