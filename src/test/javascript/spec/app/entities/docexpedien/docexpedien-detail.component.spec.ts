/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DocexpedienDetailComponent } from '../../../../../../main/webapp/app/entities/docexpedien/docexpedien-detail.component';
import { DocexpedienService } from '../../../../../../main/webapp/app/entities/docexpedien/docexpedien.service';
import { Docexpedien } from '../../../../../../main/webapp/app/entities/docexpedien/docexpedien.model';

describe('Component Tests', () => {

    describe('Docexpedien Management Detail Component', () => {
        let comp: DocexpedienDetailComponent;
        let fixture: ComponentFixture<DocexpedienDetailComponent>;
        let service: DocexpedienService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DocexpedienDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DocexpedienService,
                    JhiEventManager
                ]
            }).overrideTemplate(DocexpedienDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocexpedienDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocexpedienService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Docexpedien(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.docexpedien).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
