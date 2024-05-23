import './app.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';

function App() {
    /*
    First, start the app by calling NavBar components. I thought having NavBar to navigate through components
    would be much easier than setting the state because I was not really familiar with the setting states and 
    React hooks at the time I started. I found that using external libraries was much easier than implementing 
    everything by myself. 
    */
    const [name, setName] = useState("");
    const [auth, setAuth] = useState(false);

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.get("http://localhost:2424/getProfileInfo?name=" + name)
        .then((res) => {
            if(res.data !== ""){
                console.log("LOG IN!");
                setAuth(true);
                axios.post("http://localhost:2424/updateAuth?auth=true&name=" + name);
            }
            else console.log("Wrong name, please try again");
        })
    }

    useEffect(() => {
        axios.get("http://localhost:2424/checkAuth")
        .then((res) => {
            setAuth(res.data[0].auth === 1 ? true : false);
            setName(res.data[0].name);
            console.log("Name: ", name);
        }).catch(() => console.log("There is no logged in auth"))
    }, [])

    return (
        <div>
            {!auth ? <><div style={{
                height: "50vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div>
                    <h1>Log In</h1>
                </div>
            </div>
            <div style={{width: "100vw", display: "flex", alignItems: "center", justifyContent: "center"}}>
                Type your correct name to continue / log in
            </div>
            <div style={{width: "100vw", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <form onSubmit={submit}>
                    <input type="text" required style={{margin: "10px"}} onChange={handleChange} value={name}/>
                    <button type='submit'>Enter</button>
                </form>
            </div></> : <><NavBar name={name} auth={auth} setAuth={setAuth} /> </>}
        </div>
    );
}

export default App