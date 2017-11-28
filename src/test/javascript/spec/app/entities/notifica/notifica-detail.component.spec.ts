/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { NotificaDetailComponent } from '../../../../../../main/webapp/app/entities/notifica/notifica-detail.component';
import { NotificaService } from '../../../../../../main/webapp/app/entities/notifica/notifica.service';
import { Notifica } from '../../../../../../main/webapp/app/entities/notifica/notifica.model';

describe('Component Tests', () => {

    describe('Notifica Management Detail Component', () => {
        let comp: NotificaDetailComponent;
        let fixture: ComponentFixture<NotificaDetailComponent>;
        let service: NotificaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [NotificaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    NotificaService,
                    JhiEventManager
                ]
            }).overrideTemplate(NotificaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotificaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Notifica(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.notifica).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
