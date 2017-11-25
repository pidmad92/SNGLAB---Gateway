/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MotceseDetailComponent } from '../../../../../../main/webapp/app/entities/motcese/motcese-detail.component';
import { MotceseService } from '../../../../../../main/webapp/app/entities/motcese/motcese.service';
import { Motcese } from '../../../../../../main/webapp/app/entities/motcese/motcese.model';

describe('Component Tests', () => {

    describe('Motcese Management Detail Component', () => {
        let comp: MotceseDetailComponent;
        let fixture: ComponentFixture<MotceseDetailComponent>;
        let service: MotceseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [MotceseDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MotceseService,
                    JhiEventManager
                ]
            }).overrideTemplate(MotceseDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MotceseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MotceseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Motcese(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.motcese).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
