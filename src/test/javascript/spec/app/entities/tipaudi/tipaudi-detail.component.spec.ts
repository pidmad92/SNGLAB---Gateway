/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipaudiDetailComponent } from '../../../../../../main/webapp/app/entities/tipaudi/tipaudi-detail.component';
import { TipaudiService } from '../../../../../../main/webapp/app/entities/tipaudi/tipaudi.service';
import { Tipaudi } from '../../../../../../main/webapp/app/entities/tipaudi/tipaudi.model';

describe('Component Tests', () => {

    describe('Tipaudi Management Detail Component', () => {
        let comp: TipaudiDetailComponent;
        let fixture: ComponentFixture<TipaudiDetailComponent>;
        let service: TipaudiService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipaudiDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipaudiService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipaudiDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipaudiDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipaudiService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipaudi(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipaudi).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
