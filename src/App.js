import './App.css';
import {useState,useEffect} from 'react';
import Axios from 'axios';

function App() {
  const [data,setData] = useState();
  const [searchStr,setSearchStr] = useState("");
  
  useEffect(()=>{
   getData()
  },[])

  const getData = () => {
    let url = `http://localhost:8443/api/v1/getPosts?format=json&language=English`
    if(searchStr.length > 0){
      url = url + `&tags=${searchStr}`
    }
    Axios.get(url).then(res=>{
      console.log('RES -->',res.data.data);
      if(res.data.code === 1){
        setData(res.data.data);
      }
    })
  }

  const submit = () => {
    getData()
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="searchDiv">
          PHOTO APP
           <div className="searchText">
             <input type="text" value={searchStr} onChange={(e)=>{setSearchStr(e.target.value)}}/>
             <button type="button" onClick={()=>submit()}>Search</button>
           </div>
        </div>
      </header>
      <div className="container">
      <div className="row">
        {
          data && data.items ?
          data.items.map((i)=>(
            <div className="col-sm">
             <img src={i.media.m} alt="Girl in a jacket" width="200" height="200"/>
            <p><b>Title:</b> {i.title}</p>
            <p><b>Tags:</b> {i.tags}</p>
            </div>
          ))
          :
          <p>No data found</p>
        }
        </div>
      </div>
    </div>
  );
}

export default App;
