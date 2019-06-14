import { Injectable } from '@angular/core';
import { BoolRefClass } from '../../shared/classes/bool-ref.class';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/services/api/api.service';

export interface ImageModel {
    id:           string;
    author:       string;
    width:        number;
    height:       number;
    url:          string;
    download_url: string;
}

export interface GetListRequest {
    page:   number;
    limit:  number;
}

@Injectable({
    providedIn: 'root'
})
export class ListService {

    private getListEndpoint = 'https://picsum.photos/v2/list';

    constructor(
        private apiService: ApiService
    ) { }

    getList(options: GetListRequest, loadingBool?: BoolRefClass): Observable<Array<ImageModel>> {
        return this.apiService.get(this.getListEndpoint, options, loadingBool);
    }
}
