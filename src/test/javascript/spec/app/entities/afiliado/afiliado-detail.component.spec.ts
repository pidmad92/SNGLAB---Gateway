/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AfiliadoDetailComponent } from '../../../../../../main/webapp/app/entities/afiliado/afiliado-detail.component';
import { AfiliadoService } from '../../../../../../main/webapp/app/entities/afiliado/afiliado.service';
import { Afiliado } from '../../../../../../main/webapp/app/entities/afiliado/afiliado.model';

describe('Component Tests', () => {

    describe('Afiliado Management Detail Component', () => {
        let comp: AfiliadoDetailComponent;
        let fixture: ComponentFixture<AfiliadoDetailComponent>;
        let service: AfiliadoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AfiliadoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AfiliadoService,
                    JhiEventManager
                ]
            }).overrideTemplate(AfiliadoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AfiliadoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AfiliadoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Afiliado(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.afiliado).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
