export class Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  time: Date;
  channel: string;

  constructor(
    id: string,
    userId: string,
    username: string,
    content: string,
    time: Date,
    channel: string
  ) {
    this.id = id;
    this.userId = userId;
    this.username = username;
    this.content = content;
    this.time = time;
    this.channel = channel;
  }
}
