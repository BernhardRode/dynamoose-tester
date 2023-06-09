import * as dynamoose from "dynamoose";
import { randomUUID } from "crypto";
import { DeepPartial } from "dynamoose/dist/General";
import { TableOptions } from "dynamoose/dist/Table";

const run = async () => {
  // Create new DynamoDB instance
  const {
    CPS_DYNAMODB_INITIALIZE = "true",
    CPS_DYNAMODB_CREATE = "false",
    CPS_DYNAMODB_UPDATE = "true",
    CPS_SHOULD_SAVE = "false",
  } = process.env;
  const TABLE_NAME = "cubanops-devices-dev";
  const AWS_REGION = "eu-central-1";

  const ddb = new dynamoose.aws.ddb.DynamoDB({ region: AWS_REGION });

  const options: DeepPartial<TableOptions> = {
    initialize: CPS_DYNAMODB_INITIALIZE === "true",
    create: CPS_DYNAMODB_CREATE === "true",
    update: CPS_DYNAMODB_UPDATE === "true",
    throughput: "ON_DEMAND",
  };
  console.log("Options", options);

  const Device = dynamoose.model("Device", {
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

  new dynamoose.Table(TABLE_NAME, [Device], options);

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

  // now save
  if (CPS_SHOULD_SAVE === "true") {
    try {
      const result = await myDevice.save();
      console.log("SAVED", myDevice.onboardingId, result);
    } catch (e) {
      console.error((e as Error).message);
    }
    console.log("FINALLY");
  }
};

run();
