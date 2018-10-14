import {PhoneNumber} from '../PhoneNumber';

export function phoneNumberDeserialize(phoneNumber: string): PhoneNumber {
  if (phoneNumber) {
    const phone = new PhoneNumber();
    phone.countryCode = phoneNumber.substr(0, 1);
    phone.areaCode = phoneNumber.substr(1, 3);
    phone.exchange = phoneNumber.substr(4, 3);
    phone.lineNumber = phoneNumber.substr(7, 4);

    return phone;
  }

  return undefined;
}

export function phoneNumberSerialize(phoneNumber: PhoneNumber): string {
  return phoneNumber.countryCode.toString() + phoneNumber.areaCode.toString() + phoneNumber.exchange.toString() + phoneNumber.lineNumber.toString();
}
