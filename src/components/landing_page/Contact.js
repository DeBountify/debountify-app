"use client";
import React, { useState } from "react";
import ChainLayer from "../common/ChainLayer";
import InputBox from "../common/InputBox";
import GradientButton from "../common/GradientButton";
import TextAreaInput from "../common/TextAreaInput";
import Image from "next/image";

const Contact = () => {
  const initialFormData = {
    name: "",
    phone: "",
    email: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState({});

  const onInputFunction = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setError((prevErrors) => ({
      ...prevErrors,
      [id]: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormErrors = {};

    // Validate inputs
    if (!formData.name) {
      newFormErrors.name = "Please enter your name";
    }
    if (!formData.phone) {
      newFormErrors.phone = "Please enter your phone number";
    } else if (formData.phone.length !== 10) {
      newFormErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.email) {
      newFormErrors.email = "Please enter your email address";
    } else if (!formData.email.includes("@")) {
      newFormErrors.email = "Please enter a valid email address";
    }
    if (!formData.message) {
      newFormErrors.message = "Please enter your message";
    }

    // If any errors, set the formErrors state
    if (Object.keys(newFormErrors).length > 0) {
      return setError(newFormErrors);
    }
    console.log(formData);
  };

  return (
    <div id="contact" className="py-4">
      <div className="grid grid-cols-2">
        <div className="grid grid-rows-2 relative">
          <ChainLayer
            className="left-10 rotate-180 bottom-[50%] opacity-80 h-40 w-40"
            img="traingle.png"
          />
          <div className="bg-white/10 backdrop-blur-sm rounded-ss-2xl rounded-es-2xl">
            <div className="flex justify-center flex-col p-4 text-white">
              <h2 className="marck text-3xl">Connect with us</h2>
              <p className="py-2 text-justify">
                Stay connected with our bug bounty community. Follow us on
                social media for the latest security updates and opportunities
                to collaborate.
              </p>
            </div>
          </div>
          <ChainLayer
            className="left-[30%] bottom-[10%] h-80 w-80"
            img="group.png"
          />
          {/* <div className="flex w-full justify-center items-center">
            <Image
              src="/images/undraw_contact_us.svg"
              alt="hero"
              width={800}
              height={800}
            />
          </div> */}
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-se-2xl rounded-ee-2xl p-4">
          <div className="flex my-4 justify-between flex-col p-4 text-white">
            <InputBox
              id="name"
              label="Full Name"
              value={formData.name}
              setFunction={onInputFunction}
              type="text"
              error={error.name}
            />
            <InputBox
              id="email"
              label="Email Address"
              value={formData.email}
              setFunction={onInputFunction}
              type="email"
              error={error.email}
            />
            <InputBox
              id="phone"
              label="Phone Number"
              value={formData.phone}
              setFunction={onInputFunction}
              type="number"
              onWheel={(e) => e.target.blur()}
              error={error.phone}
            />
            <TextAreaInput
              id="message"
              label="Message"
              value={formData.message}
              setFunction={onInputFunction}
              type="text"
              error={error.message}
            />
            <GradientButton
              className="w-full text-white bg-gradient-to-r from-btn_purple_l to-btn_purple_r"
              title="Send Message"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
