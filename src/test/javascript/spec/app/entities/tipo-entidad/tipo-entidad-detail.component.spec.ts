/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipoEntidadDetailComponent } from '../../../../../../main/webapp/app/entities/tipo-entidad/tipo-entidad-detail.component';
import { TipoEntidadService } from '../../../../../../main/webapp/app/entities/tipo-entidad/tipo-entidad.service';
import { TipoEntidad } from '../../../../../../main/webapp/app/entities/tipo-entidad/tipo-entidad.model';

describe('Component Tests', () => {

    describe('TipoEntidad Management Detail Component', () => {
        let comp: TipoEntidadDetailComponent;
        let fixture: ComponentFixture<TipoEntidadDetailComponent>;
        let service: TipoEntidadService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipoEntidadDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipoEntidadService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipoEntidadDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoEntidadDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoEntidadService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TipoEntidad(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipoEntidad).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
