/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipdocumentoDetailComponent } from '../../../../../../main/webapp/app/entities/tipdocumento/tipdocumento-detail.component';
import { TipdocumentoService } from '../../../../../../main/webapp/app/entities/tipdocumento/tipdocumento.service';
import { Tipdocumento } from '../../../../../../main/webapp/app/entities/tipdocumento/tipdocumento.model';

describe('Component Tests', () => {

    describe('Tipdocumento Management Detail Component', () => {
        let comp: TipdocumentoDetailComponent;
        let fixture: ComponentFixture<TipdocumentoDetailComponent>;
        let service: TipdocumentoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipdocumentoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipdocumentoService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipdocumentoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipdocumentoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipdocumentoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipdocumento(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipdocumento).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
