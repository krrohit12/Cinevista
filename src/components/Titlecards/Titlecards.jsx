import React, { useEffect, useRef, useState } from 'react'
import './Titlecards.css'
import cards_data from '../../assets/cards/Cards_data'
import {Link} from 'react-router-dom'

const Titlecards = ({title,category}) => {
  const[apiData,setApiData]=useState([])
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjhlNDE2ZGQ3NTk5ZGQ0NzE4MjUyODhkN2FiYjY3YyIsIm5iZiI6MTcyODc1NTY1Ni42MzYwNTYsInN1YiI6IjY2NjgwODVkZGYxNDZiN2I0NWE2YjFiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cc3iDMPT9KfPnHqXw5csr3XTFkFumCRnprXHtqMqyAk'
    }
  };
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response =>setApiData(response.results))
    .catch(err => console.error(err));
  },[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" >
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`}className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>  
        })}
      </div> 
    </div>
  )
}

export default Titlecards
