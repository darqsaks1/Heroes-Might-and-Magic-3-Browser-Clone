import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GameProvider from "./GameProvider";
import "./App.scss";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import Project from "./components/project/Project";
import Footer from "./components/footer/footer";
import Team from "./components/Team/Team";

class App extends React.Component {
  state = {
    game: null,
  };

  onGameCreatedHook = (game) => {
    this.setState({ game });
  };

  render() {
    const { game } = this.state;
    const { onMounted } = this.props;
    return (
      <GameProvider game={game}>
        <Router>
          <Switch>
            <Route exact path="/game">
              <GamePage
                onMounted={(ref) => onMounted(ref, this.onGameCreatedHook)}
                game={game}
              />
              <Footer />
            </Route>
            <Route exact path="/team">
              <Team />
            </Route>
            <Route exact path="/project">
              <Project />
            </Route>
            <Route path="/">
              <Home />
              <Footer />
            </Route>
          </Switch>
        </Router>
      </GameProvider>
    );
  }
}

export default App;
