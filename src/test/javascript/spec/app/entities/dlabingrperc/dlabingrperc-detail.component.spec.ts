/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DlabingrpercDetailComponent } from '../../../../../../main/webapp/app/entities/dlabingrperc/dlabingrperc-detail.component';
import { DlabingrpercService } from '../../../../../../main/webapp/app/entities/dlabingrperc/dlabingrperc.service';
import { Dlabingrperc } from '../../../../../../main/webapp/app/entities/dlabingrperc/dlabingrperc.model';

describe('Component Tests', () => {

    describe('Dlabingrperc Management Detail Component', () => {
        let comp: DlabingrpercDetailComponent;
        let fixture: ComponentFixture<DlabingrpercDetailComponent>;
        let service: DlabingrpercService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DlabingrpercDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DlabingrpercService,
                    JhiEventManager
                ]
            }).overrideTemplate(DlabingrpercDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DlabingrpercDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DlabingrpercService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Dlabingrperc(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.dlabingrperc).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
