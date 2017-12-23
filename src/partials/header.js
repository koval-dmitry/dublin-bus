import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';


class Header extends Component {

    render() {
        const mainMenu = [
            {
                title: "My Stops",
                path: "/"
            },
            {
                title: "Nearby",
                path: "/nearby-stops"
            },
            {
                title: "Settings",
                path: "/settings"
            }
        ];
        return (
            <header>
                <ul className="stops-tabs">
                    {mainMenu.map((item, index) => {
                        return (
                            <li key={index}>
                                <NavLink
                                    to={item.path}
                                    activeClassName = "active-tab"
                                    exact
                                >
                                    {item.title}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </header>
        )
    }
}

export default Header