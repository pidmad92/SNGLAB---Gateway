/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ModuloDetailComponent } from '../../../../../../main/webapp/app/entities/modulo/modulo-detail.component';
import { ModuloService } from '../../../../../../main/webapp/app/entities/modulo/modulo.service';
import { Modulo } from '../../../../../../main/webapp/app/entities/modulo/modulo.model';

describe('Component Tests', () => {

    describe('Modulo Management Detail Component', () => {
        let comp: ModuloDetailComponent;
        let fixture: ComponentFixture<ModuloDetailComponent>;
        let service: ModuloService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ModuloDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ModuloService,
                    JhiEventManager
                ]
            }).overrideTemplate(ModuloDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ModuloDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModuloService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Modulo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.modulo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
