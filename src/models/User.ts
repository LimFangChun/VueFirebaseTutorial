export default class User {
    private id!: number;
    private name!: string;
    private lastLogin!: Date;

    
    constructor(id?: number, name?: string, lastLogin?: string) {
        this.id = id && id || -1;
        this.name = name && name || '';

        //if arg lastLogin is not null, parse to date, else get new Date
        this.lastLogin = lastLogin && new Date(lastLogin) || new Date();
    }

    fromJsonString(inputJson: string): void {
        let userJson = JSON.parse(inputJson);

        this.id = userJson.id;
        this.name = userJson.name;
        this.lastLogin = userJson.lastLogin && new Date(userJson.lastLogin) || new Date();
    }

    toJson(): string {
        let userJson = {
            id: this.id,
            name: this.name,
            lastLogin: this.lastLogin
        }

        return JSON.stringify(userJson);
    }
}