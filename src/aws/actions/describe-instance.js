/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/ec2/command/DescribeInstancesCommand/

// snippet-start:[ec2.JavaScript.Instances.describeInstancesV3]
const { DescribeInstancesCommand } = require ("@aws-sdk/client-ec2");

const { client } = require ("../libs/client.js");

// List all of your EC2 instances running with x86_64 architecture that were
// launched this month.
module.exports = async (input) => {
    const command = new DescribeInstancesCommand(input);
    try {
        const { Reservations } = await client.send(command);
        const instanceList = Reservations.reduce((prev, current) => {
          return prev.concat(current.Instances);
        }, []);
    
        console.log(instanceList);
        return instanceList;
      } catch (err) {
        console.error(err);
        return err;
      }
      
};