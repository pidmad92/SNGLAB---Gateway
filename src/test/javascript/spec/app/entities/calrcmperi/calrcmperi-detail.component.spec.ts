/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CalrcmperiDetailComponent } from '../../../../../../main/webapp/app/entities/calrcmperi/calrcmperi-detail.component';
import { CalrcmperiService } from '../../../../../../main/webapp/app/entities/calrcmperi/calrcmperi.service';
import { Calrcmperi } from '../../../../../../main/webapp/app/entities/calrcmperi/calrcmperi.model';

describe('Component Tests', () => {

    describe('Calrcmperi Management Detail Component', () => {
        let comp: CalrcmperiDetailComponent;
        let fixture: ComponentFixture<CalrcmperiDetailComponent>;
        let service: CalrcmperiService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CalrcmperiDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CalrcmperiService,
                    JhiEventManager
                ]
            }).overrideTemplate(CalrcmperiDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CalrcmperiDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CalrcmperiService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Calrcmperi(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.calrcmperi).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
