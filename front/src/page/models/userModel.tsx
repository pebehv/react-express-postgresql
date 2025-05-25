export class User {
    id: number;
    name: string;
    password: string;
    email: string;
    isactive: boolean;

    constructor() {
        this.id = 0;
        this.name = "";
        this.password = "";
        this.email = "";
        this.isactive = false;
    }
}