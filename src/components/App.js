import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState("all"); 

  function handleChangeType(type){
    setFilters(type)
  }

  function handleFindPetsClick(){
    let endpoint = 'http://localhost:3001/pets'
    if(filters !== 'all'){
      endpoint += `?type=${filters}`
    }
    fetch(endpoint)
      .then(r => r.json())
      .then(setPets)
  }

  function handleAdoptPet(id){
    let updatedPet = {}
    const config = {
      method: 'patch',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({isAdopted: true})
    }
    fetch(`http://localhost:3001/pets/${id}`, config)
      .then(r => r.json())
      .then(changedPet => updatedPet = changedPet)

    const updatedPets = pets.map(pet => {
      return pet.id === id ? {...pet, isAdopted: true} : pet
    })
    setPets(updatedPets)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters 
              onChangeType={handleChangeType}
              onFindPetsClick={handleFindPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser onAdoptPet={handleAdoptPet} pets={pets}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;