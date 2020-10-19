import React, { useEffect, useState } from 'react';
import './App.css';
import { useQueryState } from "react-router-use-location-state";
import Color from './Color';
//import ParamsExample from './example';



function App() {

  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState(new Set());

  const  [queryString, setQueryString] =  useQueryState("queryString",  "");
  const  [colors, setColors] =  useQueryState("year",  []);

  const  [success, setSuccess] =  useQueryState("launch_success",  "");
  const  [launchs, setLaunch] =  useQueryState("launch_success",  []);

  const  [land, setLand] =  useQueryState("land_success",  "");
  const  [landing, setLanding] =  useQueryState("land_success",  []);


  useEffect(() => {
    getData();
  }, []);

  //[search] everytime gets receipe values on search 

  const toggleLaunch = (e) => {
    let launch = e.target.value;
   setLaunch(
      success.includes(launch)
        ? launchs.filter(t => t !== launch)
        : [...launchs, launch]
    );
    if (filter.has(launch)) {
      setFilter(prevFilter => {
        const newSet = new Set(prevFilter);
        newSet.delete(JSON.parse(launch));
        console.log(newSet);
        return newSet;
      });
    } else {
        setFilter(prevFilter => {
        const newSet = new Set(prevFilter);
        newSet.add(JSON.parse(launch));
        console.log(newSet);
        return newSet;
      });
    }
  }

  const toggleLand = (e) => {
    const la = e.target.value;
    console.log(la);
    setLand(
      land.includes(la)
        ? landing.filter(t => t !== la)
        : [...landing, la]
    );
    if (filter.has(la)) {
      setFilter(prevFilter => {
        const newSet = new Set(prevFilter);
        newSet.delete(JSON.parse(la));
        console.log(newSet);
        return newSet;
      });
    } else {
        setFilter(prevFilter => {
        const newSet = new Set(prevFilter);
        newSet.add(JSON.parse(la));
        console.log(newSet);
        return newSet;
      });
    }
  }

  const toggleColor = (e) => {
    const color = e.target.value;
    console.log(color);
    setColors(
      colors.includes(color)
        ? colors.filter(t => t !== color)
        : [...colors, color]
    );
    if (filter.has(color)) {
      setFilter(prevFilter => {
        const newSet = new Set(prevFilter);
        newSet.delete(color);
        console.log(newSet);
        return newSet;
      });
    } else {
        setFilter(prevFilter => {
        const newSet = new Set(prevFilter);
        newSet.add(color);
        console.log(newSet);
        return newSet;
      });
    }
  };

  const getData = async () => {
    const response = await fetch(`https://api.spaceXdata.com/v3/launches?limit=100`);
    const filter_data = await response.json();
    console.log("hie",window.location.hash);
    
    setItems(filter_data);
  }
  
  // const filterClick = (value) => {
    
  // };
  
    let filteredItems = items.filter(item => {
     var blnIsFound = true;
      if (filter.size > 0 && !filter.has(item.launch_year))
        blnIsFound = false;
      
      if(filter.size > 0 && !filter.has(item.launch_success))
        blnIsFound = false;
      
      if(filter.size > 0 && !filter.has(item.land_success))
        blnIsFound = false;
       
      else blnIsFound = true;
     
      return blnIsFound;
    }).map((item) =>
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
    </div></div>
);

  return (
    <div className="App">
      {/* <ParamsExample /> */}
      <div className="container title_css">
        <h4>SpaceX Launch Programs</h4>
        <ul></ul>
      </div>
      <div className="container">
        <div className="col-md-12">
          <div className="row">  
            <div className="col-md-3 col-lg-3 col-xs-12 col-sm-12 side-menu">
            <div className="card">
            <article className="card-group-item">
                <header className="side_car_title"><h6 className="title">Launch Year </h6></header>
                <br />
                <div className="row button_css">
                  <div className="col">
                    <Color
                        name="2006"
                        active={colors.includes("2006")}
                        selected={filter.has("2006")}
                        onClick={toggleColor}
                      />
                    
                  </div>
                <div className="col">
                      <Color
                        name="2007"
                        active={colors.includes("2007")}
                        selected={filter.has("2007")}
                        onClick={toggleColor}
                      />
                </div>
                </div>
                <br />
                <div className="row button_css">
                <div className="col">
                <Color
                        name="2008"
                        active={colors.includes("2008")}
                        selected={filter.has("2008")}
                        onClick={toggleColor}
                      />   
                </div>
                <div className="col">
                <Color
                        name="2009"
                        active={colors.includes("2009")}
                        selected={filter.has("2009")}
                        onClick={toggleColor}
                      />
                </div>
                </div>

                <br />
                <div className="row button_css">
                <div className="col">
                      <Color
                        name="2010"
                        active={colors.includes("2010")}
                        selected={filter.has("2010")}
                        onClick={toggleColor}
                      />    
                </div>
                <div className="col">
                      <Color
                        name="2011"
                        active={colors.includes("2011")}
                        selected={filter.has("2011")}
                        onClick={toggleColor}
                      />
                </div>
                </div>

                <br />
                <div className="row button_css">
                <div className="col">
                <Color
                        name="2012"
                        active={colors.includes("2012")}
                        selected={filter.has("2012")}
                        onClick={toggleColor}
                      />
                </div>
                <div className="col">
                <Color
                        name="2013"
                        active={colors.includes("2013")}
                        selected={filter.has("2013")}
                        onClick={toggleColor}
                      />
                </div>
                </div>

                <br />
                <div className="row button_css">
                <div className="col">
                <Color
                        name="2014"
                        active={colors.includes("2014")}
                        selected={filter.has("2014")}
                        onClick={toggleColor}
                      />
                </div>
                <div className="col">
                <Color
                        name="2015"
                        active={colors.includes("2015")}
                        selected={filter.has("2015")}
                        onClick={toggleColor}
                      />
                </div>
                </div>

                <br />
                <div className="row button_css">
                <div className="col">
                <Color
                        name="2016"
                        active={colors.includes("2016")}
                        selected={filter.has("2016")}
                        onClick={toggleColor}
                      />
                </div>
                <div className="col">
                <Color
                        name="2017"
                        active={colors.includes("2017")}
                        selected={filter.has("2017")}
                        onClick={toggleColor}
                      />
                </div>
                </div>

                <br />
                <div className="row button_css">
                <div className="col">
                <Color
                        name="2018"
                        active={colors.includes("2018")}
                        selected={filter.has("2018")}
                        onClick={toggleColor}
                      />
                </div>
                <div className="col">
                <Color
                        name="2019"
                        active={colors.includes("2019")}
                        selected={filter.has("2019")}
                        onClick={toggleColor}
                      />
                </div>
                </div>

                <br />
                <div className="row button_css">
                <div className="col-sm-6 col-xs-6">
                <Color
                        name="2020"
                        active={colors.includes("2020")}
                        selected={filter.has("2020")}
                        onClick={toggleColor}
                      />
                    </div>
                </div>
                <br />
            </article>

            <article className="card-group-item">
                <header className="side_car_title"><h6 className="title">Successful Launch</h6></header>
                <br />
                <div className="row button_css">
                  <div className="col">
                    {/* <button id="btnSubmit" 
                      className="btn btn-primary form-control btn-block" 
                      type="submit"
                      selected={filter.has(true)}
                      
                      >True
                    </button> */}

                    <Color
                        name="true"
                        value="True"
                        active={colors.includes("true")}
                        selected={filter.has("true")}
                        onClick={toggleLaunch}
                        // onSubmit = {filterClick("2006")}
                      />
                  </div>
                <div className="col">
                <Color
                        name= "false"
                        active={colors.includes("false")}
                        selected={filter.has("false")}
                        onClick={toggleLaunch}
                        // onSubmit = {filterClick("2006")}
                      />
                </div>
                </div>
                <br />
            </article>

            <article className="card-group-item">
                <header className="side_car_title"><h6 className="title">Successful Landing</h6></header>
                <br />
                <div className="row button_css">
                <div className="col">
                    <Color
                        name= "true"
                        active={colors.includes("true")}
                        selected={filter.has("true")}
                        onClick={toggleLand}
                        // onSubmit = {filterClick("2006")}
                      />
                    
                    </div>
                <div className="col">
                <Color
                        name= "false"
                        active={colors.includes("false")}
                        selected={filter.has("false")}
                        onClick={toggleLand}
                        // onSubmit = {filterClick("2006")}
                      />
                </div>
                </div>
                <br />
            </article>
        </div>
            </div>
            {/* HTML to show card data from API starts */}
            <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
              <div className="row">
              
                    {filteredItems}
                  
              </div>
              <br />
                <div className="title_css_footer">
                  <h4>Developed By: <span>GGS Gowtham</span></h4>
                </div>
            </div>
            {/* HTML to show card data from API Ends */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
