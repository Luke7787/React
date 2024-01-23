import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';


function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const character = characters[index];
    
    axios.delete(`http://localhost:8000/users/${character.id}`)
        .then(response => {
            if (response.status === 204) {
                // Remove the character from the state if the backend deletion was successful
                const updated = characters.filter((c, i) => i !== index);
                setCharacters(updated);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
            // Optionally handle the error by showing an error message to the user
        });
  }

  function updateList(person) { 
   makePostCall(person).then( result => {
   if (result && result.status === 201) // Changed from 200 to 201
      setCharacters([...characters, person] );
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
