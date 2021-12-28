import React from "react";
import { NavLink as Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="flex flex-row justify-center pt-8">
            <ul>
                <li className="inline">
                    <Link
                        to="/"
                        className="mr-2 md:mr-6 text-sm md:text-lg text-secondary"
                    >
                        Simply RSVP
                    </Link>
                </li>
                <li className="inline ml-4">
                    <Link
                        to="/"
                        className="border-b-2 border-transparent px-2 pb-2 md:px-4 text-xs md:text-lg hover:border-primary hover:border-b-2 hover:text-secondary duration-300"
                    >
                        Create
                    </Link>
                </li>
                <li className="inline ml-4">
                    <Link
                        to="/update"
                        className="border-b-2 border-transparent px-2 pb-2 md:px-4 text-xs md:text-lg hover:border-primary hover:border-b-2 hover:text-secondary duration-300"
                    >
                        Update
                    </Link>
                </li>
                <li className="inline ml-4">
                    <Link
                        to="/view"
                        className="border-b-2 border-transparent px-2 pb-2 md:px-4 text-xs md:text-lg hover:border-primary hover:border-b-2 hover:text-secondary duration-300"
                    >
                        View
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
