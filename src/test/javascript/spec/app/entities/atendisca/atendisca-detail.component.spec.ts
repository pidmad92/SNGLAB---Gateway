/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AtendiscaDetailComponent } from '../../../../../../main/webapp/app/entities/atendisca/atendisca-detail.component';
import { AtendiscaService } from '../../../../../../main/webapp/app/entities/atendisca/atendisca.service';
import { Atendisca } from '../../../../../../main/webapp/app/entities/atendisca/atendisca.model';

describe('Component Tests', () => {

    describe('Atendisca Management Detail Component', () => {
        let comp: AtendiscaDetailComponent;
        let fixture: ComponentFixture<AtendiscaDetailComponent>;
        let service: AtendiscaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AtendiscaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AtendiscaService,
                    JhiEventManager
                ]
            }).overrideTemplate(AtendiscaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AtendiscaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtendiscaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Atendisca(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.atendisca).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
