/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CargotrabajaDetailComponent } from '../../../../../../main/webapp/app/entities/cargotrabaja/cargotrabaja-detail.component';
import { CargotrabajaService } from '../../../../../../main/webapp/app/entities/cargotrabaja/cargotrabaja.service';
import { Cargotrabaja } from '../../../../../../main/webapp/app/entities/cargotrabaja/cargotrabaja.model';

describe('Component Tests', () => {

    describe('Cargotrabaja Management Detail Component', () => {
        let comp: CargotrabajaDetailComponent;
        let fixture: ComponentFixture<CargotrabajaDetailComponent>;
        let service: CargotrabajaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CargotrabajaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CargotrabajaService,
                    JhiEventManager
                ]
            }).overrideTemplate(CargotrabajaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CargotrabajaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CargotrabajaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Cargotrabaja(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.cargotrabaja).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
