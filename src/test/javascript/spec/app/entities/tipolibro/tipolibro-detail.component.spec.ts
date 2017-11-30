/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipolibroDetailComponent } from '../../../../../../main/webapp/app/entities/tipolibro/tipolibro-detail.component';
import { TipolibroService } from '../../../../../../main/webapp/app/entities/tipolibro/tipolibro.service';
import { Tipolibro } from '../../../../../../main/webapp/app/entities/tipolibro/tipolibro.model';

describe('Component Tests', () => {

    describe('Tipolibro Management Detail Component', () => {
        let comp: TipolibroDetailComponent;
        let fixture: ComponentFixture<TipolibroDetailComponent>;
        let service: TipolibroService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipolibroDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipolibroService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipolibroDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipolibroDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipolibroService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipolibro(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipolibro).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
