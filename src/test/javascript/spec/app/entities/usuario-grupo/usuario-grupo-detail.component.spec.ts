/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UsuarioGrupoDetailComponent } from '../../../../../../main/webapp/app/entities/usuario-grupo/usuario-grupo-detail.component';
import { UsuarioGrupoService } from '../../../../../../main/webapp/app/entities/usuario-grupo/usuario-grupo.service';
import { UsuarioGrupo } from '../../../../../../main/webapp/app/entities/usuario-grupo/usuario-grupo.model';

describe('Component Tests', () => {

    describe('UsuarioGrupo Management Detail Component', () => {
        let comp: UsuarioGrupoDetailComponent;
        let fixture: ComponentFixture<UsuarioGrupoDetailComponent>;
        let service: UsuarioGrupoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [UsuarioGrupoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UsuarioGrupoService,
                    JhiEventManager
                ]
            }).overrideTemplate(UsuarioGrupoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuarioGrupoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioGrupoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UsuarioGrupo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.usuarioGrupo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
