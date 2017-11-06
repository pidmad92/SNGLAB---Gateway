/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { OficinaDetailComponent } from '../../../../../../main/webapp/app/entities/oficina/oficina-detail.component';
import { OficinaService } from '../../../../../../main/webapp/app/entities/oficina/oficina.service';
import { Oficina } from '../../../../../../main/webapp/app/entities/oficina/oficina.model';

describe('Component Tests', () => {

    describe('Oficina Management Detail Component', () => {
        let comp: OficinaDetailComponent;
        let fixture: ComponentFixture<OficinaDetailComponent>;
        let service: OficinaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [OficinaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    OficinaService,
                    JhiEventManager
                ]
            }).overrideTemplate(OficinaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OficinaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OficinaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Oficina(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.oficina).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
