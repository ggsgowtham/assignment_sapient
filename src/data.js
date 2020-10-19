import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

function Data({match}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://api.spacexdata.com/v3/launches?limit=100')
    .then(res => res.json())
    .then((result) => {
      setData(result);
    });
  });

  return (
    <div>
      
    { data.map(item => (
      <div className="col-md-3 col-lg-3 d-flex align-items-stretch">  
        <div className="card">
            <img className="card-img-top" 
            src={item.links.mission_patch} 
            alt="Card Image" />
        <div className="card-block">
          <p className="card-title mission_name">{item.mission_name} # {item.flight_number}</p>
          <div className="card-text">
            <span>Mission ids: </span>
            <div className="color_list">
              <p> {item.mission_id || 'NA'}</p>                              
            </div>
          </div>
          <p className="card-title launch_year_css">Launch year: <span>{item.launch_year}</span></p>
          <p className="card-title">Successful launch: <span>{item.launch_success.toString()} </span></p>
          <p className="card-title">Successful Landing: <span>{item.rocket.first_stage.cores.land_success} </span></p>
        </div>
        </div>
          <Link to={'/Sapient/'+item.launch_year}>year</Link>
      </div>
      
  ))}


  </div>
  )
}

export default Data;
