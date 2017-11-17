/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EstexpedienDetailComponent } from '../../../../../../main/webapp/app/entities/estexpedien/estexpedien-detail.component';
import { EstexpedienService } from '../../../../../../main/webapp/app/entities/estexpedien/estexpedien.service';
import { Estexpedien } from '../../../../../../main/webapp/app/entities/estexpedien/estexpedien.model';

describe('Component Tests', () => {

    describe('Estexpedien Management Detail Component', () => {
        let comp: EstexpedienDetailComponent;
        let fixture: ComponentFixture<EstexpedienDetailComponent>;
        let service: EstexpedienService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [EstexpedienDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EstexpedienService,
                    JhiEventManager
                ]
            }).overrideTemplate(EstexpedienDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstexpedienDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstexpedienService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Estexpedien(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.estexpedien).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
