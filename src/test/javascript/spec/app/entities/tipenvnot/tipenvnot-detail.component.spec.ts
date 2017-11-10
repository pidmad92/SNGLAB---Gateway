/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipenvnotDetailComponent } from '../../../../../../main/webapp/app/entities/tipenvnot/tipenvnot-detail.component';
import { TipenvnotService } from '../../../../../../main/webapp/app/entities/tipenvnot/tipenvnot.service';
import { Tipenvnot } from '../../../../../../main/webapp/app/entities/tipenvnot/tipenvnot.model';

describe('Component Tests', () => {

    describe('Tipenvnot Management Detail Component', () => {
        let comp: TipenvnotDetailComponent;
        let fixture: ComponentFixture<TipenvnotDetailComponent>;
        let service: TipenvnotService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipenvnotDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipenvnotService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipenvnotDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipenvnotDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipenvnotService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipenvnot(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipenvnot).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
