/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { HoraDetailComponent } from '../../../../../../main/webapp/app/entities/hora/hora-detail.component';
import { HoraService } from '../../../../../../main/webapp/app/entities/hora/hora.service';
import { Hora } from '../../../../../../main/webapp/app/entities/hora/hora.model';

describe('Component Tests', () => {

    describe('Hora Management Detail Component', () => {
        let comp: HoraDetailComponent;
        let fixture: ComponentFixture<HoraDetailComponent>;
        let service: HoraService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [HoraDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    HoraService,
                    JhiEventManager
                ]
            }).overrideTemplate(HoraDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HoraDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoraService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Hora(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.hora).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
