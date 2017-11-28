/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipcalperiDetailComponent } from '../../../../../../main/webapp/app/entities/tipcalperi/tipcalperi-detail.component';
import { TipcalperiService } from '../../../../../../main/webapp/app/entities/tipcalperi/tipcalperi.service';
import { Tipcalperi } from '../../../../../../main/webapp/app/entities/tipcalperi/tipcalperi.model';

describe('Component Tests', () => {

    describe('Tipcalperi Management Detail Component', () => {
        let comp: TipcalperiDetailComponent;
        let fixture: ComponentFixture<TipcalperiDetailComponent>;
        let service: TipcalperiService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipcalperiDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipcalperiService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipcalperiDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipcalperiDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipcalperiService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipcalperi(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipcalperi).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
