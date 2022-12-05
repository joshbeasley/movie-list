import './App.css';
import { Routes, Route} from 'react-router-dom';
import { MovieList } from './components/MovieList';
import { MovieItem } from './components/MovieItem';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MovieList/>}/>
        <Route path='/movie/:id' element={<MovieItem/>}/>
      </Routes>
    </div>
  );
}

export default App;
