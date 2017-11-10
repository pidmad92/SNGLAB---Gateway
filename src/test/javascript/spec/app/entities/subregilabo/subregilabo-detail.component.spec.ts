/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SubregilaboDetailComponent } from '../../../../../../main/webapp/app/entities/subregilabo/subregilabo-detail.component';
import { SubregilaboService } from '../../../../../../main/webapp/app/entities/subregilabo/subregilabo.service';
import { Subregilabo } from '../../../../../../main/webapp/app/entities/subregilabo/subregilabo.model';

describe('Component Tests', () => {

    describe('Subregilabo Management Detail Component', () => {
        let comp: SubregilaboDetailComponent;
        let fixture: ComponentFixture<SubregilaboDetailComponent>;
        let service: SubregilaboService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SubregilaboDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SubregilaboService,
                    JhiEventManager
                ]
            }).overrideTemplate(SubregilaboDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubregilaboDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubregilaboService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Subregilabo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.subregilabo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
