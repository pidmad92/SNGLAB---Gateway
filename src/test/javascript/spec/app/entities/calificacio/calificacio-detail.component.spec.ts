/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CalificacioDetailComponent } from '../../../../../../main/webapp/app/entities/calificacio/calificacio-detail.component';
import { CalificacioService } from '../../../../../../main/webapp/app/entities/calificacio/calificacio.service';
import { Calificacio } from '../../../../../../main/webapp/app/entities/calificacio/calificacio.model';

describe('Component Tests', () => {

    describe('Calificacio Management Detail Component', () => {
        let comp: CalificacioDetailComponent;
        let fixture: ComponentFixture<CalificacioDetailComponent>;
        let service: CalificacioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CalificacioDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CalificacioService,
                    JhiEventManager
                ]
            }).overrideTemplate(CalificacioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CalificacioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CalificacioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Calificacio(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.calificacio).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
