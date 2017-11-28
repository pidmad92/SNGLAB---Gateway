/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipcalconreDetailComponent } from '../../../../../../main/webapp/app/entities/tipcalconre/tipcalconre-detail.component';
import { TipcalconreService } from '../../../../../../main/webapp/app/entities/tipcalconre/tipcalconre.service';
import { Tipcalconre } from '../../../../../../main/webapp/app/entities/tipcalconre/tipcalconre.model';

describe('Component Tests', () => {

    describe('Tipcalconre Management Detail Component', () => {
        let comp: TipcalconreDetailComponent;
        let fixture: ComponentFixture<TipcalconreDetailComponent>;
        let service: TipcalconreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipcalconreDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipcalconreService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipcalconreDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipcalconreDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipcalconreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipcalconre(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipcalconre).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
