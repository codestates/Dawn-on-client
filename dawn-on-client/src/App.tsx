import Nav from "./components/Nav";
import Landing from "./pages/Landing";
import Explore from "./pages/Explore";
import MyFeed from "./pages/MyFeed";
import CustomPlanner from "./pages/CustomPlanner";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Landing />} />
          <Route path="/explore" render={() => <Explore />} />
          <Route path="/myfeed" render={() => <MyFeed />} />
          <Route path="/custom-planner" render={() => <CustomPlanner />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
