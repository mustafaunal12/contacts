import libPhoneNumber from "google-libphonenumber";

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
}
