/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PerfilDetailComponent } from '../../../../../../main/webapp/app/entities/perfil/perfil-detail.component';
import { PerfilService } from '../../../../../../main/webapp/app/entities/perfil/perfil.service';
import { Perfil } from '../../../../../../main/webapp/app/entities/perfil/perfil.model';

describe('Component Tests', () => {

    describe('Perfil Management Detail Component', () => {
        let comp: PerfilDetailComponent;
        let fixture: ComponentFixture<PerfilDetailComponent>;
        let service: PerfilService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PerfilDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PerfilService,
                    JhiEventManager
                ]
            }).overrideTemplate(PerfilDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PerfilDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerfilService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Perfil(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.perfil).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
