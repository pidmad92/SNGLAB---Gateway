/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FormfinancDetailComponent } from '../../../../../../main/webapp/app/entities/formfinanc/formfinanc-detail.component';
import { FormfinancService } from '../../../../../../main/webapp/app/entities/formfinanc/formfinanc.service';
import { Formfinanc } from '../../../../../../main/webapp/app/entities/formfinanc/formfinanc.model';

describe('Component Tests', () => {

    describe('Formfinanc Management Detail Component', () => {
        let comp: FormfinancDetailComponent;
        let fixture: ComponentFixture<FormfinancDetailComponent>;
        let service: FormfinancService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FormfinancDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FormfinancService,
                    JhiEventManager
                ]
            }).overrideTemplate(FormfinancDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormfinancDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormfinancService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Formfinanc(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.formfinanc).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
