import loadable from "@loadable/component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const Nav = loadable(() => import("./components/Nav"));
const Index = loadable(() => import("./pages/Index"));

function App() {
  const routes = [{ path: "/", exact: true, component: () => <Index /> }];

  return (
    <div>
      <Nav />
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
          <Route path="*">
            <h1>Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
