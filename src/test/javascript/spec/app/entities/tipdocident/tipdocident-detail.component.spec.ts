/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipdocidentDetailComponent } from '../../../../../../main/webapp/app/entities/tipdocident/tipdocident-detail.component';
import { TipdocidentService } from '../../../../../../main/webapp/app/entities/tipdocident/tipdocident.service';
import { Tipdocident } from '../../../../../../main/webapp/app/entities/tipdocident/tipdocident.model';

describe('Component Tests', () => {

    describe('Tipdocident Management Detail Component', () => {
        let comp: TipdocidentDetailComponent;
        let fixture: ComponentFixture<TipdocidentDetailComponent>;
        let service: TipdocidentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipdocidentDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipdocidentService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipdocidentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipdocidentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipdocidentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipdocident(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipdocident).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
