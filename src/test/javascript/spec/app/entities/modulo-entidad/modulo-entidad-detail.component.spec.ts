/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ModuloEntidadDetailComponent } from '../../../../../../main/webapp/app/entities/modulo-entidad/modulo-entidad-detail.component';
import { ModuloEntidadService } from '../../../../../../main/webapp/app/entities/modulo-entidad/modulo-entidad.service';
import { ModuloEntidad } from '../../../../../../main/webapp/app/entities/modulo-entidad/modulo-entidad.model';

describe('Component Tests', () => {

    describe('ModuloEntidad Management Detail Component', () => {
        let comp: ModuloEntidadDetailComponent;
        let fixture: ComponentFixture<ModuloEntidadDetailComponent>;
        let service: ModuloEntidadService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ModuloEntidadDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ModuloEntidadService,
                    JhiEventManager
                ]
            }).overrideTemplate(ModuloEntidadDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ModuloEntidadDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModuloEntidadService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ModuloEntidad(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.moduloEntidad).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
