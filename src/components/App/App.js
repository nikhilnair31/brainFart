import React, {useState} from 'react';
import UserProvider from '../../providers/UserProvider';
import LogIn from '../LogIn/LogIn';
import Home from '../Home/Home';
import User from '../User/User';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';


const App = () => {
    const [posted, setPosted] = useState(0);
	document.getElementById("root").classList.add('theme-dark');

	return(
		<Router>
			<Switch>
				<UserProvider>
					<Route path="/" exact component={() => <LogIn />} />
					<Route path="/home" exact component={() => <Home posted={posted} setPosted={setPosted}/>} />
					<Route path="/user" exact component={() => <User />} />
				</UserProvider>
			</Switch>
		</Router>
	);
}

export default App;