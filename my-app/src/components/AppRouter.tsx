import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Switch, Redirect } from 'react-router-dom'
import { Context } from '..';
import { privateRouters, publicRouters } from '../routers';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';

const AppRouter = () => {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);
    return user ?
        (<Switch>
            {privateRouters.map(({ path, Component }) => {
                return <Route key={path} path={path} component={Component} exact={true} />
            })}
            <Redirect to={CHAT_ROUTE} />
        </Switch>)
        :
        (<Switch>
            {publicRouters.map(({ path, Component }) => {
                return <Route key={path} path={path} component={Component} exact={true} />
            })}
            <Redirect to={LOGIN_ROUTE} />
        </Switch>)

}

export default AppRouter;