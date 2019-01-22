export default class Message {
    private id: number;
    private message: string;
    private dateCreated: Date;
    private senderId: number;

    constructor(id: number, message: string, dateCreated: string, senderId: number) {
        this.id = id;
        this.message = message;
        this.dateCreated = dateCreated && new Date(dateCreated) || new Date();
        this.senderId = senderId;
    }

    public fromJsonString(inputJson: string): void {
        let messageJson = JSON.parse(inputJson);

        this.id = messageJson.id;
        this.message = messageJson.message;
        this.dateCreated = messageJson.dateCreated;
        this.senderId = messageJson.senderId;
    }

    public toJson(): string {
        let messageJson = {
            id: this.id,
            message: this.message,
            dateCreated: this.dateCreated,
            senderId: this.senderId
        }

        return JSON.stringify(messageJson);
    }
}