import NavBar from "./components/NavBar"

interface UserProp {
    name: string
}

const Initial = ({ name }: UserProp) => {
    return (
        <NavBar name={name}/>
    )
}

export default Initial