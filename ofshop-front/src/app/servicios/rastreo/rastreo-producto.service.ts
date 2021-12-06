import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RastreoProductoService {

  constructor(private http: HttpClient) { this.http = http }
  data = {
  "referencesInformation": {
    "type": "BILL_OF_LADING",
    "value": "56754674567546754",
    "accountNumber": "XXX61073",
    "carrierCode": "FDXE",
    "shipDateBegin": "2019-02-13",
    "shipDateEnd": "2019-02-13",
    "destinationCountryCode": "US",
    "destinationPostalCode": "75063"
  },
  "includeDetailedScans": "true"
}
  rastrearProducto = ():Observable<any> => {
    const header = {"Content-Type":"application/json",
                    "X-locale":"en_US",
                    "Authorization":"Bearer"}
    const body = JSON.stringify(this.data);
    return this.http.post("https://apis-sandbox.fedex.com/track/v1/referencenumbers",body,{"headers":header});
  }
}
