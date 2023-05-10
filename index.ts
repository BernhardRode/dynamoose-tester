import * as dynamoose from "dynamoose";
import { randomUUID } from "crypto";

// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({ region: "eu-central-1" });

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

const options = { initialize: false };
const User = dynamoose.model("cubanops-devices-dev", {
  onboardingId: { type: String, required: true },
  clientId: { type: String, required: true },
  calponiaProjectId: {
    type: String,
    required: true,
  },
  onboardRequestedOn: { type: Date, default: Date.now },
  onboardedOn: { type: Date },
  timeout: { type: Number, required: true },
  refreshToken: { type: String, required: false },
  accessToken: { type: String, required: false },
  type: { type: String, required: true },
  ipAddress: { type: String, required: false },
  lastOnlineOn: { type: Date, required: false },
  supportAccessTimeStamp: { type: Number, required: false },
  sshTunnelPortNo: { type: String, required: false },
});

const uuid = randomUUID();
const myUser = new User({
  onboardingId: `onboarded-${uuid}`,
  clientId: `tim-the-client-${uuid}`,
  calponiaProjectId: "my-calponia-project",
  timeout: 1000,
  refreshToken: "refreshToken",
  accessToken: "accessToken",
  type: "demo",
});

console.log(myUser.onboardingId); // 1
// now save

myUser
  .save()
  .then(() => console.log("Saved"))
  .catch((err: Error) => console.error(err.message))
  .finally(() => console.log("finally"));
