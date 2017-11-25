/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DocpresateDetailComponent } from '../../../../../../main/webapp/app/entities/docpresate/docpresate-detail.component';
import { DocpresateService } from '../../../../../../main/webapp/app/entities/docpresate/docpresate.service';
import { Docpresate } from '../../../../../../main/webapp/app/entities/docpresate/docpresate.model';

describe('Component Tests', () => {

    describe('Docpresate Management Detail Component', () => {
        let comp: DocpresateDetailComponent;
        let fixture: ComponentFixture<DocpresateDetailComponent>;
        let service: DocpresateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DocpresateDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DocpresateService,
                    JhiEventManager
                ]
            }).overrideTemplate(DocpresateDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocpresateDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocpresateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Docpresate(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.docpresate).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
