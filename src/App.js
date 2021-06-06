import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import Piano from './Components/Piano';
import Arcadepiano from './Components/Arcadepiano';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact
          path="/"
          render={() => <Home />} />
        <Route exact
          path="/piano"
          render={() => <Piano />} />
        <Route exact
          path="/arcade"
          render={() => <Arcadepiano />} />
      </Switch>
    </div>
  );
}

export default App;
