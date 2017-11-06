/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DocingrepercDetailComponent } from '../../../../../../main/webapp/app/entities/docingreperc/docingreperc-detail.component';
import { DocingrepercService } from '../../../../../../main/webapp/app/entities/docingreperc/docingreperc.service';
import { Docingreperc } from '../../../../../../main/webapp/app/entities/docingreperc/docingreperc.model';

describe('Component Tests', () => {

    describe('Docingreperc Management Detail Component', () => {
        let comp: DocingrepercDetailComponent;
        let fixture: ComponentFixture<DocingrepercDetailComponent>;
        let service: DocingrepercService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DocingrepercDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DocingrepercService,
                    JhiEventManager
                ]
            }).overrideTemplate(DocingrepercDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocingrepercDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocingrepercService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Docingreperc(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.docingreperc).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
