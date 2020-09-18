import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const LoginComponent = lazy(() => import('./components/LoginComponent.js'));
const HomeComponent = lazy(()=> import('./components/HomeComponent.js'));

const Routes = () => (
    <Router>
        <Suspense fallback={<div></div>}>
            <Switch>
                <Route path="/home" component={HomeComponent} />
                <Route path="/login" component={LoginComponent} />
                <Route path="/" component={LoginComponent} />
            </Switch>
        </Suspense>
    </Router>
);

export default Routes;