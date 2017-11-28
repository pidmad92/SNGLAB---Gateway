/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { OridenuDetailComponent } from '../../../../../../main/webapp/app/entities/oridenu/oridenu-detail.component';
import { OridenuService } from '../../../../../../main/webapp/app/entities/oridenu/oridenu.service';
import { Oridenu } from '../../../../../../main/webapp/app/entities/oridenu/oridenu.model';

describe('Component Tests', () => {

    describe('Oridenu Management Detail Component', () => {
        let comp: OridenuDetailComponent;
        let fixture: ComponentFixture<OridenuDetailComponent>;
        let service: OridenuService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [OridenuDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    OridenuService,
                    JhiEventManager
                ]
            }).overrideTemplate(OridenuDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OridenuDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OridenuService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Oridenu(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.oridenu).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
