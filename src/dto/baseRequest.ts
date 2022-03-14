import UserDto from "./user";

export default class BaseRequest {
	constructor(public user: UserDto) {
	}
}
