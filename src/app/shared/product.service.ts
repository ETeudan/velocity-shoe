import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { share, map } from 'rxjs/operators';

import { IProduct } from './product.model';


@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {
    }

    /* get products from Kodaris API */
    getProductsKodaris(): Observable<IProduct[]> {
        let options = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'X-CSRF-TOKEN': localStorage.getItem("token")
            })
        };
        return this.http.get<any>('https://velocitytestapp.kodaris.com/services/api/manager/products', options)
            .pipe(share(),
                  map((receivedData: any) => receivedData.data));
    }

    /* get a single product from Kodaris API, based on the uuid's product */
    getProductKodaris(uuid: string): Observable<IProduct> {
        let options = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'X-CSRF-TOKEN': localStorage.getItem("token")
            })
        };
        return this.http.get<any>('https://velocitytestapp.kodaris.com/services/api/manager/product/' + uuid, options)
            .pipe(map((receivedData: any) => receivedData.data));

    }

    /* update a product using Kodaris API */
    updateProductKodaris(product: IProduct): Observable<any>{
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': localStorage.getItem("token")
            }),
            withCredentials: true
        };
        let body = {
            uuid: product.uuid,
            code: product.code,
            name: product.name,
            description: product.description,
            price: product.price,
            rating: product.rating,
            manufacturer: product.manufacturer,
            shipping: product.shipping,
            color: product.color,
            size: product.size,
            inStock: product.inStock
        }
        return this.http.post<any>('https://velocitytestapp.kodaris.com/services/api/manager/product', body, options)
          .pipe(
              share(),
              map((response: any) => {
                  return of(response)
              }));
    }
}
