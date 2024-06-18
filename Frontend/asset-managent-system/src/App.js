import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Assets from './components/Assets';
import InsertAsset from './components/InsertAsset'
import UpdateAsset from './components/UpdateAsset';
import About from './components/About';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';




function App() {
  return (
    <div className="App">
      <Navbar title="Assets" about="About"></Navbar>

      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/insertasset" element={<InsertAsset />} />
          <Route path="/updateasset/:id" element={<UpdateAsset />} />
          <Route path="/about" element={<About />} />

        </Routes>

      </Router>


    </div>
  );
}

export default App;
