import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#F5F5F5' }}>
        <header style={{ backgroundColor: '#2A5A3B', color: '#ffffff', padding: '20px' }}>
          <h1>BirdieWay Golf</h1>
        </header>
      </div>
    </BrowserRouter>
  );
};

export default App;
