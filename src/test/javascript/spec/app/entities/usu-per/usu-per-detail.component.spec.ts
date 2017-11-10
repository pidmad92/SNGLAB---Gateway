/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UsuPerDetailComponent } from '../../../../../../main/webapp/app/entities/usu-per/usu-per-detail.component';
import { UsuPerService } from '../../../../../../main/webapp/app/entities/usu-per/usu-per.service';
import { UsuPer } from '../../../../../../main/webapp/app/entities/usu-per/usu-per.model';

describe('Component Tests', () => {

    describe('UsuPer Management Detail Component', () => {
        let comp: UsuPerDetailComponent;
        let fixture: ComponentFixture<UsuPerDetailComponent>;
        let service: UsuPerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [UsuPerDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UsuPerService,
                    JhiEventManager
                ]
            }).overrideTemplate(UsuPerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuPerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuPerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UsuPer(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.usuPer).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
