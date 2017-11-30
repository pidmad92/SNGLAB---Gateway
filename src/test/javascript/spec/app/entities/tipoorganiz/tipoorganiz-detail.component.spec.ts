/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipoorganizDetailComponent } from '../../../../../../main/webapp/app/entities/tipoorganiz/tipoorganiz-detail.component';
import { TipoorganizService } from '../../../../../../main/webapp/app/entities/tipoorganiz/tipoorganiz.service';
import { Tipoorganiz } from '../../../../../../main/webapp/app/entities/tipoorganiz/tipoorganiz.model';

describe('Component Tests', () => {

    describe('Tipoorganiz Management Detail Component', () => {
        let comp: TipoorganizDetailComponent;
        let fixture: ComponentFixture<TipoorganizDetailComponent>;
        let service: TipoorganizService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipoorganizDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipoorganizService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipoorganizDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoorganizDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoorganizService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipoorganiz(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipoorganiz).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
