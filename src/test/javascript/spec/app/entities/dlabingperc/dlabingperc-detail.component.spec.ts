/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DlabingpercDetailComponent } from '../../../../../../main/webapp/app/entities/dlabingperc/dlabingperc-detail.component';
import { DlabingpercService } from '../../../../../../main/webapp/app/entities/dlabingperc/dlabingperc.service';
import { Dlabingperc } from '../../../../../../main/webapp/app/entities/dlabingperc/dlabingperc.model';

describe('Component Tests', () => {

    describe('Dlabingperc Management Detail Component', () => {
        let comp: DlabingpercDetailComponent;
        let fixture: ComponentFixture<DlabingpercDetailComponent>;
        let service: DlabingpercService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DlabingpercDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DlabingpercService,
                    JhiEventManager
                ]
            }).overrideTemplate(DlabingpercDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DlabingpercDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DlabingpercService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Dlabingperc(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.dlabingperc).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
