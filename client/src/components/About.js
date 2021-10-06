import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import pic from "../images/pics.jpg";
// import aboutpic from "../images/aboutpic.jpg";

const About = () => {

    const history = useHistory();

    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);
            setUserData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }
        catch (err) {
            console.log(err);
            history.push('/login');
        }
    }

    useEffect(() => {
        callAboutPage();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="container emp-profile">
                <form method="GET">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                {/* <img src={userData.name === "Vijayant Joshi" ? pic: aboutpic} alt="profile" /> */}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>{userData.name}</h5>
                                <h6>{userData.work}</h6>
                                <p className="profile-rating mt-3 mb-5"> RANKINGS: <span> 8.5/10 </span></p>

                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab">Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                        </div>

                    </div>

                    <div className="row">
                        {/* left side url */}
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p> WORK LINK </p>
                                <a href="https://iamvkj.github.io/iBlog/" target="_blog"> Blog Website</a> <br />
                                <a href="https://iamvkj.github.io/iEducate/" target="_eduction"> Education Website</a> <br />
                                <a href="https://ilivecovidtracker.herokuapp.com/" target="_liveCovid"> Live Covid Tracker</a> <br />
                                <a href="https://iweatherwebsite.herokuapp.com/" target="_weather"> Weather Website</a> <br />
                                <a href="https://idanceacademy.herokuapp.com/" target="_dance"> Dance Website</a> <br />
                            </div>
                        </div>
                        {/* right side data toggle */}
                        <div className="col-md-8 pl-5 about-info">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label> User ID </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData._id}</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label> Name </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.name}</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label> Email ID </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label> Phone </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.phone}</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label> Profession </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.work}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                    <div className='row mt-3'>
                                        <div className="col-md-6">
                                            <label> Experience </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Advanced</p>
                                        </div>
                                    </div>

                                    <div className='row mt-3'>
                                        <div className="col-md-6">
                                            <label> Hourly Work </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>9hr/d</p>
                                        </div>
                                    </div>

                                    <div className='row mt-3'>
                                        <div className="col-md-6">
                                            <label> Total Projetcs </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>11+</p>
                                        </div>
                                    </div>

                                    <div className='row mt-3'>
                                        <div className="col-md-6">
                                            <label> English Level </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Intermediate</p>
                                        </div>
                                    </div>

                                    <div className='row mt-3'>
                                        <div className="col-md-6">
                                            <label> Availability </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>On</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default About;