/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AtencionpjDetailComponent } from '../../../../../../main/webapp/app/entities/atencionpj/atencionpj-detail.component';
import { AtencionpjService } from '../../../../../../main/webapp/app/entities/atencionpj/atencionpj.service';
import { Atencionpj } from '../../../../../../main/webapp/app/entities/atencionpj/atencionpj.model';

describe('Component Tests', () => {

    describe('Atencionpj Management Detail Component', () => {
        let comp: AtencionpjDetailComponent;
        let fixture: ComponentFixture<AtencionpjDetailComponent>;
        let service: AtencionpjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AtencionpjDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AtencionpjService,
                    JhiEventManager
                ]
            }).overrideTemplate(AtencionpjDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AtencionpjDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtencionpjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Atencionpj(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.atencionpj).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
