import React from 'react';
import './App.css';
import backUrl from "./backUrl"

function App() {

    // TODO NICO: GERER CORS SUR LE BACKEND
    // Blocage d’une requête multiorigines (Cross-Origin Request) : la politique « Same Origin » ne permet pas de consulter la ressource distante située sur http://localhost:8080/compute_guesses. Raison : échec de la requête CORS.

    async function computeGuesses() {
        const response = await fetch(`${backUrl}/compute_guesses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description_sentences: ['sentence-1', 'sentence-2'] }),
        })
        console.log(await response.json())
    }

    return (
    <div className="App">
      <header className="App-header">
        <button onClick={computeGuesses}>Call backend</button>
      </header>
    </div>
  );
}

export default App;
