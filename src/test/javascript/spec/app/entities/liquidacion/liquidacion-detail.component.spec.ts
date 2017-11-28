/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LiquidacionDetailComponent } from '../../../../../../main/webapp/app/entities/liquidacion/liquidacion-detail.component';
import { LiquidacionService } from '../../../../../../main/webapp/app/entities/liquidacion/liquidacion.service';
import { Liquidacion } from '../../../../../../main/webapp/app/entities/liquidacion/liquidacion.model';

describe('Component Tests', () => {

    describe('Liquidacion Management Detail Component', () => {
        let comp: LiquidacionDetailComponent;
        let fixture: ComponentFixture<LiquidacionDetailComponent>;
        let service: LiquidacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [LiquidacionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LiquidacionService,
                    JhiEventManager
                ]
            }).overrideTemplate(LiquidacionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LiquidacionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LiquidacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Liquidacion(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.liquidacion).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
