/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LegajoasigDetailComponent } from '../../../../../../main/webapp/app/entities/legajoasig/legajoasig-detail.component';
import { LegajoasigService } from '../../../../../../main/webapp/app/entities/legajoasig/legajoasig.service';
import { Legajoasig } from '../../../../../../main/webapp/app/entities/legajoasig/legajoasig.model';

describe('Component Tests', () => {

    describe('Legajoasig Management Detail Component', () => {
        let comp: LegajoasigDetailComponent;
        let fixture: ComponentFixture<LegajoasigDetailComponent>;
        let service: LegajoasigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [LegajoasigDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LegajoasigService,
                    JhiEventManager
                ]
            }).overrideTemplate(LegajoasigDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LegajoasigDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LegajoasigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Legajoasig(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.legajoasig).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
