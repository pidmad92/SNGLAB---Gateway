/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipproveidDetailComponent } from '../../../../../../main/webapp/app/entities/tipproveid/tipproveid-detail.component';
import { TipproveidService } from '../../../../../../main/webapp/app/entities/tipproveid/tipproveid.service';
import { Tipproveid } from '../../../../../../main/webapp/app/entities/tipproveid/tipproveid.model';

describe('Component Tests', () => {

    describe('Tipproveid Management Detail Component', () => {
        let comp: TipproveidDetailComponent;
        let fixture: ComponentFixture<TipproveidDetailComponent>;
        let service: TipproveidService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipproveidDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipproveidService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipproveidDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipproveidDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipproveidService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipproveid(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipproveid).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
