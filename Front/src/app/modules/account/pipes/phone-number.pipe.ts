import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(tel: string): string {
    if (tel == null) return tel;

    let cleaned:string = tel.trim().replace(/\s/g, '');
    cleaned = cleaned.trim().replace(/\+/g, '');

    let countryCode:string = "+";

    // Isolate country code
    for (let i:number = 0; i < cleaned.length - 9; i++)
    {
      countryCode+=cleaned[i];
    }

    let holder:string[] = [];
    let i:number = countryCode.length > 1 ? countryCode.length : 0;
    let firstdigit:string = countryCode.length > 1  && cleaned[countryCode.length-1] != "0" ? cleaned[countryCode.length - 1] + " " : "";

    while (i < cleaned.length)
    {
      holder.push(cleaned.substring(i, i+2));
      i+=2;
    }

    let res:string = countryCode + " " + firstdigit + holder.join(' ');

    return res;
  }

}
