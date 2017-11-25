/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DirperjuriDetailComponent } from '../../../../../../main/webapp/app/entities/dirperjuri/dirperjuri-detail.component';
import { DirperjuriService } from '../../../../../../main/webapp/app/entities/dirperjuri/dirperjuri.service';
import { Dirperjuri } from '../../../../../../main/webapp/app/entities/dirperjuri/dirperjuri.model';

describe('Component Tests', () => {

    describe('Dirperjuri Management Detail Component', () => {
        let comp: DirperjuriDetailComponent;
        let fixture: ComponentFixture<DirperjuriDetailComponent>;
        let service: DirperjuriService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DirperjuriDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DirperjuriService,
                    JhiEventManager
                ]
            }).overrideTemplate(DirperjuriDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DirperjuriDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DirperjuriService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Dirperjuri(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.dirperjuri).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
