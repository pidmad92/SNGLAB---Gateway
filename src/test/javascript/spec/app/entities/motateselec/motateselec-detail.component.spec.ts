/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MotateselecDetailComponent } from '../../../../../../main/webapp/app/entities/motateselec/motateselec-detail.component';
import { MotateselecService } from '../../../../../../main/webapp/app/entities/motateselec/motateselec.service';
import { Motateselec } from '../../../../../../main/webapp/app/entities/motateselec/motateselec.model';

describe('Component Tests', () => {

    describe('Motateselec Management Detail Component', () => {
        let comp: MotateselecDetailComponent;
        let fixture: ComponentFixture<MotateselecDetailComponent>;
        let service: MotateselecService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [MotateselecDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MotateselecService,
                    JhiEventManager
                ]
            }).overrideTemplate(MotateselecDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MotateselecDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MotateselecService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Motateselec(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.motateselec).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
