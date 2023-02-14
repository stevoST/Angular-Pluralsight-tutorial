import {Injectable} from "@angular/core";
import {Iproduct} from "./product";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json'

  constructor(private http: HttpClient) {
  }
  getProducts(): Observable<Iproduct[]> {
      return this.http.get<Iproduct>(this.productUrl);
  }
}
