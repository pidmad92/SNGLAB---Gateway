/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CalificaDetailComponent } from '../../../../../../main/webapp/app/entities/califica/califica-detail.component';
import { CalificaService } from '../../../../../../main/webapp/app/entities/califica/califica.service';
import { Califica } from '../../../../../../main/webapp/app/entities/califica/califica.model';

describe('Component Tests', () => {

    describe('Califica Management Detail Component', () => {
        let comp: CalificaDetailComponent;
        let fixture: ComponentFixture<CalificaDetailComponent>;
        let service: CalificaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CalificaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CalificaService,
                    JhiEventManager
                ]
            }).overrideTemplate(CalificaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CalificaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CalificaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Califica(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.califica).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
