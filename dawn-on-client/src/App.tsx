import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Explore from "./pages/Explore";
import MyFeed from "./pages/MyFeed";
import UserFeed from "./pages/UserFeed";
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
          <Route path="/userfeed" render={() => <UserFeed />} />
          <Route path="/custom-planner" render={() => <CustomPlanner />} />
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
