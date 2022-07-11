import { makeAutoObservable } from "mobx";
import { isClient } from "../../utils/DOM";
import { UserFavoriteGame } from "../../src/generated/graphql";

export type AuthUser = {
	id?: number;
	code?: string;
	token?: string;
	email?: string;
	facebook_id?: string;
	google_id?: string;
	name?: string;
	profile?: UserProfile;
	ref_code?: string;
	role?: UserRole;
	status?: string;
	updated_at?: string;
	favorite_game?: UserFavoriteGame[];
	is_exist_pass?: boolean;
};

type UserProfile = {
	user_id?: number;
	user_name?: string | null;
	country_code?: string | null;
	display_name?: string;
	biography?: string;
	phone?: string;
	avatar?: string;
	cover?: string;
	totalEarning?: number;
	twitter?: string;
	facebook?: string;
	telegram?: string;
	twitch?: string;
	discord?: string;
	youtube?: string;
};

type UserRole = {
	Admin?: string;
	Customer?: string;
};

type AuthWallet = {
	address?: string;
	networkId?: number;
	chainId?: number;
	balance?: number;
};

export type TAuthInfo = AuthUser | AuthWallet;

class AuthStore implements AuthUser {
	private _id?: number;
	private _code?: string;
	private _token?: string;
	private _email?: string;
	private _facebook_id?: string;
	private _google_id?: string;
	private _name?: string;
	private _profile?: UserProfile;
	private _ref_code?: string;
	private _role?: UserRole;
	private _status?: string;
	private _updated_at?: string;
	private _balance?: string;
	private _loading: boolean = false;
	private _favorite_game?: UserFavoriteGame[];
	private _isLoggedIn?: boolean;
	private _is_exist_pass: boolean | undefined;

	public get isLoggedIn(): boolean | undefined {
		return this._isLoggedIn;
	}

	public get isHasMail(): boolean {
		return !!this._email;
	}

	constructor() {
		makeAutoObservable(this);
	}


	resetStates() {
		this._id = undefined;
		this._code = undefined;
		this._token = undefined;
		this._email = undefined;
		this._facebook_id = undefined;
		this._google_id = undefined;
		this._name = undefined;
		this._profile = undefined;
		this._ref_code = undefined;
		this._role = undefined;
		this._status = undefined;
		this._updated_at = undefined;
		this._favorite_game = undefined;
		this._isLoggedIn = false;
		this._is_exist_pass = undefined;
	}

	setAuthUser(user: AuthUser) {
		this._id = user.id;
		this._code = user.code;
		this._token = user.token;
		this._email = user.email;
		this._facebook_id = user.facebook_id;
		this._google_id = user.google_id;
		this._name = user.name;
		this._profile = user.profile;
		this._ref_code = user.ref_code;
		this._role = user.role;
		this._status = user.status;
		this._updated_at = user.updated_at;
		this._favorite_game = user.favorite_game;
		this._isLoggedIn = !!user.token;
		this._is_exist_pass = user.is_exist_pass;
	}

	/* ============= Getter & Setter ==============*/

	get id(): number | undefined {
		return this._id;
	}

	set id(value: number | undefined) {
		this._id = value;
	}

	get code(): string | undefined {
		return this._code;
	}

	set code(value: string | undefined) {
		this._code = value;
	}

	get token(): string | undefined {
		return this._token;
	}

	set token(value: string | undefined) {
		this._token = value;
	}

	get email(): string | undefined {
		return this._email;
	}

	set email(value: string | undefined) {
		this._email = value;
	}

	get facebook_id(): string | undefined {
		return this._facebook_id;
	}

	set facebook_id(value: string | undefined) {
		this._facebook_id = value;
	}

	get google_id(): string | undefined {
		return this._google_id;
	}

	set google_id(value: string | undefined) {
		this._google_id = value;
	}

	get name(): string | undefined {
		return this._name;
	}

	set name(value: string | undefined) {
		this._name = value;
	}

	get profile(): any {
		return this._profile;
	}

	set profile(value: UserProfile) {
		this._profile = value;
	}

	get role(): any {
		return this._role;
	}

	set role(value: UserRole) {
		this._role = value;
	}

	get ref_code(): string | undefined {
		return this._ref_code;
	}

	set ref_code(value: string | undefined) {
		this._ref_code = value;
	}

	get status(): string | undefined {
		return this._status;
	}

	set status(value: string | undefined) {
		this._status = value;
	}

	get updated_at(): string | undefined {
		return this._updated_at;
	}

	set updated_at(value: string | undefined) {
		this._updated_at = value;
	}

	get balance(): string | undefined {
		return this._balance;
	}

	set balance(value: string | undefined) {
		this._balance = value;
	}

	get loading(): boolean {
		return this._loading;
	}

	set loading(value: boolean) {
		this._loading = value;
	}

	get favorite_game(): UserFavoriteGame[] | undefined {
		return this._favorite_game;
	}

	set favorite_game(games: UserFavoriteGame[] | undefined) {
		this._favorite_game = games;
	}

	get is_exist_pass(): boolean {
		// @ts-ignore
		return this._is_exist_pass;
	}

	set is_exist_pass(value: boolean) {
		this._is_exist_pass = value;
	}
}

const s = new AuthStore();
if (isClient) {
	// @ts-ignore
	window.tmp__AuthStore = s;
}
export default s;
