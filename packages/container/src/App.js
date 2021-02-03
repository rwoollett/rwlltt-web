import React, {lazy , Suspense, useState, useEffect} from 'react';
import { Router, Route, Switch, Redirect} from "react-router-dom";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import {createBrowserHistory} from 'history';
import Progress from "./components/Progress";
import Header from "./components/Header";

const MarketingLazy = lazy( () => import('./components/MarketingApp'));
const AuthLazy = lazy( () => import('./components/AuthApp'));
const DashboardLazy = lazy( () => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
});

const history = createBrowserHistory();

export default () => {
    const [isSignIn, setIsSignIn] = useState(false);

    useEffect(() => {
        if (isSignIn) {
            history.push('/dashboard');
        }
    }, [isSignIn]);

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
            <div>
                <Header onSignOut={() => setIsSignIn(false)} isSignIn={isSignIn}/>
                <Suspense fallback={<Progress/>}>
                    <Switch>
                        <Route path="/auth">
                            <AuthLazy onSignIn={() => setIsSignIn(true)}/>
                        </Route>
                        <Route path="/dashboard">
                            {!isSignIn && <Redirect to="/" />}
                            <DashboardLazy/>
                        </Route>
                        <Route path="/" component={MarketingLazy}/>
                    </Switch>
                </Suspense>
            </div>
            </StylesProvider>
        </Router>
    );
};