/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DiscapacidadDetailComponent } from '../../../../../../main/webapp/app/entities/discapacidad/discapacidad-detail.component';
import { DiscapacidadService } from '../../../../../../main/webapp/app/entities/discapacidad/discapacidad.service';
import { Discapacidad } from '../../../../../../main/webapp/app/entities/discapacidad/discapacidad.model';

describe('Component Tests', () => {

    describe('Discapacidad Management Detail Component', () => {
        let comp: DiscapacidadDetailComponent;
        let fixture: ComponentFixture<DiscapacidadDetailComponent>;
        let service: DiscapacidadService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DiscapacidadDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DiscapacidadService,
                    JhiEventManager
                ]
            }).overrideTemplate(DiscapacidadDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiscapacidadDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscapacidadService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Discapacidad(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.discapacidad).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
