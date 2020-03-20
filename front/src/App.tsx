import React from 'react';
import './App.css';

function App() {

    // TODO: 1) run "as-prod" in docker container (file server on npm run build command), configure docker-compose
    // 2) publish on firebase hosting


    async function computeGuesses() {

        const backUrl = process.env.REACT_APP_BACK_URL
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
