/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EstatutoDetailComponent } from '../../../../../../main/webapp/app/entities/estatuto/estatuto-detail.component';
import { EstatutoService } from '../../../../../../main/webapp/app/entities/estatuto/estatuto.service';
import { Estatuto } from '../../../../../../main/webapp/app/entities/estatuto/estatuto.model';

describe('Component Tests', () => {

    describe('Estatuto Management Detail Component', () => {
        let comp: EstatutoDetailComponent;
        let fixture: ComponentFixture<EstatutoDetailComponent>;
        let service: EstatutoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [EstatutoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EstatutoService,
                    JhiEventManager
                ]
            }).overrideTemplate(EstatutoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstatutoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstatutoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Estatuto(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.estatuto).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
