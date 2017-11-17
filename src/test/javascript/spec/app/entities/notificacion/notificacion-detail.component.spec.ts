/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { NotificacionDetailComponent } from '../../../../../../main/webapp/app/entities/notificacion/notificacion-detail.component';
import { NotificacionService } from '../../../../../../main/webapp/app/entities/notificacion/notificacion.service';
import { Notificacion } from '../../../../../../main/webapp/app/entities/notificacion/notificacion.model';

describe('Component Tests', () => {

    describe('Notificacion Management Detail Component', () => {
        let comp: NotificacionDetailComponent;
        let fixture: ComponentFixture<NotificacionDetailComponent>;
        let service: NotificacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [NotificacionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    NotificacionService,
                    JhiEventManager
                ]
            }).overrideTemplate(NotificacionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotificacionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Notificacion(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.notificacion).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
