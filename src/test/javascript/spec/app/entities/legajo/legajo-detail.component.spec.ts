/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LegajoDetailComponent } from '../../../../../../main/webapp/app/entities/legajo/legajo-detail.component';
import { LegajoService } from '../../../../../../main/webapp/app/entities/legajo/legajo.service';
import { Legajo } from '../../../../../../main/webapp/app/entities/legajo/legajo.model';

describe('Component Tests', () => {

    describe('Legajo Management Detail Component', () => {
        let comp: LegajoDetailComponent;
        let fixture: ComponentFixture<LegajoDetailComponent>;
        let service: LegajoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [LegajoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LegajoService,
                    JhiEventManager
                ]
            }).overrideTemplate(LegajoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LegajoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LegajoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Legajo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.legajo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
