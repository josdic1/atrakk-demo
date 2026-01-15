import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TracksManager from './pages/TracksManager';

function App() {
  return (
    <BrowserRouter basename="/atrakk-demo/">
      <div className="App">
        <Routes>
          <Route path="/" element={<TracksManager />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;