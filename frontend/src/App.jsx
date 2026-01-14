import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TracksManager from './pages/TracksManager';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        

        <Routes>
          <Route path="/" element={<TracksManager />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;