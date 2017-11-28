/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipinteresDetailComponent } from '../../../../../../main/webapp/app/entities/tipinteres/tipinteres-detail.component';
import { TipinteresService } from '../../../../../../main/webapp/app/entities/tipinteres/tipinteres.service';
import { Tipinteres } from '../../../../../../main/webapp/app/entities/tipinteres/tipinteres.model';

describe('Component Tests', () => {

    describe('Tipinteres Management Detail Component', () => {
        let comp: TipinteresDetailComponent;
        let fixture: ComponentFixture<TipinteresDetailComponent>;
        let service: TipinteresService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipinteresDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipinteresService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipinteresDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipinteresDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipinteresService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipinteres(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipinteres).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
