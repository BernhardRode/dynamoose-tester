const dynamoose = require("dynamoose");

// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB();

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

const TABLE_NAME = "cubanops-devices-dev";

const User = dynamoose.model("User", {
  onboardingId: { type: String, unique: true, required: true },
  clientId: { type: String, unique: true, required: true },
  calponiaProjectId: {
    type: String,
    unique: false,
    required: true,
    sparse: true,
  },
  onboardRequestedOn: { type: Date, default: Date.now },
  onboardedOn: { type: Date },
  timeout: { type: Number, required: true },
  refreshToken: { type: String, unique: true, required: false, sparse: true },
  accessToken: { type: String, unique: true, required: false, sparse: true },
  type: { type: String, required: true },
  ipAddress: { type: String, required: false },
  lastOnlineOn: { type: Date, required: false },
  supportAccessTimeStamp: { type: Number, required: false },
  sshTunnelPortNo: { type: String, required: false },
});

const options = { create: false };
const DynamoTable = new dynamoose.Table(TABLE_NAME, [User], options);

const myUser = new User({
  onboardingId: "onboarded",
  clientId: "tim-the-client",
  calponiaProjectId: "my-calponia-project",
  timeout: 1000,
  refreshToken: "refreshToken",
  accessToken: "accessToken",
  type: "demo",
});

console.log(myUser.id); // 1
// now save

myUser.save();
