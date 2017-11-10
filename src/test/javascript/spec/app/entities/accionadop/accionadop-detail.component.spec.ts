/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AccionadopDetailComponent } from '../../../../../../main/webapp/app/entities/accionadop/accionadop-detail.component';
import { AccionadopService } from '../../../../../../main/webapp/app/entities/accionadop/accionadop.service';
import { Accionadop } from '../../../../../../main/webapp/app/entities/accionadop/accionadop.model';

describe('Component Tests', () => {

    describe('Accionadop Management Detail Component', () => {
        let comp: AccionadopDetailComponent;
        let fixture: ComponentFixture<AccionadopDetailComponent>;
        let service: AccionadopService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AccionadopDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AccionadopService,
                    JhiEventManager
                ]
            }).overrideTemplate(AccionadopDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AccionadopDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccionadopService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Accionadop(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.accionadop).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
