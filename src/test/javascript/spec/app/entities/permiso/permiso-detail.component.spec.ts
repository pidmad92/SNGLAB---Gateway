/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PermisoDetailComponent } from '../../../../../../main/webapp/app/entities/permiso/permiso-detail.component';
import { PermisoService } from '../../../../../../main/webapp/app/entities/permiso/permiso.service';
import { Permiso } from '../../../../../../main/webapp/app/entities/permiso/permiso.model';

describe('Component Tests', () => {

    describe('Permiso Management Detail Component', () => {
        let comp: PermisoDetailComponent;
        let fixture: ComponentFixture<PermisoDetailComponent>;
        let service: PermisoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PermisoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PermisoService,
                    JhiEventManager
                ]
            }).overrideTemplate(PermisoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PermisoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PermisoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Permiso(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.permiso).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
