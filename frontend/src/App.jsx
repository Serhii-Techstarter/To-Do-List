import Todolist from './components/Todolist'; 

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/hello')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div id='box'>
      <h1>To-Do List</h1>
      {/* <h1>{message}</h1> */}
      <Todolist />
    </div>
  );
};

export default App;