import Sidebar from "./components/Sidebar/Sidebar";
import Welcome from "./pages/Welcome/Welcome";
import React from "react";

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/* <Sidebar /> */}
        <Welcome />
      </div>
    );
  }
}

export default App;
