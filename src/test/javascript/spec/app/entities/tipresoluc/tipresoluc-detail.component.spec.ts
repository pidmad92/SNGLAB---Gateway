/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipresolucDetailComponent } from '../../../../../../main/webapp/app/entities/tipresoluc/tipresoluc-detail.component';
import { TipresolucService } from '../../../../../../main/webapp/app/entities/tipresoluc/tipresoluc.service';
import { Tipresoluc } from '../../../../../../main/webapp/app/entities/tipresoluc/tipresoluc.model';

describe('Component Tests', () => {

    describe('Tipresoluc Management Detail Component', () => {
        let comp: TipresolucDetailComponent;
        let fixture: ComponentFixture<TipresolucDetailComponent>;
        let service: TipresolucService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipresolucDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipresolucService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipresolucDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipresolucDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipresolucService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipresoluc(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipresoluc).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
