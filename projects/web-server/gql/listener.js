
// https://ignite.apache.org/docs/latest/messaging#remote-listen

// Ignite ignite = Ignition.ignite();

// IgniteMessaging rmtMsg = ignite.message(ignite.cluster().forRemotes());

// // Add listener for ordered messages on all remote nodes.
// rmtMsg.remoteListen("MyOrderedTopic", (nodeId, msg) -> {
//     System.out.println("Received ordered message [msg=" + msg + ", from=" + nodeId + ']');

//     return true; // Return true to continue listening.
// });

// // Send ordered messages to remote nodes.
// for (int i = 0; i < 10; i++)
//     rmtMsg.sendOrdered("MyOrderedTopic", Integer.toString(i),0);