/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RecursoDetailComponent } from '../../../../../../main/webapp/app/entities/recurso/recurso-detail.component';
import { RecursoService } from '../../../../../../main/webapp/app/entities/recurso/recurso.service';
import { Recurso } from '../../../../../../main/webapp/app/entities/recurso/recurso.model';

describe('Component Tests', () => {

    describe('Recurso Management Detail Component', () => {
        let comp: RecursoDetailComponent;
        let fixture: ComponentFixture<RecursoDetailComponent>;
        let service: RecursoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [RecursoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RecursoService,
                    JhiEventManager
                ]
            }).overrideTemplate(RecursoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RecursoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RecursoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Recurso(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.recurso).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
