import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import FormPage from "../pages/Form";

const Routes = () => {
  return (
    <Switch>
      <Route exact path={"/"}>
        <Home />
      </Route>

      <Route exact path={"/form-page"}>
        <FormPage />
      </Route>
    </Switch>
  );
};

export default Routes;
