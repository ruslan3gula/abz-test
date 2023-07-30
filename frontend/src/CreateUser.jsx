import React, { useState } from "react";
import axios from "axios";
import { faker } from "@faker-js/faker";

export const CreateUser = ({ reload, setReload }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        name,
        avatar: faker.internet.avatar(),
        // avatar,
        extraField: "Custom data"
      };
      const response = await axios.post("http://localhost:3000/data", newUser);
      console.log("User created:", response.data);
      setReload(reload + 1);
      setName("");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button type="submit" onClick={handleSubmit}>
          Create User
        </button>
      </form>
    </div>
  );
};
