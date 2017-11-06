/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MotatenoficDetailComponent } from '../../../../../../main/webapp/app/entities/motatenofic/motatenofic-detail.component';
import { MotatenoficService } from '../../../../../../main/webapp/app/entities/motatenofic/motatenofic.service';
import { Motatenofic } from '../../../../../../main/webapp/app/entities/motatenofic/motatenofic.model';

describe('Component Tests', () => {

    describe('Motatenofic Management Detail Component', () => {
        let comp: MotatenoficDetailComponent;
        let fixture: ComponentFixture<MotatenoficDetailComponent>;
        let service: MotatenoficService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [MotatenoficDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MotatenoficService,
                    JhiEventManager
                ]
            }).overrideTemplate(MotatenoficDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MotatenoficDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MotatenoficService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Motatenofic(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.motatenofic).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
