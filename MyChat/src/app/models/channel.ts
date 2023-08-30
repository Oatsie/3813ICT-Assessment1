export class Channel {
  id: string;
  name: string;
  messages: string[];

  constructor(id: string, name: string, messages: string[]) {
    this.id = id;
    this.name = name;
    this.messages = messages;
  }
}
