/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { HechoinverDetailComponent } from '../../../../../../main/webapp/app/entities/hechoinver/hechoinver-detail.component';
import { HechoinverService } from '../../../../../../main/webapp/app/entities/hechoinver/hechoinver.service';
import { Hechoinver } from '../../../../../../main/webapp/app/entities/hechoinver/hechoinver.model';

describe('Component Tests', () => {

    describe('Hechoinver Management Detail Component', () => {
        let comp: HechoinverDetailComponent;
        let fixture: ComponentFixture<HechoinverDetailComponent>;
        let service: HechoinverService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [HechoinverDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    HechoinverService,
                    JhiEventManager
                ]
            }).overrideTemplate(HechoinverDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HechoinverDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HechoinverService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Hechoinver(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.hechoinver).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
