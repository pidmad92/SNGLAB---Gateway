/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MotfinDetailComponent } from '../../../../../../main/webapp/app/entities/motfin/motfin-detail.component';
import { MotfinService } from '../../../../../../main/webapp/app/entities/motfin/motfin.service';
import { Motfin } from '../../../../../../main/webapp/app/entities/motfin/motfin.model';

describe('Component Tests', () => {

    describe('Motfin Management Detail Component', () => {
        let comp: MotfinDetailComponent;
        let fixture: ComponentFixture<MotfinDetailComponent>;
        let service: MotfinService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [MotfinDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MotfinService,
                    JhiEventManager
                ]
            }).overrideTemplate(MotfinDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MotfinDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MotfinService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Motfin(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.motfin).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
