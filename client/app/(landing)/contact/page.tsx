"use client";

// Importing modules
import React, { useState } from "react";
import emailjs from "emailjs-com";

// Importing icons
import { BsTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { HiLocationMarker } from "react-icons/hi";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPinterest,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

// Importing components
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";

function ContactPage() {
  function sendEmail(e: any) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_6e9p4ki",
        "template_szd1t2g",
        e.target,
        "hnGgBAvE8gHtmAvZw",
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Header styleElements={{ linksColor: "purple-header-links" }} />
      <div className="bg-[#1d043f] w-screen md:h-screen h-auto">
        <div className="flex justify-around items-center mx-20 md:flex-row flex-col">
          {/* textual content */}
          <div className="md:w-1/2 w-full md:p-10 my-10 md:my-0  flex-col">
            <h1 className="text-4xl font-semibold text-white ">Get In Touch</h1>
            <p className="text-gray-300 font-semibold text-sm my-5">
              Fill up the form & our Team will get back to you within 12 hours.
            </p>
            <div className="flex-col my-20 gap-5 flex  ">
              <div className="flex gap-5 p-4 border border-gray-500 hover:border-blue-700 md:w-1/2 w-full rounded-lg group cursor-pointer items-center">
                <BsTelephoneFill className="text-xl text-gray-500  group-hover:text-white" />
                <a href="tel:+21252234434554">
                  {" "}
                  <p className="text-gray-500 text-base font-semibold group-hover:text-white">
                    +212 52234434554
                  </p>
                </a>
              </div>
              <div className="flex gap-5 p-4 border border-gray-500 hover:border-blue-700 md:w-1/2 w-full rounded-lg group cursor-pointer items-center">
                <GrMail className="text-xl text-gray-500  group-hover:text-white" />
                <a href="mailto:iwa.dxc@gmail.com">
                  <p className="text-gray-500 text-base font-semibold group-hover:text-white">
                    dxc@gmail.com
                  </p>
                </a>
              </div>
              <div className="flex gap-5 p-4 border border-gray-500 hover:border-blue-700 md:w-1/2 w-full rounded-lg group cursor-pointer items-center">
                <HiLocationMarker className="text-xl text-gray-500  group-hover:text-white" />
                <a href="https://goo.gl/maps/MCkux9649tohXgNd8?coh=178571&entry=tt">
                  <p className="text-gray-500 text-base font-semibold group-hover:text-white">
                    Casablanca Nearshore,
                  </p>
                </a>
              </div>
            </div>

            <div className="flex gap-8  justify-center md:justify-start ">
              <FaInstagram className="text-2xl text-white hover:text-blue-700 cursor-pointer" />
              <FaTwitter className="text-2xl text-white hover:text-blue-700 cursor-pointer" />
              <FaLinkedin className="text-2xl text-white hover:text-blue-700 cursor-pointer" />
              <FaPinterest className="text-2xl text-white hover:text-blue-700 cursor-pointer" />
              <FaGithub className="text-2xl text-white hover:text-blue-700 cursor-pointer" />
            </div>
          </div>
          {/* Contact form */}
          <div className="bg-white p-12 rounded-lg shadow-md">
            <form onSubmit={sendEmail}>
              <div className="grid xl:grid-cols-2 xl:gap-10">
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="form-control block w-full px-3 py-2 mb-5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="First Name "
                  required={true}
                />

                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="form-control block w-full px-3 py-2 mb-5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Last Name "
                  //required=""
                />
              </div>
              <input
                type="email"
                name="email"
                className="form-control block w-full px-3 py-2 mb-5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email "
                required={true}
              />
              <input
                type="text"
                name="subject"
                className="form-control block w-full px-3 py-2 mb-5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Subject "
                required={true}
              />

              <div className="flex justify-center">
                <textarea
                  name="message"
                  className="form-control block w-full px-3 py-2 mb-5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlTextarea1"
                  //rows="3"
                  placeholder="Your message"
                  required={true}
                ></textarea>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-24 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <figure className="mt-10" style={{ marginTop: "-5px" }}>
              <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-3xl sm:leading-9">
                <p>
                  DXC Technology recognized by Gartner® as a Leader in the 2023
                  Magic Quadrant™ for Outsourced Digital Workplace Services
                </p>
              </blockquote>
            </figure>
          </div>
          <div
            id="google-maps-canvas"
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <iframe
              style={{
                height: "450px",
                width: "90%",
                border: "0",
              }}
              src="https://www.google.com/maps/embed/v1/place?q=Casablanca+Nearshore,+Boulevard+El+Qodsboulevard+El+Qods،+Casablanca+11000&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
            ></iframe>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default ContactPage;
