/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EmpleadorDetailComponent } from '../../../../../../main/webapp/app/entities/empleador/empleador-detail.component';
import { EmpleadorService } from '../../../../../../main/webapp/app/entities/empleador/empleador.service';
import { Empleador } from '../../../../../../main/webapp/app/entities/empleador/empleador.model';

describe('Component Tests', () => {

    describe('Empleador Management Detail Component', () => {
        let comp: EmpleadorDetailComponent;
        let fixture: ComponentFixture<EmpleadorDetailComponent>;
        let service: EmpleadorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [EmpleadorDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EmpleadorService,
                    JhiEventManager
                ]
            }).overrideTemplate(EmpleadorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmpleadorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmpleadorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Empleador(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.empleador).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
