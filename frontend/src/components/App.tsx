import React from "react";
import { BrowserRouter, Router, Route } from 'react-router-dom';
import { Exit } from "./Exit";

export class App extends React.Component{
    render(): React.ReactNode {
        return (
            <>
              <Exit/>
            </>
        )
    }
}