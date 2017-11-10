/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UsuarioHorarioDetailComponent } from '../../../../../../main/webapp/app/entities/usuario-horario/usuario-horario-detail.component';
import { UsuarioHorarioService } from '../../../../../../main/webapp/app/entities/usuario-horario/usuario-horario.service';
import { UsuarioHorario } from '../../../../../../main/webapp/app/entities/usuario-horario/usuario-horario.model';

describe('Component Tests', () => {

    describe('UsuarioHorario Management Detail Component', () => {
        let comp: UsuarioHorarioDetailComponent;
        let fixture: ComponentFixture<UsuarioHorarioDetailComponent>;
        let service: UsuarioHorarioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [UsuarioHorarioDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UsuarioHorarioService,
                    JhiEventManager
                ]
            }).overrideTemplate(UsuarioHorarioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuarioHorarioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioHorarioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UsuarioHorario(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.usuarioHorario).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
