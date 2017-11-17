/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipresconcDetailComponent } from '../../../../../../main/webapp/app/entities/tipresconc/tipresconc-detail.component';
import { TipresconcService } from '../../../../../../main/webapp/app/entities/tipresconc/tipresconc.service';
import { Tipresconc } from '../../../../../../main/webapp/app/entities/tipresconc/tipresconc.model';

describe('Component Tests', () => {

    describe('Tipresconc Management Detail Component', () => {
        let comp: TipresconcDetailComponent;
        let fixture: ComponentFixture<TipresconcDetailComponent>;
        let service: TipresconcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipresconcDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipresconcService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipresconcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipresconcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipresconcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipresconc(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipresconc).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
