import { async, TestBed, inject } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BoolRefClass } from '../../classes/bool-ref.class';

describe('ApiService', () => {

    const dummyUrlGet = 'https://api.test/get-request/';

    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            ApiService
        ]
    }));

    it('should be created', () => {
        const service: ApiService = TestBed.get(ApiService);
        expect(service).toBeTruthy();
    });

    it('get() should issue a get request',
        async(inject([ApiService, HttpTestingController], (service: ApiService, backend: HttpTestingController) => {
            service.get(dummyUrlGet).subscribe();

            backend.expectOne({
                url: dummyUrlGet,
                method: 'GET',
            });
        })));

    it('should toggle BoolRef parameter on success request',
        async(inject([ApiService, HttpTestingController], (service: ApiService, backend: HttpTestingController) => {
            let loading = BoolRefClass.True;

            service.get(dummyUrlGet, null, loading)
                .subscribe((next) => {
                    expect(next).toBeNull();
                    expect(loading.value).toBeFalsy();
                });

            backend.expectOne({
                url: dummyUrlGet,
                method: 'GET'
            }).flush(null,{ status: 200, statusText: 'Ok' });

        })));

    it('should toggle BoolRef parameter on error request',
        async(inject([ApiService, HttpTestingController], (service: ApiService, backend: HttpTestingController) => {
            let loading = BoolRefClass.True;

            service.get(dummyUrlGet, null, loading)
                .subscribe(() => {
                }, () => {
                    expect(loading.value).toBeFalsy();
                });

            backend.expectOne({
                url: dummyUrlGet,
                method: 'GET'
            }).flush(null, { status: 401, statusText: 'Unauthorized' });

        })));
});
