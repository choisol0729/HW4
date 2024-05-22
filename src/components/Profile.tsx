import defProfile from "../assets/defProfile.jpeg"
import { useEffect, useRef, useState } from "react";
import "../app.css"
import axios from "axios";

interface ProfileProp {
    name: string;
    img: string;
    setImg: React.Dispatch<React.SetStateAction<string>>;
    auth: boolean;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Info {
    name: string;
    email: string;
    address1: string;
    address2: string;
    profile: string;
}

const Profile = ({name, img, setImg, setAuth} : ProfileProp) => {
    const [info, setInfo] = useState<Info>({name: "", email: "", address1: "", address2: "", profile: ""});
    
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const uploadPreset = "xcc6te6m";
    
    useEffect(() => {
        axios.get<Info>("http://localhost:2424/getProfileInfo?name=" + name)
        .then((res) => {
            setInfo(res.data);
        })
    }, [])

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfo({
            ...info,
            name: e.target.value
        });
    }

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfo({
            ...info,
            email: e.target.value
        });
    }

    const changeAddr1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfo({
            ...info,
            address1: e.target.value
        });
    }

    const changeAddr2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfo({
            ...info,
            address2: e.target.value
        });
    }

    const save = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data:", info);
        axios.post("http://localhost:2424/saveProfileInfo?info=" + JSON.stringify(info));
        console.log("Saved!");
    }

    const chooseNewImg = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Choose New Image!");
        if(hiddenFileInput.current !== null)
            hiddenFileInput.current.click();
    }

    const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Received File!");
        var img = e.target.files;
        if(img?.length !== 0 && img !== null){
            console.log(img[0]);

            const formData = new FormData();
            formData.append('file', img[0]);
            formData.append('upload_preset', uploadPreset);

            axios.post("https://api-ap.cloudinary.com/v1_1/ddklwiz9z/image/upload", formData)
            .then((res) => {
                setImg(res.data.url);
                setInfo({
                    ...info,
                    profile: res.data.url
                })
            })
            .catch(err => console.log(err));
        }
    }

    const removeImg = () => {
        console.log("Remove Image!");
        setImg(defProfile);

        setInfo({
            ...info,
            profile: "https://res.cloudinary.com/ddklwiz9z/image/upload/v1716383089/tzcvb3rzpn8afwvl675k.jpg"
        })
    }

    const logout = () => {
        console.log("Log out!");
        setAuth(false);
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
                            <img src={img} id="me" onClick={(e) => chooseNewImg((e as unknown) as React.FormEvent<HTMLButtonElement>)}></img>
                            <input onChange={handleImgChange} type="file" accept="image/*" ref={hiddenFileInput} hidden/>
                            <button id="profileImgButton" onClick={chooseNewImg}>Choose New Image</button>
                            <a onClick={removeImg}>Remove Image</a>
                        </div>
                    </section>
                </div>
                <div className="cell">
                    <section style={{fontWeight: "bold"}}>
                        Name
                    </section>
                    <section>
                        <input value={info.name} onChange={changeName} style={{width: "100%", margin: '5px', padding: '5px'}} required/>
                    </section>
                </div>
                <div className="cell">
                    <section style={{fontWeight: "bold"}}>
                        Email
                    </section>
                    <section>
                        <input value={info.email} onChange={changeEmail} style={{width: "100%", margin: '5px', padding: '5px'}} required/>
                    </section>
                </div>
                <div className="cell">
                    <section style={{fontWeight: "bold"}}>
                        Address
                    </section>
                    <section>
                        <input value={info.address1} onChange={changeAddr1} style={{width: "100%", margin: '5px', padding: '5px'}} required/>
                        <input value={info.address2} onChange={changeAddr2} style={{width: "100%", margin: '5px', padding: '5px'}} required/>
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