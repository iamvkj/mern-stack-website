import React from 'react';
import { NavLink } from 'react-router-dom';

const Errorpage = () => {
    return (
        <>
            <div id="notfound">
                <div className="hero-home">
                    <h1>404</h1>
                    <h3>WE ARE SORRY, PAGE NOT FOUND!</h3>
                    <p className="mb-5">
                        THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED HAD ITS NAME CHANGED OR ITS TEMPORARILY UNAVAILABLE.
                    </p>
                </div>
                <NavLink to="/"> Back To Homepage </NavLink>
            </div>
            {/* <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h3>WE ARE SORRY, PAGE NOT FOUND!</h3>
                    <p className="mb-5">
                        THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED HAD ITS NAME CHANGED OR ITS TEMPORARILY UNAVAILABLE.
                    </p>
                    <NavLink to="/"> Back To Homepage </NavLink>
                </div>
            </div> */}
        </>
    )
}

export default Errorpage;