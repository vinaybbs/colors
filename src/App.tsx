import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';


interface Color {
  name: string;
  theme: string;
  group: string;
  hex: string;
  rgb: string;
}

function App() {
  const [searchterm, setSearchterm] = useState('');
  const [colours, setColours] = useState<Color[]>([]);

  useEffect(() => {
    const getdata=()=>{
    axios.get('https://cors-anywhere.herokuapp.com/https://csscolorsapi.com/api/colors')
      .then((response: any) => {
        setColours(response.data.colors.slice(0, 20));
       
      })
      .catch((error: any) => console.log(error));
    }
    getdata();
  }, []);

  const send = () => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://csscolorsapi.com/api/colors/${searchterm}`)
      .then((response) => {
        if (colours.map(color => color.name).includes(response.data.data.name)) {
          return;
        }
        setColours([...colours,response.data.data])
       
      })
      .catch((error)=>console.log(error))
  };
  
  return (
    <div>
      <div className="components">
        <input
          placeholder="Enter name"
          className="input-field"
          onChange={(e) => setSearchterm(e.target.value)}
        />
        <button className="button" onClick={send}>
          Fetch
        </button>
      </div>
      
      <div className='grid'>
      {colours.map((color, index) => (
        <div key={index} style={{ backgroundColor: color.name, height: '100px', width: '100px', border: '1px solid black', borderRadius: '5px' }}>
        </div> 
      ))}
    </div>
    </div>
  );
}

export default App;
