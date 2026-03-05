import { useState } from 'react';
import { PromptsPage } from './pages/PromptsPage';
import { CollectionsPage } from './pages/CollectionsPage';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('prompts');

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <h1>PromptLab</h1>
          </div>
          <ul className="nav-links">
            <li>
              <button
                className={`nav-link ${currentPage === 'prompts' ? 'active' : ''}`}
                onClick={() => setCurrentPage('prompts')}
              >
                Prompts
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${currentPage === 'collections' ? 'active' : ''}`}
                onClick={() => setCurrentPage('collections')}
              >
                Collections
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        {currentPage === 'prompts' && <PromptsPage />}
        {currentPage === 'collections' && <CollectionsPage />}
      </main>
    </div>
  );
}

export default App;
