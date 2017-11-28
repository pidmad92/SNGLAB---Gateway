/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FormarchivoDetailComponent } from '../../../../../../main/webapp/app/entities/formarchivo/formarchivo-detail.component';
import { FormarchivoService } from '../../../../../../main/webapp/app/entities/formarchivo/formarchivo.service';
import { Formarchivo } from '../../../../../../main/webapp/app/entities/formarchivo/formarchivo.model';

describe('Component Tests', () => {

    describe('Formarchivo Management Detail Component', () => {
        let comp: FormarchivoDetailComponent;
        let fixture: ComponentFixture<FormarchivoDetailComponent>;
        let service: FormarchivoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FormarchivoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FormarchivoService,
                    JhiEventManager
                ]
            }).overrideTemplate(FormarchivoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormarchivoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormarchivoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Formarchivo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.formarchivo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
