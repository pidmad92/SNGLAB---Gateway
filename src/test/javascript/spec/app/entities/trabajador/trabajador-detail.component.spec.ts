/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TrabajadorDetailComponent } from '../../../../../../main/webapp/app/entities/trabajador/trabajador-detail.component';
import { TrabajadorService } from '../../../../../../main/webapp/app/entities/trabajador/trabajador.service';
import { Trabajador } from '../../../../../../main/webapp/app/entities/trabajador/trabajador.model';

describe('Component Tests', () => {

    describe('Trabajador Management Detail Component', () => {
        let comp: TrabajadorDetailComponent;
        let fixture: ComponentFixture<TrabajadorDetailComponent>;
        let service: TrabajadorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TrabajadorDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TrabajadorService,
                    JhiEventManager
                ]
            }).overrideTemplate(TrabajadorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrabajadorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrabajadorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Trabajador(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.trabajador).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
