const users = require("./user.mongo");
const mongoConnect = require("./services");

mongoConnect();

//****OPERATIONS****

//**FIND**

//Without projection
const findUser = async (name) => {
  const result = await users.find({ name: "Hortense" });
  console.log(result);
};

//With projection - Inclusion
const findUser2 = async () => {
  const result = await users.find(
    { name: "Hortense" },
    { name: 1, age: 1, _id: 0, email: 0 }
  );
};

//with projection - Exclusion
const findUser3 = async () => {
  const result = await users.find(
    { name: "Hortense" },
    { email: 0, gender: 0, _id: 0 }
  );
  console.log(result);
};

//using comparison operator

const findUser4 = async () => {
  const result = await users.find({
    age: { $lt: 21 },
  });
  console.log(result);
};

findUser4();
