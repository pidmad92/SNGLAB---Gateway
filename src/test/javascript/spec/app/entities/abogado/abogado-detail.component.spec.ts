/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AbogadoDetailComponent } from '../../../../../../main/webapp/app/entities/abogado/abogado-detail.component';
import { AbogadoService } from '../../../../../../main/webapp/app/entities/abogado/abogado.service';
import { Abogado } from '../../../../../../main/webapp/app/entities/abogado/abogado.model';

describe('Component Tests', () => {

    describe('Abogado Management Detail Component', () => {
        let comp: AbogadoDetailComponent;
        let fixture: ComponentFixture<AbogadoDetailComponent>;
        let service: AbogadoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AbogadoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AbogadoService,
                    JhiEventManager
                ]
            }).overrideTemplate(AbogadoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AbogadoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AbogadoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Abogado(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.abogado).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
