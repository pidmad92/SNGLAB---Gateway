/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PaseDetailComponent } from '../../../../../../main/webapp/app/entities/pase/pase-detail.component';
import { PaseService } from '../../../../../../main/webapp/app/entities/pase/pase.service';
import { Pase } from '../../../../../../main/webapp/app/entities/pase/pase.model';

describe('Component Tests', () => {

    describe('Pase Management Detail Component', () => {
        let comp: PaseDetailComponent;
        let fixture: ComponentFixture<PaseDetailComponent>;
        let service: PaseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PaseDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PaseService,
                    JhiEventManager
                ]
            }).overrideTemplate(PaseDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Pase(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pase).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
