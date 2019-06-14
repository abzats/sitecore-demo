import { Injectable } from '@angular/core';
import { BoolRef } from '../../classes/bool-ref';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient
    ) { }

    get(
        url: string,
        params?,
        loadingBool?: BoolRef
    ) {
        if (loadingBool) {
            loadingBool.value = true;
        }

        const options: any = {
            params: { },
            responseType: 'json'
        };


        if (params !== undefined && params !== null) {
            options.params = params;
        }

        return this.http.get(url, options)
            .pipe(
                map((response: any) => {
                    if (loadingBool) {
                        loadingBool.value = false;
                    }

                    return response;
                },
                catchError((e) => {
                    loadingBool.value = false;
                    return throwError(e);
                })));
    }
}
