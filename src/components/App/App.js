import './App.css';
//add two more components
import Header from '../Header/Header'; //Static info
import MoviesManagement from '../Movie/MovieManagement/MovieManagement';

function App() {

  return (
    <>
      <Header/> 
      <MoviesManagement/>
    </>

  );
}

export default App;
