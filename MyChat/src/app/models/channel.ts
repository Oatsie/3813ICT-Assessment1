export class Channel {
  _id: string;
  name: string;
  messages: string[];

  constructor(_id: string, name: string, messages: string[]) {
    this._id = _id;
    this.name = name;
    this.messages = messages;
  }
}
