import { TestBed } from '@angular/core/testing';

import { ListService } from './list.service';
import { ApiService } from '../../shared/services/api/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ]
    }));

    it('should be created', () => {
        const service: ListService = TestBed.get(ListService);
        expect(service).toBeTruthy();
    });

    it('should issue ApiService', () => {
        const service: ListService = TestBed.get(ListService);
        const apiService: ApiService = TestBed.get(ApiService);

        const spyApiService = spyOn(apiService, 'get').and.callThrough();
        service.getList({ page: 1, limit: 10 } ).subscribe();
        expect(spyApiService).toBeTruthy();
    });
});
