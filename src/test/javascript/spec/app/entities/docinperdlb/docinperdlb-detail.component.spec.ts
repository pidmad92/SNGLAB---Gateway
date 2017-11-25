/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DocinperdlbDetailComponent } from '../../../../../../main/webapp/app/entities/docinperdlb/docinperdlb-detail.component';
import { DocinperdlbService } from '../../../../../../main/webapp/app/entities/docinperdlb/docinperdlb.service';
import { Docinperdlb } from '../../../../../../main/webapp/app/entities/docinperdlb/docinperdlb.model';

describe('Component Tests', () => {

    describe('Docinperdlb Management Detail Component', () => {
        let comp: DocinperdlbDetailComponent;
        let fixture: ComponentFixture<DocinperdlbDetailComponent>;
        let service: DocinperdlbService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DocinperdlbDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DocinperdlbService,
                    JhiEventManager
                ]
            }).overrideTemplate(DocinperdlbDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocinperdlbDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocinperdlbService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Docinperdlb(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.docinperdlb).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
