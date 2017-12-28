import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { customHttpProvider } from '../../blocks/interceptor/http.provider';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../shared';
import { MessagesModule } from 'primeng/primeng';
import { MessageModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { RegistroAtencionModule } from './registro-atencion/registro-atencion.module';
import { ConsultasModule } from './consultas/consultas.module';
import { CalculoLiquidacionModule } from './calculo-liquidacion/calculo-liquidacion.module';

@NgModule({
    imports: [
        RegistroAtencionModule,
        ConsultasModule,
        CalculoLiquidacionModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [
        customHttpProvider(),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayLiquidacionesModule {}
