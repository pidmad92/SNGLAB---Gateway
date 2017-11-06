/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipoUsuarioDetailComponent } from '../../../../../../main/webapp/app/entities/tipo-usuario/tipo-usuario-detail.component';
import { TipoUsuarioService } from '../../../../../../main/webapp/app/entities/tipo-usuario/tipo-usuario.service';
import { TipoUsuario } from '../../../../../../main/webapp/app/entities/tipo-usuario/tipo-usuario.model';

describe('Component Tests', () => {

    describe('TipoUsuario Management Detail Component', () => {
        let comp: TipoUsuarioDetailComponent;
        let fixture: ComponentFixture<TipoUsuarioDetailComponent>;
        let service: TipoUsuarioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipoUsuarioDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipoUsuarioService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipoUsuarioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoUsuarioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoUsuarioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TipoUsuario(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipoUsuario).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
