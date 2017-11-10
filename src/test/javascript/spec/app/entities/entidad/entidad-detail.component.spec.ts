/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EntidadDetailComponent } from '../../../../../../main/webapp/app/entities/entidad/entidad-detail.component';
import { EntidadService } from '../../../../../../main/webapp/app/entities/entidad/entidad.service';
import { Entidad } from '../../../../../../main/webapp/app/entities/entidad/entidad.model';

describe('Component Tests', () => {

    describe('Entidad Management Detail Component', () => {
        let comp: EntidadDetailComponent;
        let fixture: ComponentFixture<EntidadDetailComponent>;
        let service: EntidadService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [EntidadDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EntidadService,
                    JhiEventManager
                ]
            }).overrideTemplate(EntidadDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntidadDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntidadService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Entidad(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.entidad).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
