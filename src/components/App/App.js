import React, {useState} from 'react';
import UserProvider from '../../providers/UserProvider';
import ConfirmProvider from '../../providers/ConfirmProvider';
import LogIn from '../LogIn/LogIn';
import Home from '../Home/Home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';


const App = () => {
    const [posted, setPosted] = useState(0);
	document.getElementById("root").classList.add('theme-dark');

	return(
		<Router>
			<Switch>
				<UserProvider>
        			<ConfirmProvider>
						<Route path="/" exact component={() => <LogIn />} />
						<Route path="/home" exact component={() => <Home postedObj={{posted, setPosted}}/>} />
        			</ConfirmProvider>
				</UserProvider>
			</Switch>
		</Router>
	);
}

export default App;