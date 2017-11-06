/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MenuPerfilDetailComponent } from '../../../../../../main/webapp/app/entities/menu-perfil/menu-perfil-detail.component';
import { MenuPerfilService } from '../../../../../../main/webapp/app/entities/menu-perfil/menu-perfil.service';
import { MenuPerfil } from '../../../../../../main/webapp/app/entities/menu-perfil/menu-perfil.model';

describe('Component Tests', () => {

    describe('MenuPerfil Management Detail Component', () => {
        let comp: MenuPerfilDetailComponent;
        let fixture: ComponentFixture<MenuPerfilDetailComponent>;
        let service: MenuPerfilService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [MenuPerfilDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MenuPerfilService,
                    JhiEventManager
                ]
            }).overrideTemplate(MenuPerfilDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MenuPerfilDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MenuPerfilService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MenuPerfil(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.menuPerfil).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
