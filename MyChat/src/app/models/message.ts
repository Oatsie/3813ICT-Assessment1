export class Message {
  id: string;
  author: string;
  content: string;
  time: Date;
  channel: string;

  constructor(
    id: string,
    author: string,
    content: string,
    time: Date,
    channel: string
  ) {
    this.id = id;
    this.author = author;
    this.content = content;
    this.time = time;
    this.channel = channel;
  }
}
