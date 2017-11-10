/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ConciliacionDetailComponent } from '../../../../../../main/webapp/app/entities/conciliacion/conciliacion-detail.component';
import { ConciliacionService } from '../../../../../../main/webapp/app/entities/conciliacion/conciliacion.service';
import { Conciliacion } from '../../../../../../main/webapp/app/entities/conciliacion/conciliacion.model';

describe('Component Tests', () => {

    describe('Conciliacion Management Detail Component', () => {
        let comp: ConciliacionDetailComponent;
        let fixture: ComponentFixture<ConciliacionDetailComponent>;
        let service: ConciliacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ConciliacionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ConciliacionService,
                    JhiEventManager
                ]
            }).overrideTemplate(ConciliacionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConciliacionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConciliacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Conciliacion(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.conciliacion).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
