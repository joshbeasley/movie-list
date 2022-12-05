import './App.css';
import { Routes, Route} from 'react-router-dom';
import { MovieList } from './components/MovieList';
import { Nav } from './components/Nav';
import { MovieDetails } from './components/MovieDetails';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<MovieList/>}/>
        <Route path='/movies/:id' element={<MovieDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
