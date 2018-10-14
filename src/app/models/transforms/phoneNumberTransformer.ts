import {PhoneNumber} from '../PhoneNumber';

export function phoneNumberDeserialize(phoneNumber: string): PhoneNumber {
  if (phoneNumber) {
    const phone = new PhoneNumber();
    phone.areaCode = '1';
    phone.areaCode = phoneNumber.substr(0, 3);
    phone.exchange = phoneNumber.substr(3, 3);
    phone.lineNumber = phoneNumber.substr(5, 4);

    return phone;
  }

  return undefined;
}

export function phoneNumberSerialize(phoneNumber: PhoneNumber): string {
  return phoneNumber.countryCode.toString() + phoneNumber.areaCode.toString() + phoneNumber.exchange.toString() + phoneNumber.lineNumber.toString();
}
