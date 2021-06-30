import Nav from "./components/Nav";
import Landing from "./pages/Landing";
import Explore from "./pages/Explore";
import MyFeed from "./pages/MyFeed";
import CustomPlanner from "./pages/CustomPlanner";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { hot } from "react-hot-loader";

const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/explore" component={Explore} />
          <Route path="/myfeed" component={MyFeed} />
          <Route path="/custom-planner" component={CustomPlanner} />
        </Switch>
      </Router>
    </>
  );
};

export default hot(module)(App);
