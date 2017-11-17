/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipnotifDetailComponent } from '../../../../../../main/webapp/app/entities/tipnotif/tipnotif-detail.component';
import { TipnotifService } from '../../../../../../main/webapp/app/entities/tipnotif/tipnotif.service';
import { Tipnotif } from '../../../../../../main/webapp/app/entities/tipnotif/tipnotif.model';

describe('Component Tests', () => {

    describe('Tipnotif Management Detail Component', () => {
        let comp: TipnotifDetailComponent;
        let fixture: ComponentFixture<TipnotifDetailComponent>;
        let service: TipnotifService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipnotifDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipnotifService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipnotifDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipnotifDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipnotifService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipnotif(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipnotif).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
