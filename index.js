const users = require("./user.mongo");
const mongoConnect = require("./services");
const ObjectId = require("mongoose").mongo.ObjectId;

mongoConnect();

//****OPERATIONS****
//NOTE: Commented next to every database operation is a sample output.

//**INSERT**

// Inserting a Single Document

const insertUser = async () => {
  const result = await users.insertMany([
    {
      name: "Kyle",
      age: 26,
    },
  ]);

  /*
  [
   {
     _id: new ObjectId("6419d9a3d199f0fa364430e6"),
    name: 'Kyle',
    age: 26,
    __v: 0
    }
  ]
  */
};

const insertUsers = async () => {
  const result = await users.insertMany([
    // Although not a good practice, it's possible to insert documents with the same field-value pairs
    // since MongoDB will create a unique _id value of type ObjectId for each document.
    {
      name: "Jane",
      age: 55,
    },
    {
      name: "Jane",
      age: 55,
    },
  ]);

  /*
[
  {
    name: 'Jane',
    age: 55,
    _id: new ObjectId("6419dabc80185085d6ec8905"),
    __v: 0
  },
  {
    name: 'Jane',
    age: 55,
    _id: new ObjectId("6419dabc80185085d6ec8906"),
    __v: 0
  }
]
  */
};

insertUsers();

//**FIND**

//Without projection
const findUser = async () => {
  const result = await users.find({ name: "Hortense" });

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

  //[{ name: 'Hortense', age: 8 }]
};

//with projection - Exclusion
const findUser3 = async () => {
  const result = await users.find(
    { name: "Hortense" },
    { email: 0, gender: 0, _id: 0 } //exclude the email, gender, and _id fields.
  );

  //[{ name: 'Hortense', age: 8 }]
};

//using comparison operators

