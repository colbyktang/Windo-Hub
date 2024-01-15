/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// snippet-start:[ec2.JavaScript.Instances.start_stopInstancesV3]
const { StartInstancesCommand } = require ("@aws-sdk/client-ec2");

const { client } = require ("../libs/client.js");

module.exports = async (instance_id) => {
  const command = new StartInstancesCommand({
    // Use DescribeInstancesCommand to find InstanceIds
    InstanceIds: [instance_id],
  });

  try {
    const { StartingInstances } = await client.send(command);
    const instanceIdList = StartingInstances.map(
      (instance) => ` • ${instance.InstanceId}`,
    );
    console.log("Starting instances:");
    console.log(instanceIdList.join("\n"));
    return instanceIdList;
  } catch (err) {
    console.error(err);
    return err;
  }
};
// snippet-end:[ec2.JavaScript.Instances.start_stopInstancesV3]