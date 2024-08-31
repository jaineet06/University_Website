import React from "react";
import "./Contact.css";
import msg_icon from "../../assets/msg-icon.png";
import phone_icon from "../../assets/phone-icon.png";
import mail_icon from "../../assets/mail-icon.png";
import location_icon from "../../assets/location-icon.png";
import white_arrow from "../../assets/white-arrow.png";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    const key = import.meta.env.VITE_API_KEY
    formData.append("access_key", `${key}`);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="contact">
      <div className="contact-col">
        <h3>
          Send Us message <img src={msg_icon} alt="" />
        </h3>
        <p>
          Feel free to reach oout through contact form or find our contact
          information below. Your feedback, questions, and suggestion are
          iportant to us as we strive to provide exceptional service to our
          university community.
        </p>
        <ul>
          <li>
            <img src={mail_icon} alt="" />
            Contact@edusity.in
          </li>
          <li>
            <img src={phone_icon} alt="" />
            +1 123-456-7890
          </li>
          <li>
            <img src={location_icon} alt="" />
            77 Vapi, Gujarat <br /> MA 02139, India
          </li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
          <label>Your Name</label>
          <input
            type="text"
            name="Name"
            placeholder="Enter your name"
            required
          />
          <label>Phone Number</label>
          <input
            type="tel"
            name="Phone no"
            placeholder="Enter your phone no"
            required
          />
          <label htmlFor="">Write your message here</label>
          <textarea
            name="message"
            rows="6"
            placeholder="Enter message here"
          ></textarea>
          <button type="submit" className="btn dark-btn">
            Submit <img src={white_arrow} alt="" />
          </button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
};

export default Contact;
