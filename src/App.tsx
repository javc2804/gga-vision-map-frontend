// App.tsx
import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
