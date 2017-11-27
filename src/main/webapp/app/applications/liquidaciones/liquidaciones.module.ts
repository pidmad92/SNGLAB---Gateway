import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { customHttpProvider } from '../../blocks/interceptor/http.provider';

import { RegistroAtencionModule } from './registro-atencion/registro-atencion.module';

@NgModule({
    imports: [
        RegistroAtencionModule,
    ],
    declarations: [],
    entryComponents: [],
    providers: [customHttpProvider()],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayLiquidacionesModule {}
