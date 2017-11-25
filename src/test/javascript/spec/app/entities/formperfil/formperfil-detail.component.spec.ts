/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FormperfilDetailComponent } from '../../../../../../main/webapp/app/entities/formperfil/formperfil-detail.component';
import { FormperfilService } from '../../../../../../main/webapp/app/entities/formperfil/formperfil.service';
import { Formperfil } from '../../../../../../main/webapp/app/entities/formperfil/formperfil.model';

describe('Component Tests', () => {

    describe('Formperfil Management Detail Component', () => {
        let comp: FormperfilDetailComponent;
        let fixture: ComponentFixture<FormperfilDetailComponent>;
        let service: FormperfilService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FormperfilDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FormperfilService,
                    JhiEventManager
                ]
            }).overrideTemplate(FormperfilDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormperfilDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormperfilService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Formperfil(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.formperfil).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
