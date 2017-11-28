/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AccadoateDetailComponent } from '../../../../../../main/webapp/app/entities/accadoate/accadoate-detail.component';
import { AccadoateService } from '../../../../../../main/webapp/app/entities/accadoate/accadoate.service';
import { Accadoate } from '../../../../../../main/webapp/app/entities/accadoate/accadoate.model';

describe('Component Tests', () => {

    describe('Accadoate Management Detail Component', () => {
        let comp: AccadoateDetailComponent;
        let fixture: ComponentFixture<AccadoateDetailComponent>;
        let service: AccadoateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AccadoateDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AccadoateService,
                    JhiEventManager
                ]
            }).overrideTemplate(AccadoateDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AccadoateDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccadoateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Accadoate(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.accadoate).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
