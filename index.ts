import * as dynamoose from "dynamoose";
import { randomUUID } from "crypto";

// Create new DynamoDB instance
const TABLE_NAME = "cubanops-devices-dev";
const AWS_REGION = "eu-central-1";

const ddb = new dynamoose.aws.ddb.DynamoDB({ region: AWS_REGION });

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

const options = { initialize: false, create: false };
const Device = dynamoose.model(
  TABLE_NAME,
  {
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
  },
  options
);

const uuid = randomUUID();
const myDevice = new Device({
  onboardingId: `onboarded-${uuid}`,
  clientId: `tim-the-client-${uuid}`,
  calponiaProjectId: "my-calponia-project",
  timeout: 1000,
  refreshToken: "refreshToken",
  accessToken: "accessToken",
  type: "demo",
});

console.log(myDevice.onboardingId); // 1
// now save

myDevice
  .save()
  .then(() => console.log("Saved"))
  .catch((err: Error) => console.error(err.message))
  .finally(() => console.log("Finally"));
