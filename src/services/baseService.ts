import libPhoneNumber from "google-libphonenumber";
import * as cryptoJS from "crypto-js";

const phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();

export default class BaseService {
	protected formatMobilePhone(mobilePhone: string, culture: string) {
		try {
			const phoneNumber = phoneUtil.parseAndKeepRawInput(mobilePhone, culture);

			if (!phoneUtil.isValidNumber(phoneNumber)) {
				return undefined;
			}

			return phoneUtil.format(phoneNumber, libPhoneNumber.PhoneNumberFormat.E164);
		} catch (ex) {
			return undefined;
		}
	}

	protected encrypt(data: any, secret: string) {
		return cryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();
	}

	protected decrypt(data: any, secret: string) {
		let result = "";
		const bytes = cryptoJS.AES.decrypt(data, secret).toString(cryptoJS.enc.Utf8);
		if (bytes) {
			result = JSON.parse(bytes);
		}
		return result;
	}
}
