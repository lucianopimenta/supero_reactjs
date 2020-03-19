import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Detail from './pages/Detail';
import Home from './pages/Home';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/book/:id" component={Detail}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;