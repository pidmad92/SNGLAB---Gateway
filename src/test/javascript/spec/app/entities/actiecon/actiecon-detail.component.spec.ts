/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ActieconDetailComponent } from '../../../../../../main/webapp/app/entities/actiecon/actiecon-detail.component';
import { ActieconService } from '../../../../../../main/webapp/app/entities/actiecon/actiecon.service';
import { Actiecon } from '../../../../../../main/webapp/app/entities/actiecon/actiecon.model';

describe('Component Tests', () => {

    describe('Actiecon Management Detail Component', () => {
        let comp: ActieconDetailComponent;
        let fixture: ComponentFixture<ActieconDetailComponent>;
        let service: ActieconService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ActieconDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ActieconService,
                    JhiEventManager
                ]
            }).overrideTemplate(ActieconDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ActieconDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActieconService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Actiecon(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.actiecon).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
