import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import EnterRoom from "./pages/EnterRoom/EnterRoom";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/room/:id" component={ChatRoom} />
            <Route path="/room" exact component={EnterRoom} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
