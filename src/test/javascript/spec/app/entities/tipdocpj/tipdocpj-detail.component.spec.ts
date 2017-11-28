/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipdocpjDetailComponent } from '../../../../../../main/webapp/app/entities/tipdocpj/tipdocpj-detail.component';
import { TipdocpjService } from '../../../../../../main/webapp/app/entities/tipdocpj/tipdocpj.service';
import { Tipdocpj } from '../../../../../../main/webapp/app/entities/tipdocpj/tipdocpj.model';

describe('Component Tests', () => {

    describe('Tipdocpj Management Detail Component', () => {
        let comp: TipdocpjDetailComponent;
        let fixture: ComponentFixture<TipdocpjDetailComponent>;
        let service: TipdocpjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipdocpjDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipdocpjService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipdocpjDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipdocpjDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipdocpjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipdocpj(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipdocpj).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
