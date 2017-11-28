/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ConciliaDetailComponent } from '../../../../../../main/webapp/app/entities/concilia/concilia-detail.component';
import { ConciliaService } from '../../../../../../main/webapp/app/entities/concilia/concilia.service';
import { Concilia } from '../../../../../../main/webapp/app/entities/concilia/concilia.model';

describe('Component Tests', () => {

    describe('Concilia Management Detail Component', () => {
        let comp: ConciliaDetailComponent;
        let fixture: ComponentFixture<ConciliaDetailComponent>;
        let service: ConciliaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ConciliaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ConciliaService,
                    JhiEventManager
                ]
            }).overrideTemplate(ConciliaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConciliaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConciliaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Concilia(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.concilia).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
