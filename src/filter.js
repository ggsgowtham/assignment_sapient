// import React from 'react';
// import './App.css';

// const Filter = () => {
//     return(
//         <div className="card">
//             <article className="card-group-item">
//                 <header className="side_car_title"><h6 className="title">Launch Year </h6></header>
//                 <br />
//                 <div className="row button_css">
//                 <div class="col">
//                     <button class="btn btn-danger form-control btn-block" value=
//                 "2006">2006</button></div>
//                 <div class="col">
//                     <button id="btnSubmit" class="btn btn-primary form-control btn-block" type="submit">2007</button>
//                 </div>
//                 </div>
//                 <br />
//                 <div className="row button_css">
//                 <div class="col">
//                     <button class="btn btn-danger form-control  btn-block">2008</button></div>
//                 <div class="col">
//                     <button id="btnSubmit" class="btn btn-primary form-control btn-block" type="submit">2009</button>
//                 </div>
//                 </div>

//                 <br />
//                 <div className="row button_css">
//                 <div class="col">
//                     <button class="btn btn-danger form-control  btn-block">2010</button></div>
//                 <div class="col">
//                     <button id="btnSubmit" class="btn btn-primary form-control btn-block" type="submit">2011</button>
//                 </div>
//                 </div>

//                 <br />
//                 <div className="row button_css">
//                 <div class="col">
//                     <button class="btn btn-danger form-control  btn-block">2012</button></div>
//                 <div class="col">
//                     <button id="btnSubmit" class="btn btn-primary form-control btn-block" type="submit">2013</button>
//                 </div>
//                 </div>

//                 <br />
//                 <div className="row button_css">
//                 <div class="col">
//                     <button class="btn btn-danger form-control  btn-block">2014</button></div>
//                 <div class="col">
//                     <button id="btnSubmit" class="btn btn-primary form-control btn-block" type="submit">2015</button>
//                 </div>
//                 </div>

//                 <br />
//                 <div className="row button_css">
//                 <div class="col">
//                     <button class="btn btn-danger form-control  btn-block">2016</button></div>
//                 <div class="col">
//                     <button id="btnSubmit" class="btn btn-primary form-control btn-block" type="submit">2017</button>
//                 </div>
//                 </div>

//                 <br />
//                 <div className="row button_css">
//                 <div class="col">
//                     <button class="btn btn-danger form-control  btn-block">2018</button></div>
//                 <div class="col">
//                     <button id="btnSubmit" class="btn btn-primary form-control btn-block" type="submit">2019</button>
//                 </div>
//                 </div>

//                 <br />
//                 <div className="row button_css">
//                 <div class="col-sm-6 col-xs-6">
//                     <button class="btn btn-danger form-control">2020</button>
//                 </div>
//                 </div>
//                 <br />
//             </article>

//             <article className="card-group-item">
//                 <header className="side_car_title"><h6 className="title">Successful Launch</h6></header>
//                 <br />
//                 <div className="row button_css">
//                 <div class="col">
//                     <button class="btn btn-danger form-control  btn-block">True</button></div>
//                 <div class="col">
//                     <button id="btnSubmit" class="btn btn-primary form-control btn-block" type="submit">False</button>
//                 </div>
//                 </div>
//                 <br />
//             </article>

//             <article className="card-group-item">
//                 <header className="side_car_title"><h6 className="title">Successful Landing</h6></header>
//                 <br />
//                 <div className="row button_css">
//                 <div class="col">
//                     <button class="btn btn-danger form-control  btn-block">True</button></div>
//                 <div class="col">
//                     <button id="btnSubmit" class="btn btn-primary form-control btn-block" type="submit">False</button>
//                 </div>
//                 </div>
//                 <br />
//             </article>
//         </div>
//     );
// }
    
// export default Filter;


import React, { memo, useCallback, useState, useEffect } from 'react';

import axios from 'axios'
import moment from 'moment'

const itemsArr = [
    {title: "Apple FIRST Item",
    descriptoin: "this is the desc of the apple item",
    type: "product"},
    {title: "Apple SECOND Item",
    descriptoin: "this is the desc of the second apple item",
    type: "product"},
    {title: "Apple THIRD Item",
    descriptoin: "this is the desc of the third apple item",
    type: "product"},
    {title: "Resource FIRST Item",
    descriptoin: "this is the desc of the Resource item",
    type: "resource"},
    {title: "Resource SECOND Item",
    descriptoin: "this is the desc of the second Resource item",
    type: "resource"},
    {title: "Extra First Item",
    descriptoin: "this is the desc of the extra item",
    type: "extra"}
  ]

  
const Component = memo(({ fetchData }) => {
    const [items, setItems] = React.useState(itemsArr);
    const [searchText, setSearchText] = React.useState("");
    const [filter, setFilter] = React.useState(new Set());
  
    const handleInputChange = (value) => {
      setSearchText(value);
      console.log(searchText)
    };
  
    const filterClick = (value) => {
      if (filter.has(value)) {
        setFilter(prevFilter => {
          const newSet = new Set(prevFilter);
          newSet.delete(value);
          return newSet;
        });
      } else {
         setFilter(prevFilter => {
          const newSet = new Set(prevFilter);
          newSet.add(value);
          return newSet;
        });
      }
    };
  
    let filteredItems = items.filter(item => {
      if (filter.size > 0 && !filter.has(item.type))
        return false;
  
      if (searchText.length > 0 && !`${item.title}${item.descriptoin}`.includes(searchText))
        return false;
      
      return true;
    }).map((item, i) => <li>{item.title} <br/><span>{item.descriptoin}</span></li>);
    
    return <>
      <div>
        <input
          type="text"
          id="item-search"
          label="Search"
          variant="outlined"
          value={searchText}
          size="small"
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
      <button
        togglable={true}
        selected={filter.has("product")}
        onClick={() => filterClick("product")}
      >
        products
      </button>
      <button
       variant="contained" color="primary"
        togglable={true}
        selected={filter.has("resource")}
        onClick={(e) => filterClick("resource")}
      >
        resources
      </button>
      <button
       variant="contained" color="primary"
        togglable={true}
        selected={filter.has("extra")}
        onClick={(e) => filterClick("extra")}
      >
        extras
      </button>
      <div>
        <ul>
           {filteredItems}
        </ul>
      </div>
    </>
  })

  export default Component;