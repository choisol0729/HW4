import './app.css';
import NavBar from './components/NavBar';
import axios from 'axios';

function App() {
    /*
    First, start the app by calling NavBar components. I thought having NavBar to navigate through components
    would be much easier than setting the state because I was not really familiar with the setting states and 
    React hooks at the time I started. I found that using external libraries was much easier than implementing 
    everything by myself. 
    */
    return (
        <>
            <NavBar name={"Sol"}/>
        </>
    );
}

export default App