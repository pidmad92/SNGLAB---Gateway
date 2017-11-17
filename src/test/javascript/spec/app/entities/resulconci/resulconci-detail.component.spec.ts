/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ResulconciDetailComponent } from '../../../../../../main/webapp/app/entities/resulconci/resulconci-detail.component';
import { ResulconciService } from '../../../../../../main/webapp/app/entities/resulconci/resulconci.service';
import { Resulconci } from '../../../../../../main/webapp/app/entities/resulconci/resulconci.model';

describe('Component Tests', () => {

    describe('Resulconci Management Detail Component', () => {
        let comp: ResulconciDetailComponent;
        let fixture: ComponentFixture<ResulconciDetailComponent>;
        let service: ResulconciService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ResulconciDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ResulconciService,
                    JhiEventManager
                ]
            }).overrideTemplate(ResulconciDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResulconciDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResulconciService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Resulconci(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.resulconci).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
