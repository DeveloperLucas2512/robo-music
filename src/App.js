import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a .wav file to upload");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/identify_note', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <h1>Robo Music - Note Detection</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".wav" onChange={handleFileChange} />
        <button type="submit">Detect Note</button>
      </form>

      {result && (
        <div className="result">
          <h2>Detection Result</h2>
          <p><strong>Note:</strong> {result.note}</p>
          <p><strong>Frequency:</strong> {result.frequency.toFixed(2)} Hz</p>
        </div>
      )}
    </div>
  );
}

export default App;