const findUser4 = async () => {
  const result = await users.find({
    age: { $lt: 21 }, //we can also use $gt (greater than), $gte (greater than or equal to), $lte (less than or equal to), $ne (not equal to)
  });

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

//using findOne to get only the first document that matches a query.

const findUser5 = async () => {
  const result = await users.findOne({ name: "Haven", gender: "Male" }); //find one document where name is "Haven" and gender is "Male"

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

// *Counting Documents*

const countUsers = async () => {
  const result = await users.countDocuments({ age: { $lt: 21 } }); // We can use the same query filters that we would use with the 'find' method.

  //We get an integer value like: 13
};

// using $expr (Expressive Query Operator) - allows us to use aggregation expressions within MQL (MongoDB Query Language)

const findUser6 = async () => {
  const result = await users
    .find({
      $and: [
        { age: { $exists: true } }, // this line is necessary so that we only match documents with an 'age' field, or else since null < 21 it will match documents with no age field.
        { $expr: { $lt: ["$age", { $add: [20, 1] }] } },
      ],
    })
    .count();

  // 13
};

// Sorting Results
const findUser7 = async () => {
  const result = await users
    .find({}, { name: 1, age: 1, _id: 0 })
    .sort({ age: -1 }); //sort by age in Descending order

  /*
  [
  { name: 'Chick', age: 20 },
  { name: 'Delphine', age: 19 },
  { name: 'Esme', age: 18 },
  { name: 'Allianora', age: 17 },
  { name: 'Ginelle', age: 16 },
  { name: 'Kyla', age: 15 },
  { name: 'Florian', age: 14 },
  { name: 'Babbette', age: 13 },
  { name: 'Vivia', age: 12 },
  { name: 'Porter', age: 11 },
  { name: 'Willi', age: 10 },
  { name: 'Niven', age: 9 },
  { name: 'Liam', age: 8 },
  { name: 'Hortense', age: 8 },
  { name: 'Ofella', age: 7 },
  { name: 'Heddi', age: 6 },
  { name: 'Lynnea', age: 5 },
  { name: 'Haven', age: 4 },
]
  */
};

const findUser8 = async () => {
  const result = await users
    .find({}, { name: 1, age: 1, _id: 0 })
    .sort({ age: 1 }); //sort by age in Ascending order

  /*
  [{ name: 'Haven', age: 4 },
  { name: 'Lynnea', age: 5 },
  { name: 'Heddi', age: 6 },
  { name: 'Ofella', age: 7 },
  { name: 'Liam', age: 8 },
  { name: 'Hortense', age: 8 },
  { name: 'Niven', age: 9 },
  { name: 'Willi', age: 10 },
  { name: 'Porter', age: 11 },
  { name: 'Vivia', age: 12 },
  { name: 'Babbette', age: 13 },
  { name: 'Florian', age: 14 },
  { name: 'Kyla', age: 15 },
  { name: 'Ginelle', age: 16 },
  { name: 'Allianora', age: 17 },
  { name: 'Esme', age: 18 },
  { name: 'Delphine', age: 19 },
  { name: 'Chick', age: 20 }]
*/
};

// Skipping Results
const findUser9 = async () => {
  const result = await users
    .find({}, { name: 1, age: 1, _id: 0 })
    .sort({ age: 1 })
    .skip(5); // skip (don't include the first) 5 documents in the result set after sorting

  /*
  { name: 'Hortense', age: 8 },
  { name: 'Niven', age: 9 },
  { name: 'Willi', age: 10 },
  { name: 'Porter', age: 11 },
  { name: 'Vivia', age: 12 },
  { name: 'Babbette', age: 13 },
  { name: 'Florian', age: 14 },
  { name: 'Kyla', age: 15 },
  { name: 'Ginelle', age: 16 },
  { name: 'Allianora', age: 17 },
  { name: 'Esme', age: 18 },
  { name: 'Delphine', age: 19 },
  { name: 'Chick', age: 20 }]
  */
};

// Limiting Results

const findUser10 = async () => {
  const result = await users
    .find({}, { name: 1, age: 1, _id: 0 })
    .sort({ age: 1 })
    .skip(5)
    .limit(5); // limits the result set to only 5 results

  /*
  [{ name: 'Hortense', age: 8 },
  { name: 'Niven', age: 9 },
  { name: 'Willi', age: 10 },
  { name: 'Porter', age: 11 },
  { name: 'Vivia', age: 12 }]
  */
};

//**UPDATE**

//using updateOne
const updateUser = async () => {
  const result = await users.updateOne(
    // update the first document that matches the filter (first argument) and updates according to the update document (second argument)
    { name: "Hortense" },
    { $set: { age: 9 } }
  );

  /*
  {
    acknowledged: true,
    modifiedCount: 1,  -> number of documents that were modified
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 1   -> number of documents that matched the filter
  }
  */
};

//using findOneAndUpdate
const updateUser2 = async () => {
  const result = await users.findOneAndUpdate(
    // returns the original document before any modification was made
    { name: "Hortense" },
    { $set: { age: 10 } }
  );

  /*
  {
    name: 'Hortense',
    age: 8,
  }
  */
};

// updating multiple documents
const updateUsers = async () => {
  const result = await users.updateMany(
    { age: { $lt: 18 } },
    { $set: { minor: true } },
    { strict: false } // disabling strict mode since the 'minor' field is not defined in the mongoose schema
  );

  /*
  {
    acknowledged: true,
    modifiedCount: 15,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 15
  }
  */
};

// Replacing Documents

// using replaceOne
const replaceUser = async () => {
  const result = await users.replaceOne(
    {
      // filter document
      _id: new ObjectId("640e2463b6ccf14994e5a4b3"),
    },
    {
      // replacement document
      name: "Colt",
      age: 12,
      minor: true,
    }
  );

  /*
  {
    acknowledged: true,
    modifiedCount: 1,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 1
  }
  */
};

// using findOneAndReplace

const replaceUser2 = async () => {
  const result = await users.findOneAndReplace(
    // returns document before it was replaced (by default)
    { name: "Colt" },
    { name: "Chris", age: 19 }
  );

  /*
  {
  _id: new ObjectId("640e2463b6ccf14994e5a4b3"),
  age: 19,
  name: 'Chris'
  }
  */
};

// findOneAndReplace with returnDocument set to 'after'
const replaceUser3 = async () => {
  const result = await users.findOneAndReplace(
    { name: "Chris" },
    { name: "Abel", age: 24, minor: false }, // minor field will be ignored since it's not included in the schema
    { returnDocument: "after" } // returns the document after the replace operation, we can also use the new option, {new: true}, works the same
  );

  /*
  {
  _id: new ObjectId("640e2463b6ccf14994e5a4b3"),
  age: 24,
  name: 'Abel'
}
  */
};

replaceUser3();
