import logo from './logo.svg';
import {ExampleComponent} from "my-library";

import urls from './utils/pageUrls';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'my-library/dist/index.css';

function App() {
  return (
    <div className="App">
      <ExampleComponent 
        pages={urls} 
        cover={urls[0]} 
        size={{width:437, height:556}}  
      />
    </div>
  );
}

export default App;
