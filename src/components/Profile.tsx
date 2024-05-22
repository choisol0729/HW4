import profilePic from "../assets/profile.jpeg";
import defProfile from "../assets//defProfile.jpeg"
import "../app.css"
import { useRef, useState } from "react";

// interface ProfileProp {
//     name: string;
//     email: string;
//     address: string;
//     profilepic: string;
// }

const Profile = () => {
    const [profile, setProfile] = useState(profilePic);
    const [info, setInfo] = useState({
        name: "Sol Choi",
        email: "choisol0729@gmail.com",
        address: "119 Songdo Munhwaro | 120-1604",
        profilepic: "",
    });

    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const changeInfo = () => {
        console.log("Changing info!");
    }

    const save = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Saved!");
    }

    const chooseNewImg = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Choose New Image!");
        if(hiddenFileInput.current !== null)
            hiddenFileInput.current.click();
    }

    const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
        console.log("Received File!");
        var img = (e.target as HTMLInputElement).files;
        if(img?.length !== 0 && img !== null)
            console.log(img[0]);
    }

    const removeImg = () => {
        console.log("Remove Image!");
        setProfile(defProfile);
    }

    const logout = () => {
        console.log("Log out!");
    }

    return (
        <div className="container">
            <div style={{
                marginBlock: "15px",
                paddingInline: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <h2 style={{fontSize: "30px", marginInline: "10px"}}>Edit Profile</h2>
            </div>
            <form onSubmit={(e) => save(e)}>
                <div className="cell">
                    <section style={{fontWeight: "bold"}}>
                        Profile Photo
                    </section>
                    <section>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-around"
                        }}>
                            <img src={profile} id="me" onClick={(e) => chooseNewImg((e as unknown) as React.FormEvent<HTMLButtonElement>)}></img>
                            <input onChange={(e) => handleFileChange(e)} type="file" ref={hiddenFileInput} hidden/>
                            <button id="profileImgButton" onClick={(e) => chooseNewImg(e)}>Choose New Image</button>
                            <a onClick={removeImg}>Remove Image</a>
                        </div>
                    </section>
                </div>
                <div className="cell">
                    <section style={{fontWeight: "bold"}}>
                        Name
                    </section>
                    <section>
                        <input value={info.name} onChange={changeInfo} style={{width: "100%", margin: '5px', padding: '5px'}} required/>
                    </section>
                </div>
                <div className="cell">
                    <section style={{fontWeight: "bold"}}>
                        Email
                    </section>
                    <section>
                        <input value={info.email} onChange={changeInfo} style={{width: "100%", margin: '5px', padding: '5px'}} required/>
                    </section>
                </div>
                <div className="cell">
                    <section style={{fontWeight: "bold"}}>
                        Address
                    </section>
                    <section>
                        <input value={info.address.split(" | ")[0]} onChange={changeInfo} style={{width: "100%", margin: '5px', padding: '5px'}} required/>
                        <input value={info.address.split(" | ")[1]} onChange={changeInfo} style={{width: "100%", margin: '5px', padding: '5px'}} required/>
                    </section>
                </div>
                <div style={{
                    marginBlock: "15px",
                    paddingInline: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <button type="submit">Save</button>
                    <a onClick={logout}>Logout</a>
                </div>
            </form>
        </div>
    )
}

export default Profile