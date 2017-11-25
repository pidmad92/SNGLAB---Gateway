/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UndnegocioDetailComponent } from '../../../../../../main/webapp/app/entities/undnegocio/undnegocio-detail.component';
import { UndnegocioService } from '../../../../../../main/webapp/app/entities/undnegocio/undnegocio.service';
import { Undnegocio } from '../../../../../../main/webapp/app/entities/undnegocio/undnegocio.model';

describe('Component Tests', () => {

    describe('Undnegocio Management Detail Component', () => {
        let comp: UndnegocioDetailComponent;
        let fixture: ComponentFixture<UndnegocioDetailComponent>;
        let service: UndnegocioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [UndnegocioDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UndnegocioService,
                    JhiEventManager
                ]
            }).overrideTemplate(UndnegocioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UndnegocioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UndnegocioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Undnegocio(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.undnegocio).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
