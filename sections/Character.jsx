import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';
import './Character.css';

const API_KEY =  import.meta.env.VITE_APP_ACCESS_KEY;


const Character = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {

      const fetchData = async () => {
  
        const response = await axios.get("http://gateway.marvel.com/v1/public/characters/" + id + "?ts=1&apikey=" + API_KEY + "&hash=" + "1ee2e7e88f692720f915d6880f1208b2");
        console.log(response);
        setCharacter(response.data.data.results[0]);
        console.log(character);
  
    
      };
  
      fetchData().catch(console.error);
      
  
  
    }, []);


      if (!character) {
        return <div>Loading character details...</div>
      }


      return (
        <div className = "character-details">
            <h2 className = "character-name">{character.name}</h2>
            <img className = "character-pic" src={character.thumbnail.path + ".jpg"} alt={character.name} width = "500" height = "500"/>
            <p className = "character-description">{character.description}</p>
            <Link className = "home-link" to={`/`}>Home</Link>
        
          
        </div>
      );

}

export default Character;