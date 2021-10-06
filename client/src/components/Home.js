import React, { useEffect, useState } from 'react';

const Home = () => {

    const [userName, setUserName] = useState('');

    const [show, setShow] = useState(false);

    const callHomePage = async () => {
        try {
            const res = await fetch("/getData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callHomePage();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="home-page">
                <div className="home-div">
                    <p className="pt-5">WELCOME</p>
                    <h1>{userName}</h1>
                    <h2>{show ? 'Happy, to see you back' : 'This Website is Created by Full Stack Developer'}</h2>
                </div>
            </div>
        </>
    )
}

export default Home;