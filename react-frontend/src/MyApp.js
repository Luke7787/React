import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';


function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const character = characters[index];

    axios.delete(`http://localhost:8000/users/${character._id}`)  // Use _id here
        .then(response => {
            if (response.status === 204) {
                const updated = characters.filter((c, i) => i !== index);
                setCharacters(updated);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
   }

  function updateList(person) {
    makePostCall(person).then(result => {
        if (result && result.status === 201) {
            setCharacters([...characters, result.data]);  // Use the data from the backend
        }
    });
   }

  async function fetchAll(){
   try {
      const response = await axios.get('http://localhost:8000/users');
      return response.data.users_list;     
   }
   catch (error){
      //We're not handling errors. Just logging into the console.
      console.log(error); 
      return false;         
   }
  }

  async function makePostCall(person){
    try {
        const response = await axios.post('http://localhost:8000/users', person);
        return response;
    }
    catch (error) {
        console.log(error);
        return false;
    }
  }

  useEffect(() => {
   fetchAll().then( result => {
      if (result)
         setCharacters(result);
    });
}, [] );

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
