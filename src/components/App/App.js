import React, { useState, useContext, useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import LogIn from '../LogIn/LogIn';
import Home from '../Home/Home';
import { UserContext } from '../../providers/UserProvider';
import './App.scss';

const App = () => {
	const user = useContext(UserContext)
    const [timePassed, setTimePassed] = useState(false);
    const [posted, setPosted] = useState(0);
	document.getElementById("root").classList.add('theme-dark');

    useEffect(() => {
		setTimeout( () => { setTimePassed(true); }, 1500);
        if (user !== null) console.log(`LOGIN\n loggedIn true. Now send to /home.\n`);
    }, [user])

	// return <Spinner/>;
	if (!timePassed) {
        return <Spinner/>;
    } 
	else {
        if ((user === null)) {
			return(
				<LogIn />
			);
		}
		else{
			return(
				<div className="root_in">
					<Home postedObj={{posted, setPosted}} />
				</div>
			);
		}
    }
}

export default App;