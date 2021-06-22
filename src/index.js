import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App/App';
import UserProvider from './providers/UserProvider';
import ConfirmProvider from './providers/ConfirmProvider';
import reportWebVitals from './helpers/reportWebVitals';

ReactDOM.render(
	<React.StrictMode>
		<UserProvider>
			<ConfirmProvider>
				<App />
			</ConfirmProvider>
		</UserProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();