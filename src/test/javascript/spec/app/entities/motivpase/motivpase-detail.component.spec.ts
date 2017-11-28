/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MotivpaseDetailComponent } from '../../../../../../main/webapp/app/entities/motivpase/motivpase-detail.component';
import { MotivpaseService } from '../../../../../../main/webapp/app/entities/motivpase/motivpase.service';
import { Motivpase } from '../../../../../../main/webapp/app/entities/motivpase/motivpase.model';

describe('Component Tests', () => {

    describe('Motivpase Management Detail Component', () => {
        let comp: MotivpaseDetailComponent;
        let fixture: ComponentFixture<MotivpaseDetailComponent>;
        let service: MotivpaseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [MotivpaseDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MotivpaseService,
                    JhiEventManager
                ]
            }).overrideTemplate(MotivpaseDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MotivpaseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MotivpaseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Motivpase(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.motivpase).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
