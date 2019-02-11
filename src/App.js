import React, { Component } from 'react';
import  {BrowserRouter, Route, Switch} from "react-router-dom";

import Login from "./Login";

import ListPage from "./ListPage";
import Error from "./Error";
import Register from "./Register";


class App extends Component {




  render() {
    return (

      <div className="container">


            <BrowserRouter>

                <Switch>
                  <Route path="/" component={Login} exact/>
                  <Route path="/login" component={Login}/>
                  <Route path="/register" component={Register}/>
                  <Route path="/list" component={ListPage}/>
                  <Route  component={Error}/>
                </Switch>

            </BrowserRouter>
      </div>
    );
  }
}

export default App;
