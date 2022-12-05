import './App.css';
import { Routes, Route} from 'react-router-dom';
import { MovieList } from './components/MovieList';
import { MovieItem } from './components/MovieItem';
import { Nav } from './components/Nav';
import { MovieForm } from './components/MovieForm';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<MovieList/>}/>
      </Routes>
    </div>
  );
}

export default App;
