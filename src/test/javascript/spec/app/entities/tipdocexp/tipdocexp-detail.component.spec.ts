/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipdocexpDetailComponent } from '../../../../../../main/webapp/app/entities/tipdocexp/tipdocexp-detail.component';
import { TipdocexpService } from '../../../../../../main/webapp/app/entities/tipdocexp/tipdocexp.service';
import { Tipdocexp } from '../../../../../../main/webapp/app/entities/tipdocexp/tipdocexp.model';

describe('Component Tests', () => {

    describe('Tipdocexp Management Detail Component', () => {
        let comp: TipdocexpDetailComponent;
        let fixture: ComponentFixture<TipdocexpDetailComponent>;
        let service: TipdocexpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipdocexpDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipdocexpService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipdocexpDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipdocexpDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipdocexpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipdocexp(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipdocexp).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
