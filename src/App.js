import React, { useState, useEffect, useCallback } from "react";
import Person from "./Person";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [person, setPerson] = useState({
    name: "Random Person",
    email: "",
    age: 0,
    street: "",
    phone: "",
    password: "",
    thumbnail: defaultImage,
  });
  const [isLoading, setLoading] = useState(true);

  const handleRandom = useCallback(async () => {
    setLoading(true);
    const response = await fetch(url);
    const person = await response.json();
    const data = person.results[0];

    setPerson({
      name:
        data.name?.first && data.name?.last
          ? `${data.name?.first} ${data.name?.last}`
          : "Defalut name",
      email: data.email,
      age: data.dob?.age,
      street:
        data.location?.street?.number && data.location?.street?.name
          ? `${data.location?.street?.number} ${data.location?.street?.name}`
          : "defalut Location",
      phone: data.phone,
      password: data.login?.password || "defalut password",
      thumbnail: data.picture?.large || defaultImage,
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log("handle Radom run");
    handleRandom();
  }, [handleRandom]);

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <Person
          handleRandom={handleRandom}
          person={person}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}

export default App;
