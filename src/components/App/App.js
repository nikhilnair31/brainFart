import React, {useEffect, useState} from 'react';
import Intro from '../Intro/Intro';
import Search from '../Search/Search';
import CardContainer from '../CardContainer/CardContainer';
import Footer from '../Footer/Footer';
import ScrollToTop from '../ScrollToTop//ScrollToTop';
import { dbref } from '../../helpers/firebase.js';
import './App.scss';

const full_data = [
	{id: 1, heading: 'Experiences', data:[
		{id: 1, title: "ISTE NITK", date: "Jun 2020 – Present", position: 'Create SIG Head', duration: '(11 mos)', location: 'Surathkal, Karnataka', linkons:[],},  
		{id: 2, title: "Learnogether", date: "May 2020 – Jul 2020", position: 'Machine Learning Intern', duration: '(3 mos)', location: 'Bengaluru, Karnataka', linkons:[],},   
		{id: 3, title: "IIT Bombay", date: "May 2019 – Jun 2019", position: 'Summer Intern', duration: '(2 mos)', location: 'Bengaluru, Karnataka', linkons:[],},  
		{id: 4, title: "TEDx NITK Surathkal", date: "Jan 2019 - Feb 2019", position: 'Graphics Designer', duration: '(1 mo)', location: 'Mumbai, Maharashtra', linkons:[],},  
		{id: 5, title: "KalaCircle", date: "Sep 2017 – Sep 2018", position: 'Graphics Designer', duration: '(1 yr 1 mo)', location: 'Surathkal, Karnataka', linkons:[],},  
		{id: 6, title: "Kaadoo", date: "Jul 2018 - Aug 2018", position: 'Game Developer Intern', duration: '(1 mo)', location: 'Bengaluru, Karnataka', linkons:[],},  
	]},
];

const App = () => {
	const [myImgPath, setImgPath] = useState('./images/idea_icon1.png');
	const [myData, setMyData] = useState(full_data);

	useEffect(
		() => {
			document.getElementById("root").classList.add('theme-dark');
		}
	);

  	return (
		<div id="root_child">
			<Intro myImgPath={myImgPath}/>
			<Search />

			<CardContainer full_data={myData}/>

			<Footer/>
			<ScrollToTop/>
		</div>
  	);
}

export default App;