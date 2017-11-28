/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { InfosoliDetailComponent } from '../../../../../../main/webapp/app/entities/infosoli/infosoli-detail.component';
import { InfosoliService } from '../../../../../../main/webapp/app/entities/infosoli/infosoli.service';
import { Infosoli } from '../../../../../../main/webapp/app/entities/infosoli/infosoli.model';

describe('Component Tests', () => {

    describe('Infosoli Management Detail Component', () => {
        let comp: InfosoliDetailComponent;
        let fixture: ComponentFixture<InfosoliDetailComponent>;
        let service: InfosoliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InfosoliDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    InfosoliService,
                    JhiEventManager
                ]
            }).overrideTemplate(InfosoliDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InfosoliDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InfosoliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Infosoli(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.infosoli).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
