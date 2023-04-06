import { useState } from 'react';
import axios from "axios";
import '../src/App.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ScatterChart, Scatter, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const API_KEY =  import.meta.env.VITE_APP_ACCESS_KEY;


const Home = () => {

  const [list, setList] = useState(null);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);


  useEffect(() => {

    const fetchData = async () => {

      const response = await axios.get("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=" + API_KEY + "&hash=" + "1ee2e7e88f692720f915d6880f1208b2");
      console.log(response);
      setList(response);
      setData(response.data.data.results);


  
    };

    fetchData().catch(console.error);
    


  }, []);


  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue != "") {
      const filteredData = Object.keys(list.data.data.results).filter((item) => 
        Object.values(item).join("").toLowerCase().includes(searchValue.toLowerCase()))
        setFilteredResults(filteredData);
    }

    else {
      setFilteredResults(Object.keys(list.data.data.results));
    }
  };

  

  const charMostStories = list && list.data && list.data.data.results.reduce(
    (prev, current) => {
      return prev.stories.available > current.stories.available ? prev : current;
    },
    { stories: { available: 0 } }

  );

  const charLeastStories = list && list.data && list.data.data.results.reduce(
    (prev, current) => {
      return prev.stories.available < current.stories.available ? prev : current;
    },
    { stories: { available: 0 } }

  );

  const charMostSeries = list && list.data && list.data.data.results.reduce(
    (prev, current) => {
      return prev.series.available > current.series.available ? prev : current;
    },
    { series: { available: 0 } }

  );


  const charLeastSeries = list && list.data && list.data.data.results.reduce(
    (prev, current) => {
      return prev.series.available < current.series.available ? prev : current;
    },
    { series: { available: 0 } }

  );

  const charMostStoriesName = charMostStories ? charMostStories.name : 'Unknown';
  const charMostStoriesPic = charMostStories ? charMostStories.thumbnail.path + ".jpg" : 'Unknown';
  const charLeastStoriesName = charLeastStories ? charLeastStories.name : 'Unknown';
  const charLeastStoriesPic = charLeastStories ? charLeastStories.thumbnail.path + ".jpg" : 'Unknown';
  const charMostSeriesName = charMostSeries ? charMostSeries.name : 'Unknown';
  const charMostSeriesPic = charMostSeries ? charMostSeries.thumbnail.path + ".jpg" : 'Unknown';
  const charLeastSeriesName = charLeastSeries ? charLeastSeries.name : 'Unknown';
  const charLeastSeriesPic = charLeastSeries ? charLeastSeries.thumbnail.path + ".jpg" : 'Unknown';



  

 

  return (
   <div>

    <h1 className = "title">Marvel Character Data</h1>
    
    <div className = "row">
      <div className = "column">
        <div className = "statistic">
          <p>Most Available Stories:</p> 
          <img src = {charMostStoriesPic} width = "100" height = "100" />
          <br />
          {charMostStoriesName}
        </div>
      </div>
      <div className = "column">
        <div className = "statistic">
          <p>Least Available Stories:</p> 
          <img src = {charLeastStoriesPic} width = "100" height = "100" />
          <br />
          {charLeastStoriesName}
        </div>
      </div>
      <div className = "column">
        <div className = "statistic">
          <p>Most Available Series:</p> 
          <img src = {charMostSeriesPic} width = "100" height = "100" />
          <br />
          {charMostSeriesName}
          </div>
      </div>
      <div className = "column">
        <div className = "statistic">
          <p>Least Available Series:</p> 
          <img src = {charLeastSeriesPic} width = "100" height = "100" />
          <br />
          {charLeastSeriesName}
          </div>
      </div>
    </div>


    <p className = "search-box"><input className = "search" type = "text" placeholder = "Search..." onChange = {(inputString) => searchItems(inputString.target.value)} /></p>
    


    

   

    <div className = "table-list">

      <table className = "table-data">
        <thead>
          <tr>
            <th className = "header">name</th>
            <th className = "header">number of stories</th>
            <th className = "header">number of series</th>
          </tr>
        </thead>

      
        

        <tbody>

        {searchInput.length > 0 ?
  filteredResults.map(([hero]) => list.data.data.results[hero] ? 
    <tr>
      <td>{list.data.data.results[hero].name}</td> 
      <td>{list.data.data.results[hero].stories.available}</td> 
      <td>{list.data.data.results[hero].series.available}</td>
    </tr>
  : null)
: list && Object.entries(list.data.data.results).map(([hero], index) => {
    const character = list.data.data.results[index];
    return list.data.data.results[hero] ?
      <tr key={character.id}>
        <Link to={`/character/${character.id}`}><td>{list.data.data.results[hero].name}</td></Link>
        <td>{list.data.data.results[hero].stories.available}</td> 
        <td>{list.data.data.results[hero].series.available}</td>
      </tr>
    : null;
  })
}








        
        

        </tbody>

      </table>

      

    </div>

    <div className = "chart">


      <LineChart className = "line-chart-data" width = {500} height = {300} data = {data} margin = {{top: 5, right: 30, left: 20, bottom: 5}}><CartesianGrid strokeDasharray = "3 3" /> <XAxis dataKey = "name" /> <YAxis /> <Tooltip /> <Legend /> <Line type = "monotone" dataKey = "comics.available" stroke = "#8884d8" /> </LineChart>
      <BarChart className = "bar-chart-data"width = {500} height = {300} data = {data}> <CartesianGrid strokeDasharray = "3 3" /> <XAxis dataKey = "name" /> <YAxis /> <Tooltip /> <Legend /> <Bar dataKey = "comics.available" fill = "#8884d8"/> </BarChart>
      <ScatterChart className = "scatter-chart-data" width = {500} height = {300} margin = {{top: 20, right: 20, bottom: 20, left: 20,}}><CartesianGrid /> <XAxis type = "category" dataKey = "name" name = "Character"/> <YAxis type = "number" dataKey = "comics.available" name = "Comics" /> <Tooltip cursor={{ strokeDasharray: "3 3" }} /> <Scatter name="Marvel Characters" data={data} fill="#8884d8" /> </ScatterChart>

    </div>
    

    

   
   </div>
  )
}

export default Home;
