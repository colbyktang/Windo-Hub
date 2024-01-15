/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// snippet-start:[javascript.v3.ec2.actions.StopInstances]
const { StopInstancesCommand } = require ("@aws-sdk/client-ec2");

const { client } = require ("../libs/client.js");

module.exports = async (instance_id) => {
  const command = new StopInstancesCommand({
    // Use DescribeInstancesCommand to find InstanceIds
    InstanceIds: [instance_id],
  });

  try {
    const { StoppingInstances } = await client.send(command);
    const instanceIdList = StoppingInstances.map(
      (instance) => ` • ${instance.InstanceId}`,
    );
    console.log("Stopping instances:");
    console.log(instanceIdList.join("\n"));
    return instanceIdList;
  } catch (err) {
    console.error(err);
    return err;
  }
};
// snippet-end:[javascript.v3.ec2.actions.StopInstances]