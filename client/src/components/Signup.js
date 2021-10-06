import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import signuppic from "../images/signup.svg";

const Signup = () => {

    const history = useHistory();

    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    });

    let name, value;
    const hadnleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
    }

    const postData = async (e) => {
        e.preventDefault();

        const { name, email, phone, work, password, cpassword } = user;

        const res = await fetch('/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        })

        const data = await res.json();

        if (data.status === 422 || !data) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        }
        else {
            window.alert("Registration Successful");
            console.log("Registration Successful");

            history.push("/login");
        }
    }

    return (
        <>
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign Up</h2>
                            <form method="POST" className="register-form" id="register-form">

                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i className="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="off"
                                        value={user.name}
                                        onChange={hadnleInputs}
                                        placeholder="Your Name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="text"
                                        name="email"
                                        id="email"
                                        autoComplete="off"
                                        value={user.email}
                                        onChange={hadnleInputs}
                                        placeholder="Your Email Id"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">
                                        <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                                    </label>
                                    <input type="number"
                                        name="phone"
                                        id="phone"
                                        autoComplete="off"
                                        value={user.phone}
                                        onChange={hadnleInputs}
                                        placeholder="Your Mobile Number"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="work">
                                        <i className="zmdi zmdi-slideshow material-icons-name"></i>
                                    </label>
                                    <input type="text"
                                        name="work"
                                        id="work"
                                        autoComplete="off"
                                        value={user.work}
                                        onChange={hadnleInputs}
                                        placeholder="Your Profession"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password"
                                        name="password"
                                        id="password"
                                        autoComplete="off"
                                        value={user.password}
                                        onChange={hadnleInputs}
                                        placeholder="Your Password"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cpassword">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password"
                                        name="cpassword"
                                        id="cpassword"
                                        autoComplete="off"
                                        value={user.cpassword}
                                        onChange={hadnleInputs}
                                        placeholder="Your Confirm Password"
                                    />
                                </div>

                                <div className="form-group form-button">
                                    <input type="submit"
                                        name="signup"
                                        id="signup"
                                        className="form-submit"
                                        value="Register"
                                        onClick={postData}
                                    />
                                </div>

                            </form>
                        </div>

                        <div className="signup-image">
                            <figure>
                                <img src={signuppic} alt="registration pic" />
                            </figure>
                            <NavLink to="/login" className="signup-image-link">I am already registerd</NavLink>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup;