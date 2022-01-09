import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import CreateStory from "./pages/createSotry/CreateStory";
import StorySlider from "./pages/sotoySlider/StorySlider";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">{user ? <Redirect to="/" /> : <Register />}</Route>
        <Route path="/messenger">{!user ? <Redirect to="/" /> : <Messenger />}</Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/stories/create">
          {!user ? <Redirect to="/" /> : <CreateStory />}
        </Route>
        <Route path="/stories">{!user ? <Redirect to="/" /> : <StorySlider />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
