/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { HoraconDetailComponent } from '../../../../../../main/webapp/app/entities/horacon/horacon-detail.component';
import { HoraconService } from '../../../../../../main/webapp/app/entities/horacon/horacon.service';
import { Horacon } from '../../../../../../main/webapp/app/entities/horacon/horacon.model';

describe('Component Tests', () => {

    describe('Horacon Management Detail Component', () => {
        let comp: HoraconDetailComponent;
        let fixture: ComponentFixture<HoraconDetailComponent>;
        let service: HoraconService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [HoraconDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    HoraconService,
                    JhiEventManager
                ]
            }).overrideTemplate(HoraconDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HoraconDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoraconService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Horacon(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.horacon).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
