/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MotateDetailComponent } from '../../../../../../main/webapp/app/entities/motate/motate-detail.component';
import { MotateService } from '../../../../../../main/webapp/app/entities/motate/motate.service';
import { Motate } from '../../../../../../main/webapp/app/entities/motate/motate.model';

describe('Component Tests', () => {

    describe('Motate Management Detail Component', () => {
        let comp: MotateDetailComponent;
        let fixture: ComponentFixture<MotateDetailComponent>;
        let service: MotateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [MotateDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MotateService,
                    JhiEventManager
                ]
            }).overrideTemplate(MotateDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MotateDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MotateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Motate(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.motate).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
