const jsonServer = require("json-server");
const { faker } = require("@faker-js/faker");
const _ = require("lodash");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Generate fake data
function generateData() {
  const data = [];

  for (let i = 1; i <= 10; i++) {
    const item = {
      id: i,
      name: faker.person.firstName(),
      avatar: faker.internet.avatar(),
      extraField: "Lorem ipsum",
    };

    data.push(item);
  }

  return { data };
}

// Populate data on server start
server.db = generateData();

// Implement custom routes
server.get("/data", (req, res) => {
  res.jsonp(server.db.data);
});

server.post("/data", (req, res) => {
  const newData = req.body;
  newData.id = server.db.data.length + 1;
  server.db.data.push(newData);
  res.jsonp(newData);
});

server.put("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  const index = _.findIndex(server.db.data, { id });

  if (index !== -1) {
    server.db.data[index] = { ...updatedData, id };
    res.jsonp(server.db.data[index]);
  } else {
    res.status(404).jsonp({ error: "Data not found." });
  }
});

server.delete("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = _.findIndex(server.db.data, { id });

  if (index !== -1) {
    const deletedData = server.db.data[index];
    server.db.data.splice(index, 1);
    res.jsonp(deletedData);
  } else {
    res.status(404).jsonp({ error: "Data not found." });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running on port 3000");
});
