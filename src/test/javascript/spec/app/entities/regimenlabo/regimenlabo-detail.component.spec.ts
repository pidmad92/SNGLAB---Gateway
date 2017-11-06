/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RegimenlaboDetailComponent } from '../../../../../../main/webapp/app/entities/regimenlabo/regimenlabo-detail.component';
import { RegimenlaboService } from '../../../../../../main/webapp/app/entities/regimenlabo/regimenlabo.service';
import { Regimenlabo } from '../../../../../../main/webapp/app/entities/regimenlabo/regimenlabo.model';

describe('Component Tests', () => {

    describe('Regimenlabo Management Detail Component', () => {
        let comp: RegimenlaboDetailComponent;
        let fixture: ComponentFixture<RegimenlaboDetailComponent>;
        let service: RegimenlaboService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [RegimenlaboDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RegimenlaboService,
                    JhiEventManager
                ]
            }).overrideTemplate(RegimenlaboDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegimenlaboDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegimenlaboService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Regimenlabo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.regimenlabo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
