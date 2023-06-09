import { useState } from 'react'
import Login from './Login'
import './NavBar.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
// import logo from '../images/logo_1.png'
const NavBar = ({ showLogin, setShowLogin, isLoggedIn = false, userType }) => {
    const { pathname } = useRouter()
    const routerlog = useRouter()

    // const IsActive = pathname === url
    // const IsActive = pathname === url

    // const [showLogin, setShowLogin] = useState(false);
    const onClick = () => {
        // setShowLogin(true);
        setShowLogin(true)
    }







    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const svgStyle = {
        marginRight: "5px",
        marginBottom: "5px",
        color: "#fe0000",
        stroke: isHovered ? 'red' : 'black',
    };



    const logoutHelp = () => {
        // alert('hi')

        // Remove all data from localStorage
        window.localStorage.clear();

        // Redirect the user based on the provided parameter
        if (userType === 'user') {
            // routerlog.push('/');
            routerlog.reload()
        } else if (userType === 'admin') {
            routerlog.push('/admin/login');
        }
    };



    return (
        <>
            {/* header */}
            <header>
                {/* header inner */}
                <div className="header">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                                <div className="full">
                                    <div className="center-desk">
                                        <div className="logo">
                                            <Link href="/">
                                                {/* <Image src={"images/logo_1.png"} alt="#" /> */}
                                                <img src={"/images/logo_1.png"} alt="#" />
                                                {/* <img src={logo} alt="#" /> */}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                                <nav className="navigation navbar navbar-expand-md navbar-dark ">
                                    <button
                                        className="navbar-toggler"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#navbarsExample04"
                                        aria-controls="navbarsExample04"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                    >
                                        <span className="navbar-toggler-icon" />
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarsExample04">
                                        <ul className="navbar-nav mr-auto">
                                            <li className={`nav-item ${pathname == '/' ? 'active' : ''}  `} >
                                                <Link className="nav-link" href="/">
                                                    Home
                                                </Link>
                                            </li>
                                            <li className={`nav-item ${pathname == '/about-us' ? 'active' : ''}`}>
                                                <Link className="nav-link" href="about-us">
                                                    About
                                                </Link>
                                            </li>
                                            <li className={`nav-item ${pathname == '/room' ? 'active' : ''}`}>
                                                <Link className="nav-link" href="room">
                                                    Our room
                                                </Link>
                                            </li>
                                            <li className={`nav-item ${pathname == '/gallary' ? 'active' : ''}`}>
                                                <Link className="nav-link" href="gallery">
                                                    Gallery
                                                </Link>
                                            </li>
                                            <li className={`nav-item ${pathname == '/contact' ? 'active' : ''}`}>
                                                <Link className="nav-link" href="contact">
                                                    Contact Us
                                                </Link>
                                            </li>
                                            {isLoggedIn ? (
                                                <>
                                                    {userType == 'user' && (
                                                        <li className={`nav-item ${pathname == '/user-booking' ? 'active' : ''}`}>
                                                            <Link className="nav-link" href="user-booking">
                                                                Profile
                                                            </Link>
                                                        </li>
                                                    )}

                                                    <li className="nav-item">
                                                        <span onClick={logoutHelp} className="nav-link loginButton ">
                                                            Logout
                                                        </span>

                                                    </li>
                                                </>

                                            )
                                                :
                                                (
                                                    <>
                                                        <li className="nav-item">
                                                            <span onClick={onClick} className="nav-link loginButton " href="contact.html">
                                                                Login
                                                            </span>

                                                        </li>
                                                    </>
                                                )}
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* end header inner */}
            {/* end header */}
        </>
    )
}
export default NavBar