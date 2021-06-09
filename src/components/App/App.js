import React, { useState, useContext, useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import LogIn from '../LogIn/LogIn';
import Home from '../Home/Home';
import { UserContext } from '../../providers/UserProvider';
import './App.scss';

const App = () => {
	const user = useContext(UserContext)
    const [timePassed, setTimePassed] = useState(false);

	//Adds dark theme to root id element and all its children
	document.getElementById("root").classList.add('theme-dark');

    useEffect(() => {
        if (user !== null) console.log(`LOGIN\n loggedIn true.\n`);
		setTimeout( () => { setTimePassed(true); }, 1500);
    }, [user])

	if (!timePassed) {
        return <Spinner/>;
    } 
	else {
        if (user === null) {
			return(
				<LogIn />
			);
		}
		else{
			return(
				<Home />
			);
		}
    }
}

export default App;