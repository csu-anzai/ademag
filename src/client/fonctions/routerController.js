import React from 'react';
import {Route} from "react-router-dom";

export default function routerController(routes) {
    console.log(routes)
    return routes.map((prop, key) => {
        return (
            <Route
                exact path={prop.path}
                component={prop.component}
                key={key}
            />
        );
    });
};