/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ReporteresDetailComponent } from '../../../../../../main/webapp/app/entities/reporteres/reporteres-detail.component';
import { ReporteresService } from '../../../../../../main/webapp/app/entities/reporteres/reporteres.service';
import { Reporteres } from '../../../../../../main/webapp/app/entities/reporteres/reporteres.model';

describe('Component Tests', () => {

    describe('Reporteres Management Detail Component', () => {
        let comp: ReporteresDetailComponent;
        let fixture: ComponentFixture<ReporteresDetailComponent>;
        let service: ReporteresService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ReporteresDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ReporteresService,
                    JhiEventManager
                ]
            }).overrideTemplate(ReporteresDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReporteresDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReporteresService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Reporteres(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.reporteres).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
