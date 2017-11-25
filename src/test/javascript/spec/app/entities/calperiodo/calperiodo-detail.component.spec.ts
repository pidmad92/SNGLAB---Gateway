/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CalperiodoDetailComponent } from '../../../../../../main/webapp/app/entities/calperiodo/calperiodo-detail.component';
import { CalperiodoService } from '../../../../../../main/webapp/app/entities/calperiodo/calperiodo.service';
import { Calperiodo } from '../../../../../../main/webapp/app/entities/calperiodo/calperiodo.model';

describe('Component Tests', () => {

    describe('Calperiodo Management Detail Component', () => {
        let comp: CalperiodoDetailComponent;
        let fixture: ComponentFixture<CalperiodoDetailComponent>;
        let service: CalperiodoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CalperiodoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CalperiodoService,
                    JhiEventManager
                ]
            }).overrideTemplate(CalperiodoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CalperiodoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CalperiodoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Calperiodo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.calperiodo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
