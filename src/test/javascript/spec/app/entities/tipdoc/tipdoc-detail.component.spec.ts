/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipdocDetailComponent } from '../../../../../../main/webapp/app/entities/tipdoc/tipdoc-detail.component';
import { TipdocService } from '../../../../../../main/webapp/app/entities/tipdoc/tipdoc.service';
import { Tipdoc } from '../../../../../../main/webapp/app/entities/tipdoc/tipdoc.model';

describe('Component Tests', () => {

    describe('Tipdoc Management Detail Component', () => {
        let comp: TipdocDetailComponent;
        let fixture: ComponentFixture<TipdocDetailComponent>;
        let service: TipdocService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipdocDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipdocService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipdocDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipdocDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipdocService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipdoc(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipdoc).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
