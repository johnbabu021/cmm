import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";
type Events = {
  subject: Subjects;
  data: any;
};
export abstract class Listner<T extends Events> {
  abstract subject: T["subject"];
  abstract queueGroupName: string;
  abstract onMessage(data: T["data"], msg: Message): void;
  private client: Stan;
  protected ackAwait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }
  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackAwait)
      .setDurableName(this.queueGroupName);
  }
  listen() {
    // console.log("hello");
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );
    subscription.on("message", (msg: Message) => {
      // console.log(msg);
      console.log(
        `message recived ${msg.getSequence()} ${this.subject}/${
          this.queueGroupName
        }`
      );
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }
  parseMessage(msg: Message) {
    const data = msg.getData();
    if (typeof data === "string") {
      return JSON.parse(data);
    }
    return JSON.parse(data.toString("utf-8"));
  }
}
