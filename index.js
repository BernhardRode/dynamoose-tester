const dynamoose = require("dynamoose");
// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB();

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

const User = dynamoose.model("User", {"id": Number, "name": String});
const myUser = new User({
    "id": 1,
    "name": "Tim"
});
console.log(myUser.id); // 1
// now save

myUser.save()
