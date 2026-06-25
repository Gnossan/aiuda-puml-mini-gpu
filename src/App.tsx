import React from 'react';
import Editor from './components/Editor';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Editor />
    </div>
  );
};

export default App;
