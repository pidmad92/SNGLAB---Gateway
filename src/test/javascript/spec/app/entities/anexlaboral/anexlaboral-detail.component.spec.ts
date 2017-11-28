/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AnexlaboralDetailComponent } from '../../../../../../main/webapp/app/entities/anexlaboral/anexlaboral-detail.component';
import { AnexlaboralService } from '../../../../../../main/webapp/app/entities/anexlaboral/anexlaboral.service';
import { Anexlaboral } from '../../../../../../main/webapp/app/entities/anexlaboral/anexlaboral.model';

describe('Component Tests', () => {

    describe('Anexlaboral Management Detail Component', () => {
        let comp: AnexlaboralDetailComponent;
        let fixture: ComponentFixture<AnexlaboralDetailComponent>;
        let service: AnexlaboralService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AnexlaboralDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AnexlaboralService,
                    JhiEventManager
                ]
            }).overrideTemplate(AnexlaboralDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnexlaboralDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnexlaboralService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Anexlaboral(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.anexlaboral).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
