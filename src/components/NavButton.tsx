import { Link } from "react-router-dom";

const NavButton = (to : string) => {
  return (
    <Link to={`/${to}`}>
      <button className='button'>
        {'' ? "EQ" : to};
      </button>
    </Link>
  )
}

export default NavButton