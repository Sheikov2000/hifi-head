import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tracks"><button className="nav_button">View All Tracks</button></Link>
            </li>
            <li>
                <Link className="navbar__link" to="/NewTrackForm"><button className="nav_button">Submit New Track</button></Link>
            </li>
            {
                localStorage.getItem("hifi_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("hifi_user")
                            navigate("/", {replace: true})
                        }}><button className="nav_button">Logout</button></Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

