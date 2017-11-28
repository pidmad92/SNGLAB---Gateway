/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DiscapDetailComponent } from '../../../../../../main/webapp/app/entities/discap/discap-detail.component';
import { DiscapService } from '../../../../../../main/webapp/app/entities/discap/discap.service';
import { Discap } from '../../../../../../main/webapp/app/entities/discap/discap.model';

describe('Component Tests', () => {

    describe('Discap Management Detail Component', () => {
        let comp: DiscapDetailComponent;
        let fixture: ComponentFixture<DiscapDetailComponent>;
        let service: DiscapService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DiscapDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DiscapService,
                    JhiEventManager
                ]
            }).overrideTemplate(DiscapDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiscapDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscapService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Discap(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.discap).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
