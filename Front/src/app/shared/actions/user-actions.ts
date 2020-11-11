import { User } from "../models/user";

export class ConnectUser {
    static readonly type = "[User] Connect";
    constructor (public payload: User) {}
}

export class DisconnectUser {
    static readonly type = "[User] Disconnect";
    constructor () {}
}
