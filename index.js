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
  [{
    _id: new ObjectId("61f0518e4385bfe13cdf3c54"),
    name: 'Hortense',
    email: 'hbenford7@so-net.ne.jp',
    gender: 'Female',
    age: 8
  }]
  */
};

//With projection - Inclusion
const findUser2 = async () => {
  const result = await users.find(
    { name: "Hortense" }, //find all documents where name is "Hortense"
    { name: 1, age: 1, _id: 0 } //include the name and age fields while excluding the _id field.
  );

  console.log(result);

  //[{ name: 'Hortense', age: 8 }]
};

//with projection - Exclusion
const findUser3 = async () => {
  const result = await users.find(
    { name: "Hortense" },
    { email: 0, gender: 0, _id: 0 } //exclude the email, gender, and _id fields.
  );
  console.log(result);

  //[{ name: 'Hortense', age: 8 }]
};

//using comparison operators

const findUser4 = async () => {
  const result = await users.find({
    age: { $lt: 21 }, //we can also use $gt (greater than), $gte (greater than or equal to), $lte (less than or equal to), $ne (not equal to)
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

//use findOne to get only the first document that matches a query.

const findUser5 = async () => {
  const result = await users.findOne({ name: "Haven", gender: "Male" }); //find one document where name is "Haven" and gender is "Male"
  console.log(result);
  /*
  {
    _id: new ObjectId("61f0518e4385bfe13cdf3c50"),
    name: 'Haven',
    email: 'hmaundrell3@dailymotion.com',
    gender: 'Male',
    age: 4
  }
  */
};

findUser5();
