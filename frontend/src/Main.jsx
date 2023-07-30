import { useState, useEffect } from "react";

import { CreateUser } from "./CreateUser";

export const Main = ({ reload, setReload }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/data");
      const data = await res.json();
      setUsers(data);
      console.log(data);
    }

    fetchData();
  }, [reload]);

  return (
    <div>
      <CreateUser reload={reload} setReload={setReload} />

      {users &&
        users.map((user) => {
          return (
            <div key={user.id}>
              <div>{user.name}</div>
              <img src={user.avatar} alt="" />
            </div>
          );
        })}
    </div>
  );
};
