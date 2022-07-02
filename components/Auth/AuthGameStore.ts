import { makeAutoObservable } from "mobx";
import { isClient } from "../../utils/DOM";
import { UserFavoriteGame } from "../../src/generated/graphql";

export type AuthGameUser = {
    faceit_id?: string;
    faceit_access_token?: string
    faceit_id_token?: string;
    faceit_platform_id?: string;
    faceit_nick_name?: string;
    faceit_avatar?: string;

};


class AuthGameStore implements AuthGameUser {
    private _faceit_id?: string;
    private _faceit_access_token?: string
    private _faceit_id_token?: string;
    private _faceit_platform_id?: string;
    private _faceit_nick_name?: string;
    private _faceit_avatar?: string;
    private _isLoggedInFaceit?: boolean;


    public get isLoggedInFaceit(): boolean | undefined {
        return this._isLoggedInFaceit;
    }

    constructor() {
        makeAutoObservable(this);
    }


    resetStates() {
        this._faceit_id = undefined;
        this._faceit_access_token = undefined;
        this._faceit_id_token = undefined;
        this._faceit_platform_id = undefined;
        this._faceit_nick_name = undefined;
        this._faceit_avatar = undefined;
        this._isLoggedInFaceit = false;
    }

    setAuthGameUser(gameAccount: AuthGameUser) {
        this._faceit_id = gameAccount.faceit_id;
        this._faceit_access_token = gameAccount.faceit_access_token;
        this._faceit_id_token = gameAccount.faceit_id_token;
        this._faceit_platform_id = gameAccount.faceit_platform_id;
        this._faceit_nick_name = gameAccount.faceit_nick_name;
        this._faceit_avatar = gameAccount.faceit_avatar;
        this._isLoggedInFaceit = !!gameAccount.faceit_id_token;
    }

    /* ============= Getter & Setter ==============*/

    get faceit_id(): string | undefined {
        return this._faceit_id;
    }

    set faceit_id(faceitId: string | undefined) {
        this._faceit_id = faceitId;
    }

    get faceit_access_token(): string | undefined {
        return this._faceit_access_token;
    }

    set faceit_access_token(accessToken: string | undefined) {
        this._faceit_access_token = accessToken;
    }

    get faceit_platform_id(): string | undefined {
        return this._faceit_platform_id;
    }

    set faceit_platform_id(platformId: string | undefined) {
        this._faceit_platform_id = platformId;
    }

    get faceit_nick_name(): string | undefined {
        return this._faceit_nick_name;
    }

    set faceit_nick_name(nickName: string | undefined) {
        this._faceit_nick_name = nickName;
    }


    get faceit_id_token(): string | undefined {
        return this._faceit_id_token;
    }

    set faceit_id_token(tokenId: string | undefined) {
        this._faceit_id_token = tokenId;
    }

    get faceit_avatar(): string | undefined {
        return this._faceit_avatar;
    }

    set faceit_avatar(avatar: string | undefined) {
        this._faceit_avatar = avatar;
    }
}

const s = new AuthGameStore();
if (isClient) {
    // @ts-ignore
    window.tmp__AuthGameStore = s;
}
export default s;
