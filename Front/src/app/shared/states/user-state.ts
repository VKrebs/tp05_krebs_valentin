import { NgxsModule, Action, Selector, State, StateContext } from "@ngxs/store";
import { ConnectUser, DisconnectUser } from "../actions/user-actions";
import { UserStateModel } from './user-state-model';
import { User } from '../models/user';

@State<UserStateModel>({
    name: "userState",
    defaults: {
        connectedUser : null
    }
})

export class UserState {
    @Selector()
    static getToken(state: UserStateModel) : string
    {
        return state.connectedUser?.jwt_token;
    }

    @Selector()
    static getUser(state: UserStateModel) : User
    {
        return state.connectedUser;
    }

    @Selector()
    static isConnected(state: UserStateModel) : boolean
    {
        return state.connectedUser.jwt_token != null;
    }

    @Action(ConnectUser)
    set(
        { getState, patchState }: StateContext<UserStateModel>,
        { payload } : ConnectUser
    ) {
        const state = getState();

        if (payload.jwt_token == null) return;

        patchState({
            connectedUser : payload
        });
    }

    @Action(DisconnectUser)
    del (
        { getState, patchState }: StateContext<UserStateModel>,
    ) {
        const state = getState();
        patchState({
            connectedUser: null
        });
    }
}
