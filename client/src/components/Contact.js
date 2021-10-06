import React, { useEffect, useState } from 'react';

const Contact = () => {

    const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

    const callContactPage = async () => {
        try {
            const res = await fetch("/getData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            console.log(data);
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callContactPage();
        // eslint-disable-next-line
    }, []);

    // We areStoring data in states
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]: value });
    }

    // We Send the Data to Backend
    const contactForm = async (e) => {
        e.preventDefault();

        const { name, email, phone, message } = userData;

        const res = await fetch('/contact', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json();

        if (!data) {
            console.log("Message not send");
        }
        else {
            alert("Message Sent");
            setUserData({ ...userData, message: "" })
        }
    }

    return (
        <>
            <div className="contact_info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
                            {/* Phone Number */}
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Phone
                                    </div>
                                    <div className="contact_info_text">
                                        +91 1111 543 2198
                                    </div>
                                </div>
                            </div>
                            {/* Email Id */}
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <img src="https://img.icons8.com/office/24/000000/email.png" alt="phone" />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Email Id
                                    </div>
                                    <div className="contact_info_text">
                                        contact@vkj.com
                                    </div>
                                </div>
                            </div>
                            {/* Address */}
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <img src="https://img.icons8.com/office/24/000000/address.png" alt="phone" />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Address
                                    </div>
                                    <div className="contact_info_text">
                                        Indore, MP, INDIA
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Us Form */}
            <div className="contact_form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="contact_form_container">
                                <div className="contact_form_title">
                                    Get In Touch
                                </div>
                                <form method="POST" id="contact_form">
                                    <div className="contact_form_name d-flex justify-content-between align-items-between">
                                        <input type="text"
                                            id="contact_form_name"
                                            className="contact_form_name input_field"
                                            placeholder="Your Name"
                                            name="name"
                                            value={userData.name}
                                            onChange={handleInputs}
                                            required="true"
                                        />

                                        <input type="email"
                                            id="contact_form_email"
                                            className="contact_form_email input_field"
                                            placeholder="Your Email"
                                            name="email"
                                            value={userData.email}
                                            onChange={handleInputs}
                                            required="true"
                                        />

                                        <input type="number"
                                            id="contact_form_phone"
                                            className="contact_form_phone input_field"
                                            placeholder="Your Phone Number"
                                            name="phone"
                                            value={userData.phone}
                                            onChange={handleInputs}
                                            required="true"
                                        />
                                    </div>

                                    <div className="contact_form_text mt-3">
                                        <textarea className="text_field contact_form_message"
                                            placeholder="Message"
                                            name="message"
                                            value={userData.message}
                                            onChange={handleInputs}
                                            cols="30"
                                            rows="10">
                                        </textarea>
                                    </div>

                                    <div className="contact_form_button">
                                        <button type="submit"
                                            className="button contact_submit_button"
                                            onClick={contactForm}>
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact;