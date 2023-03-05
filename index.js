const users = require("./user.mongo");
const mongoConnect = require("./services");

//

mongoConnect();

//****OPERATIONS****

//**FIND**

//Without projection
const findUser = async () => {
  const result = await users.find({ name: "Hortense" });

  console.log(result);
  /* 
  {
    _id: new ObjectId("61f0518e4385bfe13cdf3c54"),
    name: 'Hortense',
    email: 'hbenford7@so-net.ne.jp',
    gender: 'Female',
    age: 8
  }
  */
};

//With projection - Inclusion
const findUser2 = async () => {
  const result = await users.find(
    { name: "Hortense" },
    { name: 1, age: 1, _id: 0 }
  );

  console.log(result);

  //{ name: 'Hortense', age: 8 }
};

//with projection - Exclusion
const findUser3 = async () => {
  const result = await users.find(
    { name: "Hortense" },
    { email: 0, gender: 0, _id: 0 }
  );
  console.log(result);

  //{ name: 'Hortense',, age: 8 }
};

//using comparison operator

const findUser4 = async () => {
  const result = await users.find({
    age: { $lt: 21 },
  });

  console.log(result);

  /*
  [
  {
    _id: new ObjectId("61f0518e4385bfe13cdf3c4d"),
    name: 'Liam',
    email: 'lbyneth0@tripod.com',
    gender: 'Female',
    age: 8
  },
  {
    _id: new ObjectId("61f0518e4385bfe13cdf3c50"),
    name: 'Haven',
    email: 'hmaundrell3@dailymotion.com',
    gender: 'Male',
    age: 4
  },
  ...
]
  */
};

findUser4();
