import { NavLink, Route, Routes, BrowserRouter } from "react-router-dom";
import defProfile from "../assets/defProfile.jpeg"
import "../app.css";
import EQ from "./EQ";
import LD from "./LD";
import VD from "./VD";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserProp{
    name: string;
    auth: boolean;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({name, auth, setAuth}: UserProp) => {
    /*
    NavBar is just a component that leads to other components. Mainly, it leads the users to
    edit question page. Since every components should be connected from this NavBar component,
    it is important to import every main components that has significant features in this web app.
    First, I setup the BrowserRouter, which allows me to setup the basic connection with NavLinks, 
    and then, I get to Route to the components using Routes and Route tag. As I explained before,
    this app starts by editing questions, so I set edit question as a home component.  

    I found it easy to set styles within the html tag because it was hard to style the components,
    with css. I still do not know how to style the components within the css file. I definitely should
    ask professor about this matter.
    */
    
    const [profile, setProfile] = useState(defProfile);
    useEffect(() => {
        axios.get("http://localhost:2424/getProfileInfo?name=" + name)
            .then((res) => {
                setProfile(res.data.profile);
            })
            .catch((err) => console.log(err))
    }, [])

    const ROUTE = [
        {
            link: "/LD",
            text: "Log Day",
            element: <LD />,
        },
        {
            link: "/",
            text: "Edit Questions",
            element: <EQ name={name} />,
        },
        {
            link: "/VD",
            text: "View Data",
            element: <VD />,
        },
        {
            link: "/profile",
            element: <Profile name={name} img={profile || ""} setImg={setProfile} auth={auth} setAuth={setAuth} />
        }
    ];

    return (
        <>
            <BrowserRouter>
                <nav
                    style={{
                        display: "flex",
                        background: "white",
                        alignItems: "center",
                        width: "100vw",
                        padding: "20px",
                    }}
                >
                    <h2 className="logo">Day Logger</h2>
                    <div
                        style={{
                            display: "flex",
                            justifySelf: "center",
                        }}
                        className="selections"
                    >
                        {ROUTE.map((r, idx) => (
                            <NavLink
                                key={idx}
                                to={r.link}
                                style={({ isActive }) => ({
                                    color: isActive ? "#66bfbf" : "black",
                                    textDecoration: isActive
                                        ? "underline"
                                        : "none",
                                    marginInline: "10px",
                                })}
                            >
                                {r.text}
                            </NavLink>
                        ))}
                    </div>
                    <NavLink to={ROUTE[3].link}>
                        <img src={profile} id="me" />
                    </NavLink>
                </nav>
                <Routes>
                    {ROUTE.map((r, idx) => (
                        <Route key={idx} path={r.link} element={r.element} />
                    ))}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default NavBar;
