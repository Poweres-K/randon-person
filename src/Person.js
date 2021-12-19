import React, { useState, memo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import requiredIf from "react-required-if";

import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

const Person = ({ handleRandom, person, isLoading }) => {
  const [header, setHeader] = useState({ title: "", value: "" });

  const handleHover = (e) => {
    const targetName = e.target.getAttribute("data-lable");
    if (targetName) handleChangeDetails(targetName);
  };

  const handleChangeDetails = useCallback(
    (titleName) => {
      setHeader({ title: titleName, value: person[titleName] });
    },
    [person]
  );

  useEffect(() => {
    console.log("Person Render");
    handleChangeDetails("name");
  }, [handleChangeDetails]);

  return (
    <div className="container">
      <img src={person.thumbnail} className="user-img" alt="Error" />
      <p className="user-title">My {header.title} is</p>
      <p className="user-value">{header.value}</p>
      <div className="values-list">
        <button className="icon" data-lable="name" onMouseEnter={handleHover}>
          <FaUser />
        </button>

        <button className="icon" data-lable="email" onMouseEnter={handleHover}>
          <FaEnvelopeOpen />
        </button>

        <button className="icon" data-lable="age" onMouseEnter={handleHover}>
          <FaCalendarTimes />
        </button>

        <button className="icon" data-lable="street" onMouseEnter={handleHover}>
          <FaMap />
        </button>

        <button className="icon" data-lable="phone" onMouseEnter={handleHover}>
          <FaPhone />
        </button>

        <button
          className="icon"
          data-lable="password"
          onMouseEnter={handleHover}
        >
          <FaLock />
        </button>
      </div>
      <button className="btn" type="button" onClick={handleRandom}>
        {isLoading ? "...Loading" : "RANDOM USER"}
      </button>
    </div>
  );
};

Person.propTypes = {
  person: PropTypes.shape({
    name: requiredIf(PropTypes.string, (isLoading) => !isLoading),
    thumbnail: requiredIf(PropTypes.string, (isLoading) => !isLoading),
    age: requiredIf(PropTypes.number, (isLoading) => !isLoading),
    phone: requiredIf(PropTypes.string, (isLoading) => !isLoading),
  }).isRequired,
  handleRandom: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default memo(Person);
