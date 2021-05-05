import React, {useState} from 'react';
import LogIn from '../LogIn/LogIn';
import Banner from '../Banner/Banner';
import Intro from '../Intro/Intro';
import Search from '../Search/Search';
import AddIdea from '../AddIdea/AddIdea';
import CardContainer from '../CardContainer/CardContainer';
import Footer from '../Footer/Footer';
import UserProvider from '../../providers/UserProvider';
import './App.scss';


const App = () => {
    const [posted, setPosted] = useState(0);
	document.getElementById("root").classList.add('theme-dark');

	const [photoURL, setPhotoURL] = useState("https://img.icons8.com/ios/30/000000/user-male-circle.png");
	const [loggedIn, setLoggedIn] = useState(false);

	if (!loggedIn) {
		return( 
			<UserProvider>
				<LogIn setLoggedIn={setLoggedIn} setPhotoURL={setPhotoURL}/>
    		</UserProvider>
		);
	}
	else{
		return (
			<div id="root_child">
				<UserProvider>
					{/* <Banner /> */}
					<Intro imgURL={photoURL}/>
					<Search />
					<AddIdea posted={posted} setPosted={setPosted}/>
					<CardContainer posted={posted}/>
					<Footer/>
					{/* <ScrollToTop/> */}
    			</UserProvider>
			</div>
		);
	}
}

export default App;