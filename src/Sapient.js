import React, {useState, useEffect} from 'react';

function Sapient({match}) {
  const [data, setData] = useState([]);
  console.log(match);
  useEffect(() => {
    fetch("https://api.spacexdata.com/v3/launches?limit=100"+ match.params.year)
    .then(res => res.json())
    .then(result => {
      // console.log(result);
      setData(result);
    })
  });

  return (
    <div className="col-md-3 col-lg-3 d-flex align-items-stretch">  
    <div className="card">
        {/* <img className="card-img-top" src={data.mission_patch} alt="Card Image" /> */}
    <div className="card-block">
      <p className="card-title mission_name">{data.mission_name} # {data.flight_number}</p>
      <div className="card-text">
        <span>Mission ids: </span>
        <div className="color_list">
          <p> {data.mission_id || 'NA'}</p>                              
        </div>
      </div>
      <p className="card-title launch_year_css">Launch year: <span>{data.launch_year}</span></p>
      <p className="card-title">Successful launch: <span>{data.launch_success} </span></p>
      {/* <p className="card-title">Successful Landing: <span>{data.rocket.first_stage.cores.land_success} </span></p> */}
    </div>
    </div>
    </div>
  );
}

export default Sapient;