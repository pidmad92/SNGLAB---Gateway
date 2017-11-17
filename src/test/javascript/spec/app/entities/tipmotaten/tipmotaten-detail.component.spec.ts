/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipmotatenDetailComponent } from '../../../../../../main/webapp/app/entities/tipmotaten/tipmotaten-detail.component';
import { TipmotatenService } from '../../../../../../main/webapp/app/entities/tipmotaten/tipmotaten.service';
import { Tipmotaten } from '../../../../../../main/webapp/app/entities/tipmotaten/tipmotaten.model';

describe('Component Tests', () => {

    describe('Tipmotaten Management Detail Component', () => {
        let comp: TipmotatenDetailComponent;
        let fixture: ComponentFixture<TipmotatenDetailComponent>;
        let service: TipmotatenService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipmotatenDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipmotatenService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipmotatenDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipmotatenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipmotatenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipmotaten(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipmotaten).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
