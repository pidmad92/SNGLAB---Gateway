/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SolicitudDetailComponent } from '../../../../../../main/webapp/app/entities/solicitud/solicitud-detail.component';
import { SolicitudService } from '../../../../../../main/webapp/app/entities/solicitud/solicitud.service';
import { Solicitud } from '../../../../../../main/webapp/app/entities/solicitud/solicitud.model';

describe('Component Tests', () => {

    describe('Solicitud Management Detail Component', () => {
        let comp: SolicitudDetailComponent;
        let fixture: ComponentFixture<SolicitudDetailComponent>;
        let service: SolicitudService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SolicitudDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SolicitudService,
                    JhiEventManager
                ]
            }).overrideTemplate(SolicitudDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SolicitudDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SolicitudService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Solicitud(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.solicitud).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
