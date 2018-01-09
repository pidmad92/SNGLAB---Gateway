export class Constants {

    // Formulario 1 - Estado de Resultados
    // -----------------------------------------------------------------
    // INGRESOS DE VENTAS NETOS U OPERACIÓN
    public readonly FORM1_TOTAL_DE_INGRESOS = 'TOTAL DE INGRESOS';

    // COSTOS DE VENTAS U OPERACIÓN
    //  I. EMPRESAS DE PRODUCCIÓN (1)
    public readonly FORM1_MATERIA_PRIMA = 'Materia Prima (2)';
    public readonly FORM1_MANO_OBRA_DIRECTA = 'Mano de Obra Directa';
    public readonly FORM1_GASTOS_FABRICACION = 'Gastos de Fabricación (2)';
    public readonly FORM1_SUB_TOTAL = 'Sub-Total';
    public readonly FORM1_DIFERENCIA_INVENTARIO_PRODUCTO_TERMINADO = '(+/-) Diferencia Inventario Producto Terminado';
    public readonly FORM1_DIFERENCIA_INVENTARIO_PRODUCTO_PROCESO = '(+/-) Diferencia Inventario Producto en Proceso';
    public readonly FORM1_SUBTOTAL_PRODUCCION = 'SUBTOTAL';

    //  II. EMPRESAS DE SERVICIOS O COMERCIALIZADORA (1)
    public readonly FORM1_SUBTOTAL_SERVICIOS = 'SUBTOTAL';
    public readonly FORM1_TOTAL_COSTOS_TOTALES_VENTAS_OPERACIONES_SERVICIOS = 'TOTAL COSTOS TOTALES DE VENTAS, OPERACIÓN Y/O SERVICIOS';
    public readonly FORM1_UTILIDAD_BRUTA = 'UTILIDAD (PÉRDIDA) BRUTA';

    // GASTOS OPERATIVOS
    public readonly FORM1_GASTOS_VENTAS_DISTRIBUCION = 'Gastos de Ventas y Distribución (3)';
    public readonly FORM1_GASTOS_ADMINISTRACION = 'Gastos de Administración (3)';
    public readonly FORM1_TOTAL_GASTOS_OPERATIVOS = 'TOTAL DE GASTOS OPERATIVOS';
    public readonly FORM1_UTILIDAD_OPERATIVA = 'UTILIDAD (PÉRDIDA) OPERATIVA';
    public readonly FORM1_INGRESOS_FINANCIEROS = 'Ingresos Financieros (3)';
    public readonly FORM1_GASTOS_FINANCIEROS = 'Gastos Financieros (3)';
    public readonly FORM1_ENAJENACION_VALORES_BIENES_ACTIVO_FIJO = 'Enajenación de Valores y Bienes del Activo Fijo';
    public readonly FORM1_COSTO_ENAJENACION_VALORES_BIENES_ACTIVO_FIJO = 'Costo de Enajenación de Valores y Bienes del Activo Fijo';
    public readonly FORM1_OTROS_INGRESOS = 'Otros Ingresos (3)';
    public readonly FORM1_OTROS_EGRESOS = 'Otros Egresos (3)';
    public readonly FORM1_SUBTOTAL_GASTOS_OPERATIVOS = 'SUBTOTAL';

    public readonly FORM1_UTILIDAD_ANTES_PARTICIPACIONES = 'UTILIDAD (PÉRDIDA) ANTES DE PARTICIPACIONES	';
    public readonly FORM1_PARTICIPACION_TRABAJADORES = 'Participación de los Trabajadores';
    public readonly FORM1_UTILIDAD_ANTES_IMPUESTOS = 'UTILIDAD (PÉRDIDA) ANTES DEL IMPUESTO';
    public readonly FORM1_IMPUESTO_RENTA = 'Impuesto a la Renta';
    public readonly FORM1_UTILIDAD_EJERCICIO = 'UTILIDAD (PÉRDIDA) DEL EJERCICIO';

    // Codigos
    // INGRESOS DE VENTAS NETOS U OPERACIÓN
    public readonly FORM1_COD_TOTAL_DE_INGRESOS = 'f1_tingreso';

    // COSTOS DE VENTAS U OPERACIÓN
    //  I. EMPRESAS DE PRODUCCIÓN (1)
    public readonly FORM1_COD_MATERIA_PRIMA = 'f1_mprima';
    public readonly FORM1_COD_MANO_OBRA_DIRECTA = 'f1_modirecta';
    public readonly FORM1_COD_GASTOS_FABRICACION = 'f1_gasfrab';
    public readonly FORM1_COD_SUB_TOTAL = 'f1_subtotal';
    public readonly FORM1_COD_DIFERENCIA_INVENTARIO_PRODUCTO_TERMINADO = 'f1_difinvproterm';
    public readonly FORM1_COD_DIFERENCIA_INVENTARIO_PRODUCTO_PROCESO = 'f1_difinvpropro';
    public readonly FORM1_COD_SUBTOTAL_PRODUCCION = 'f1_subtotalprod';

    //  II. EMPRESAS DE SERVICIOS O COMERCIALIZADORA (1)
    public readonly FORM1_COD_SERVICIOS = 'f1_componenteserv'
    public readonly FORM1_COD_SUBTOTAL_SERVICIOS = 'f1_subtotalserv';
    public readonly FORM1_COD_TOTAL_COSTOS_TOTALES_VENTAS_OPERACIONES_SERVICIOS = 'f1_tcostvopser';
    public readonly FORM1_COD_UTILIDAD_BRUTA = 'f1_utibruta';

    // GASTOS OPERATIVOS
    public readonly FORM1_COD_GASTOS_VENTAS_DISTRIBUCION = 'f1_gasvendis';
    public readonly FORM1_COD_GASTOS_ADMINISTRACION = 'f1_gasadmin';
    public readonly FORM1_COD_TOTAL_GASTOS_OPERATIVOS = 'f1_tgasope';
    public readonly FORM1_COD_UTILIDAD_OPERATIVA = 'f1_utioper';
    public readonly FORM1_COD_INGRESOS_FINANCIEROS = 'f1_ingfinan';
    public readonly FORM1_COD_GASTOS_FINANCIEROS = 'f1_gasfinan';
    public readonly FORM1_COD_ENAJENACION_VALORES_BIENES_ACTIVO_FIJO = 'f1_envabiacfi';
    public readonly FORM1_COD_COSTO_ENAJENACION_VALORES_BIENES_ACTIVO_FIJO = 'f1_coenvabiacfi';
    public readonly FORM1_COD_OTROS_INGRESOS = 'f1_otroing';
    public readonly FORM1_COD_OTROS_EGRESOS = 'f1_otroegr';
    public readonly FORM1_COD_SUBTOTAL_GASTOS_OPERATIVOS = 'f1_subtotalgasop';

    public readonly FORM1_COD_UTILIDAD_ANTES_PARTICIPACIONES = 'f1_utiantparti';
    public readonly FORM1_COD_PARTICIPACION_TRABAJADORES = 'f1_partitrab';
    public readonly FORM1_COD_UTILIDAD_ANTES_IMPUESTOS = 'f1_utiantimp';
    public readonly FORM1_COD_IMPUESTO_RENTA = 'f1_imprenta';
    public readonly FORM1_COD_UTILIDAD_EJERCICIO = 'f1_utiejerc';
    // -----------------------------------------------------------------
    // Formulario 1 - ANEXO 1A - INGRESOS POR VENTAS NETAS Y/O SERVICIOS
    // -----------------------------------------------------------------
    public readonly FORM1ANEX1A_COD_NAC_VOLUMEN_FISICO = 'f1anex1a_nac1volfisi';
    public readonly FORM1ANEX1A_COD_NAC_PRECIO_PROMEDIO = 'f1anex1a_nac2preprom';
    public readonly FORM1ANEX1A_COD_NAC_INGRESOS = 'f1anex1a_nac3ingresos';

    public readonly FORM1ANEX1A_COD_INT_VOLUMEN_FISICO = 'f1anex1a_int1volfisi';
    public readonly FORM1ANEX1A_COD_INT_PRECIO_PROMEDIO = 'f1anex1a_int2preprom';
    public readonly FORM1ANEX1A_COD_INT_INGRESOS = 'f1anex1a_int3ingresos';

    public readonly FORM1ANEX1A_COD_TOTAL = 'f1anex1a_total';
    // -----------------------------------------------------------------
    // Formulario 1 - ANEXO 1B - VOLUMEN FÍSICO DE PRODUCCIÓN Y/O SERVICIOS
    // -----------------------------------------------------------------
    public readonly FORM1ANEX1B_COD_VOLUMEN = 'f1anex1b_volumen';

    // -----------------------------------------------------------------
    // Formulario 1 - ANEXO 1C - INGRESOS POR VENTAS NETAS Y/O SERVICIOS
    // -----------------------------------------------------------------
    public readonly FORM1ANEX1C_COD_MP_NAC_CANTIDAD_CONSUMIDA = 'f1anex1c_nac1mpcantconsu';
    public readonly FORM1ANEX1C_COD_MP_NAC_PRECIO_PROMEDIO = 'f1anex1c_nac2mppreprom';
    public readonly FORM1ANEX1C_COD_MP_NAC_COSTO_TOTAL = 'f1anex1c_nac3mpcostotal';

    public readonly FORM1ANEX1C_COD_MP_IMP_CANTIDAD_CONSUMIDA = 'f1anex1c_imp1mpcantconsu';
    public readonly FORM1ANEX1C_COD_MP_IMP_PRECIO_PROMEDIO = 'f1anex1c_imp2mppreprom';
    public readonly FORM1ANEX1C_COD_MP_IMP_COSTO_TOTAL = 'f1anex1c_imp3mpcostotal';

    public readonly FORM1ANEX1C_COD_GF_CANTIDAD_CONSUMIDA = 'f1anex1c_gf1cantconsu';
    public readonly FORM1ANEX1C_COD_GF_PRECIO_PROMEDIO = 'f1anex1c_gf2preprom';
    public readonly FORM1ANEX1C_COD_GF_COSTO_TOTAL = 'f1anex1c_gf3costotal';

    public readonly FORM1ANEX1C_COD_TOTAL = 'f1anex1c_total';
    // -----------------------------------------------------------------
    // Formulario 1 - ANEXO 1D - INGRESOS POR VENTAS NETAS Y/O SERVICIOS
    // -----------------------------------------------------------------
    public readonly FORM1ANEX1D_COD_GASTOS_VENTAS_DISTRIBUCION = 'f1anex1d_gasvendistri';
    public readonly FORM1ANEX1D_GASTOS_VENTAS_DISTRIBUCION = 'TOTAL';
    public readonly FORM1ANEX1D_COD_TOTAL_GASTOS_VENTAS_DISTRIBUCION = 'f1anex1d_totalgasvendistri';

    public readonly FORM1ANEX1D_COD_GASTOS_SERVICIOS_PRESTADOS_TERCEROS = 'f1anex1d_gasservprester';
    public readonly FORM1ANEX1D_GASTOS_SERVICIOS_PRESTADOS_TERCEROS = 'TOTAL';
    public readonly FORM1ANEX1D_COD_TOTAL_GASTOS_SERVICIOS_PRESTADOS_TERCEROS = 'f1anex1d_totalgasservprester';

    public readonly FORM1ANEX1D_COD_GASTOS_CARGOS_DIVERSOS_GESTION = 'f1anex1d_gascardivgestion';
    public readonly FORM1ANEX1D_GASTOS_CARGOS_DIVERSOS_GESTION = 'TOTAL';
    public readonly FORM1ANEX1D_COD_TOTAL_GASTOS_CARGOS_DIVERSOS_GESTION = 'f1anex1d_totalgascardivgestion';

    public readonly FORM1ANEX1D_COD_PROVISIONES = 'f1anex1d_provisiones';
    public readonly FORM1ANEX1D_PROVISIONES = 'TOTAL';
    public readonly FORM1ANEX1D_COD_TOTAL_PROVISIONES = 'f1anex1d_totalprovisiones';

    public readonly FORM1ANEX1D_COD_GASTOS_ADMINISTRACION = 'f1anex1d_gasadmin';
    public readonly FORM1ANEX1D_GASTOS_ADMINISTRACION = 'TOTAL';
    public readonly FORM1ANEX1D_COD_TOTAL_GASTOS_ADMINISTRACION = 'f1anex1d_totalgasadmin';

    public readonly FORM1ANEX1D_COD_DENTRO_ADMINISTRACION_GASTOS_SERVICIOS_PRESTADOS_TERCEROS = 'f1anex1d_deadmgasservpreter';
    public readonly FORM1ANEX1D_DENTRO_ADMINISTRACION_GASTOS_SERVICIOS_PRESTADOS_TERCEROS = 'TOTAL';
    public readonly FORM1ANEX1D_COD_TOTAL_DENTRO_ADMINISTRACION_GASTOS_SERVICIOS_PRESTADOS_TERCEROS = 'f1anex1d_totaldeadmgasservpreter';

    public readonly FORM1ANEX1D_COD_INGRESOS_FINANCIEROS = 'f1anex1d_ingfinan';
    public readonly FORM1ANEX1D_INGRESOS_FINANCIEROS = 'TOTAL';
    public readonly FORM1ANEX1D_COD_TOTAL_INGRESOS_FINANCIEROS = 'f1anex1d_totalingfinan';

    public readonly FORM1ANEX1D_COD_GASTOS_FINANCIEROS = 'f1anex1d_gasfinan';
    public readonly FORM1ANEX1D_GASTOS_FINANCIEROS = 'TOTAL';
    public readonly FORM1ANEX1D_COD_TOTAL_GASTOS_FINANCIEROS = 'f1anex1d_totalgasfinan';

    public readonly FORM1ANEX1D_COD_OTROS_INGRESOS = 'f1anex1d_otrosingresos';
    public readonly FORM1ANEX1D_OTROS_INGRESOS = 'TOTAL';
    public readonly FORM1ANEX1D_COD_TOTAL_OTROS_INGRESOS = 'f1anex1d_totalotrosingresos';

    public readonly FORM1ANEX1D_COD_OTROS_EGRESOS = 'f1anex1d_otrosegresos';
    public readonly FORM1ANEX1D_OTROS_EGRESOS = 'TOTAL';
    public readonly FORM1ANEX1D_COD_TOTAL_OTROS_EGRESOS = 'f1anex1d_totalotrosegresos';

    // -----------------------------------------------------------------
    // Formulario 2 - ESTADO DE SITUACIÓN FINANCIERA
    // -----------------------------------------------------------------

    // ACTIVO CORRIENTE
    public readonly FORM2_CAJA_BANCOS = 'Caja y Bancos';
    public readonly FORM2_INV_VALOR_RAZONABLE_DISPONIBLE_VENTA = 'Inversiones Valor Razonable y Disponible para Venta';
    public readonly FORM2_CUENTAS_COBRAR_COMERCIALES = 'Cuentas por Cobrar Comerciales (1)';
    public readonly FORM2_PROV_CUENTAS_COBRANZA_DUDOSA = '(Provisiones de Cuentas por Cobranza Dudosa)';
    public readonly FORM2_CUENTAS_COBRAR_COMERCIALES_RELACIONADAS = 'Cuentas por Cobrar Comerciales-Relacionadas (1)';
    public readonly FORM2_CUENTAS_COBRAR_PERSONAL_ACCIONISTAS_SOCIOS_DIRECTORES_GERENTES = 'Cuentas por Cobrar al Personal, Accionistas, Socios, Directores y Gerentes';
    public readonly FORM2_CUENTAS_COBRAR_DIVERSAS = 'Cuentas por Cobrar Diversas (1)';
    public readonly FORM2_SERVICIOS_OTROS_CONTRATADOS_ANTICIPADO = 'Servicios y Otros Contratados por Anticipado';
    public readonly FORM2_EXISTENCIAS = 'Existencias';
    public readonly FORM2_OTRAS_CUENTAS = 'Otras Cuentas del Activo Corriente (1)';
    public readonly FORM2_TOTAL_ACTIVO_CORRIENTE = 'TOTAL ACTIVO CORRIENTE';

    // ACTIVO NO CORRIENTE
    public readonly FORM2_INVERSIONES_INMOBILIARIAS = 'Inversiones Inmobiliarias';
    public readonly FORM2_INVERSIONES_MOBILIARIAS = 'Inversiones Mobiliarias';
    public readonly FORM2_ACTIVOS_ADQUIRIDOS_ARRENDAMIENTO_FINANCIERO = 'Activos Adquiridos en Arrendamiento Financiero';
    public readonly FORM2_DEPRECIACION_ACTIVOS_ADQUIRIDOS_ARRENDAMIENTO_FINANCIERO = '(Depreciación de Activos Adquiridos en Arrendamiento Financiero)';
    public readonly FORM2_INMUEBLES_MAQUINARIA_EQUIPO = 'Inmuebles Maquinaria y Equipo';
    public readonly FORM2_DEPRECIACION_INMUEBLES_MAQUINARIA_EQUIPO = '(Depreciación de Inmuebles Maquinaria y Equipo)';
    public readonly FORM2_ACTIVOS_INTANGIBLES_NETO = 'Activos Intangibles Neto';
    public readonly FORM2_ACTIVOS_BIOLOGICOS = 'Activos Biológicos';
    public readonly FORM2_DEPRECIACION_ACTIVO_BIOL_AMOR_AGOTA_ACUM = '(Depreciación de Activo biol.amor.y agota.acum)';
    public readonly FORM2_ACTIVO_DIFERIDO = 'Activo Diferido';
    public readonly FORM2_OTRAS_CUENTAS_ACTIVO_NO_CORRIENTE = 'Otras Cuentas del Activo no Corriente (1)';
    public readonly FORM2_TOTAL_ACTIVO_NO_CORRIENTE = 'TOTAL ACTIVO NO CORRIENTE';

    // PASIVO CORRIENTE
    public readonly FORM2_SOBREGIROS_BANCARIOS = 'Sobregiros Bancarios';
    public readonly FORM2_TRIBUTOS_CONTRAPRESTACIONES_APORTES_PENSIONES_SALUD = 'Tributos, Contraprestaciones y Aportes al Sistema de Pensiones y de Salud por Pagar';
    public readonly FORM2_REMUNERACIONES_PARTICIPACION_PAGAR = 'Remuneraciones y Participaciones por Pagar';
    public readonly FORM2_CUENTAS_PAGAR_COMERCIALES = 'Cuentas por Pagar Comerciales (1)';
    public readonly FORM2_CUENTAS_PAGAR_ACCIONISTAS_DIRECTORES_GERENTES = 'Cuentas por Pagar a los accionistas,directores y gerentes';
    public readonly FORM2_CUENTAS_PAGAR_COMERCIALES_RELACIONADAS = 'Cuentas por Pagar Comerciales - Relacionadas (1)';
    public readonly FORM2_OTRAS_CUENTAS_PAGAR_DIVERSAS = 'Otras Cuentas por Pagar Diversas';
    public readonly FORM2_OBLIGACIONES_FINANCIERAS_PARTE_DEUDA = 'Obligaciones Financieras (Parte corriente de deuda a LP)(1)';
    public readonly FORM2_PROVISIONES = 'Provisiones (1)';
    public readonly FORM2_PASIVO_DIFERIDO = 'Pasivo Diferido';
    public readonly FORM2_OTRAS_CUENTAS_PASIVO_CORRIENTE = 'Otras cuentas del pasivo corriente (1)';
    public readonly FORM2_TOTAL_PASIVO_CORRIENTE = 'TOTAL PASIVO CORRIENTE';

    // PASIVO NO CORRIENTE
    public readonly FORM2_OBLIGACIONES_FINANCIERAS = 'Obligaciones Financieras (1)';
    public readonly FORM2_CUENTAS_PAGAR_COMERCIALES_OTRAS_CUENTAS = 'Cuentas por pagar comerciales y otras cuentas por pagar';
    public readonly FORM2_PROVISIONES_PASIVO_NO_CORRIENTE = 'Provisiones (1)';
    public readonly FORM2_OTRAS_CUENTAS_PASIVO_NO_CORRIENTE = 'Otras cuentas del pasivo no corriente (1)';
    public readonly FORM2_TOTAL_PASIVO_NO_CORRIENTE = 'TOTAL PASIVO NO CORRIENTE';

    // PATRIMONIO
    public readonly FORM2_CAPITAL = 'Capital';
    public readonly FORM2_CAPITAL_ADICIONAL = 'Capital Adicional';
    public readonly FORM2_ACCIONES_INVERSION = 'Acciones de Inversión';
    public readonly FORM2_RESERVAS = 'Reservas';
    public readonly FORM2_RESULTADOS_ACUMULADOS = 'Resultados Acumulados';
    public readonly FORM2_EXCEDENTE_REVALUACION = 'Excedente de Revaluación';
    public readonly FORM2_RESULTADOS_NO_REALIZADOS = 'Resultados No Realizados (1)';
    public readonly FORM2_UTILIDAD = 'Utilidad (Pérdida) neta del Ejercicio';
    public readonly FORM2_TOTAL_PATRIMONIO = 'TOTAL PATRIMONIO';

    // TOTALES
    public readonly FORM2_TOTAL_ACTIVOS = 'TOTAL ACTIVOS';
    public readonly FORM2_TOTAL_PASIVOS = 'TOTAL PASIVOS';
    public readonly FORM2_TOTAL_PASIVOS_PATRIMONIO = 'TOTAL PASIVO Y PATRIMONIO';

    // CODIGOS
    // ACTIVO CORRIENTE
    public readonly FORM2_COD_CAJA_BANCOS = 'form2_cajabancos';
    public readonly FORM2_COD_INV_VALOR_RAZONABLE_DISPONIBLE_VENTA = 'form2_invvalrazdisven';
    public readonly FORM2_COD_CUENTAS_COBRAR_COMERCIALES = 'form2_cuentascocom';
    public readonly FORM2_COD_PROV_CUENTAS_COBRANZA_DUDOSA = 'form2_provcuentascobdud';
    public readonly FORM2_COD_CUENTAS_COBRAR_COMERCIALES_RELACIONADAS = 'form2_cuentascocomerrela';
    public readonly FORM2_COD_CUENTAS_COBRAR_PERSONAL_ACCIONISTAS_SOCIOS_DIRECTORES_GERENTES = 'form2_cuentascoperaccsocdirger';
    public readonly FORM2_COD_CUENTAS_COBRAR_DIVERSAS = 'form2_cuentascodiver';
    public readonly FORM2_COD_SERVICIOS_OTROS_CONTRATADOS_ANTICIPADO = 'form2_servotroscontanti';
    public readonly FORM2_COD_EXISTENCIAS = 'form2_existencias';
    public readonly FORM2_COD_OTRAS_CUENTAS = 'form2_otrascuentas';
    public readonly FORM2_COD_TOTAL_ACTIVO_CORRIENTE = 'form2_totalactcorr';

    // ACTIVO NO CORRIENTE
    public readonly FORM2_COD_INVERSIONES_INMOBILIARIAS = 'form2_invinmobi';
    public readonly FORM2_COD_INVERSIONES_MOBILIARIAS = 'form2_invmobi';
    public readonly FORM2_COD_ACTIVOS_ADQUIRIDOS_ARRENDAMIENTO_FINANCIERO = 'form2_actadqarrfinan';
    public readonly FORM2_COD_DEPRECIACION_ACTIVOS_ADQUIRIDOS_ARRENDAMIENTO_FINANCIERO = 'form2_depreactadqarrfinan';
    public readonly FORM2_COD_INMUEBLES_MAQUINARIA_EQUIPO = 'form2_inmmaqequi';
    public readonly FORM2_COD_DEPRECIACION_INMUEBLES_MAQUINARIA_EQUIPO = 'form2_depinmmaqequipo';
    public readonly FORM2_COD_ACTIVOS_INTANGIBLES_NETO = 'form2_actintneto';
    public readonly FORM2_COD_ACTIVOS_BIOLOGICOS = 'form2_actbiolo';
    public readonly FORM2_COD_DEPRECIACION_ACTIVO_BIOL_AMOR_AGOTA_ACUM = 'form2_depactbiolamoragoacum';
    public readonly FORM2_COD_ACTIVO_DIFERIDO = 'form2_actdif';
    public readonly FORM2_COD_OTRAS_CUENTAS_ACTIVO_NO_CORRIENTE = 'form2_otrascuenactnocorr';
    public readonly FORM2_COD_TOTAL_ACTIVO_NO_CORRIENTE = 'form2_totalactnocorr';

    // PASIVO CORRIENTE
    public readonly FORM2_COD_SOBREGIROS_BANCARIOS = 'form2_sobregiros';
    public readonly FORM2_COD_TRIBUTOS_CONTRAPRESTACIONES_APORTES_PENSIONES_SALUD = 'form2_tribcontaporpensalud';
    public readonly FORM2_COD_REMUNERACIONES_PARTICIPACION_PAGAR = 'form2_remupartpagar';
    public readonly FORM2_COD_CUENTAS_PAGAR_COMERCIALES = 'form2_cuentaspagarcomer';
    public readonly FORM2_COD_CUENTAS_PAGAR_ACCIONISTAS_DIRECTORES_GERENTES = 'form2_cuentaspagaraccdirger';
    public readonly FORM2_COD_CUENTAS_PAGAR_COMERCIALES_RELACIONADAS = 'form2_cuentaspagarcomrel';
    public readonly FORM2_COD_OTRAS_CUENTAS_PAGAR_DIVERSAS = 'form2_otrascuepagardiv';
    public readonly FORM2_COD_OBLIGACIONES_FINANCIERAS_PARTE_DEUDA = 'form2_oblfinanpartedeuda';
    public readonly FORM2_COD_PROVISIONES = 'form2_provisiones';
    public readonly FORM2_COD_PASIVO_DIFERIDO = 'form2_pasivodif';
    public readonly FORM2_COD_OTRAS_CUENTAS_PASIVO_CORRIENTE = 'form2_otrascuentpasivcorr';
    public readonly FORM2_COD_TOTAL_PASIVO_CORRIENTE = 'form2_totalpasivcorr';

    // PASIVO NO CORRIENTE
    public readonly FORM2_COD_OBLIGACIONES_FINANCIERAS = 'form2_obligfinan';
    public readonly FORM2_COD_CUENTAS_PAGAR_COMERCIALES_OTRAS_CUENTAS = 'form2_cuentaspagarcomerotrcuen';
    public readonly FORM2_COD_PROVISIONES_PASIVO_NO_CORRIENTE = 'form2_provpasnocorr';
    public readonly FORM2_COD_OTRAS_CUENTAS_PASIVO_NO_CORRIENTE = 'form2_otrascuentaspa';
    public readonly FORM2_COD_TOTAL_PASIVO_NO_CORRIENTE = 'form2_totalpasnocorr';

    // PATRIMONIO
    public readonly FORM2_COD_CAPITAL = 'form2_capital';
    public readonly FORM2_COD_CAPITAL_ADICIONAL = 'form2_capitaladicional';
    public readonly FORM2_COD_ACCIONES_INVERSION = 'form2_accinv';
    public readonly FORM2_COD_RESERVAS = 'form2_reservas';
    public readonly FORM2_COD_RESULTADOS_ACUMULADOS = 'form2_resulacumulados';
    public readonly FORM2_COD_EXCEDENTE_REVALUACION = 'form2_excereval';
    public readonly FORM2_COD_RESULTADOS_NO_REALIZADOS = 'form2_resulnoreal';
    public readonly FORM2_COD_UTILIDAD = 'form2_utilidad';
    public readonly FORM2_COD_TOTAL_PATRIMONIO = 'form2_totalpatromonio';

    // TOTALES
    public readonly FORM2_COD_TOTAL_ACTIVOS = 'form2_totalactivos';
    public readonly FORM2_COD_TOTAL_PASIVOS = 'form2_totalpasivos';
    public readonly FORM2_COD_TOTAL_PASIVOS_PATRIMONIO = 'form2_totalpasivospatrimonio';

    // -----------------------------------------------------------------
    // Formulario 2 - Anexo 2A - ESTADOS DE FLUJOS DE EFECTIVO
    // -----------------------------------------------------------------

    // FLUJOS DE EFECTIVO DE ACTIVIDAD DE OPERACIÓN
    // Clases de cobros en efectivo por actividades de operación
    public readonly FORM2ANEX2A_FEAOC1 = 'Cobros procedentes de las ventas de bienes y prestación de servicios';
    public readonly FORM2ANEX2A_FEAOC2 = 'Cobros procedentes de regalías, cuotas, comisiones y otros ingresos de actividades ordinarias';
    public readonly FORM2ANEX2A_FEAOC3 = 'Cobros derivados de contratos mantenidos para intermediación o para negociar con ellos';
    public readonly FORM2ANEX2A_FEAOC4 = 'Arredamiento y posterior venta de esos activos';
    public readonly FORM2ANEX2A_FEAOC5 = 'Otros cobros por actividades de operación';
    // Clases de pagos en efectivo por actividades de operación
    public readonly FORM2ANEX2A_FEAOP1 = 'Pagos a proveedores por el suministro de bienes y servicios';
    public readonly FORM2ANEX2A_FEAOP2 = 'Pagos procedentes de contratos mantenidos para intermediación o para negociar';
    public readonly FORM2ANEX2A_FEAOP3 = 'Pagos a y por cuenta de los empleados';
    public readonly FORM2ANEX2A_FEAOP4 = 'Pagos por producir o adquirir activos mant. para arrendar a terc. y post.e mant.s para la venta';
    public readonly FORM2ANEX2A_FEAOP5 = 'Otros pagos por actividades de operación';
    // Flujos de efectivo y equivalente al efectivo procedente de (utilizados en) operaciones
    public readonly FORM2ANEX2A_FEAOEE1 = 'Intereses recibidos (no incluidos en la Actividad de Inversión)';
    public readonly FORM2ANEX2A_FEAOEE2 = 'Intereses pagados (no incluidos en la Actividad de Financiación)';
    public readonly FORM2ANEX2A_FEAOEE3 = 'Dividendos Recibidos (no incluidos en la Actividad de Inversión)';
    public readonly FORM2ANEX2A_FEAOEE4 = 'Dividendos pagados(no incluidos en la Actividad de Financiación)';
    public readonly FORM2ANEX2A_FEAOEE5 = 'Impuestos a las ganancias (pagados) reembolsados';
    public readonly FORM2ANEX2A_FEAOEE6 = 'Otras entradas (salidas) de efectivo';

    // FLUJOS DE EFECTIVO DE ACTIVIDAD DE INVERSIÓN
    // Clases de cobros en efectivo por actividades de inversión
    public readonly FORM2ANEX2A_FEAIC1 = 'Anticipos de efectivo y préstamos concedidos a terceros';
    public readonly FORM2ANEX2A_FEAIC2 = 'Flujos de efectivo procedentes de la pérdida de control de subsidiarias u otros negocios';
    public readonly FORM2ANEX2A_FEAIC3 = 'Cobros procedentes del reembolso de préstamos concedidos a entidades relacionadas';
    public readonly FORM2ANEX2A_FEAIC4 = 'Venta de  Instrumentos Financieros de Patrimonio o Deuda de Otras Entidades';
    public readonly FORM2ANEX2A_FEAIC5 = 'Contratos Derivados (futuro, a término, opciones)';
    public readonly FORM2ANEX2A_FEAIC6 = 'Cobros por la venta de Participaciones en Negocios Conjuntos, Neto del Efectivo Desapropiado';
    public readonly FORM2ANEX2A_FEAIC7 = 'Venta de Propiedades, Planta y Equipo';
    public readonly FORM2ANEX2A_FEAIC8 = 'Venta de Activos Intangibles';
    public readonly FORM2ANEX2A_FEAIC9 = 'Recursos por ventas de otros activos a largo plazo';
    public readonly FORM2ANEX2A_FEAIC10 = 'Importes procedentes de subvenciones del gobierno';
    public readonly FORM2ANEX2A_FEAIC11 = 'Intereses Recibidos';
    public readonly FORM2ANEX2A_FEAIC12 = 'Dividendos Recibidos';
    // Clases de pagos en efectivo por actividades de inversión
    public readonly FORM2ANEX2A_FEAIP1 = 'Anticipos y Prestamos Concedidos a Terceros';
    public readonly FORM2ANEX2A_FEAIP2 = 'Flujos de efectivo utilizados para obtener el control de subsidiarias u otros negocios';
    public readonly FORM2ANEX2A_FEAIP3 = 'Prestamos concedidos a entidades relacionadas';
    public readonly FORM2ANEX2A_FEAIP4 = 'Compra de Instrumentos Financieros de Patrimonio o Deuda de Otras Entidades';
    public readonly FORM2ANEX2A_FEAIP5 = 'Pagos derivados de contratos de futuro, a término, de opciones y de permuta financiera';
    public readonly FORM2ANEX2A_FEAIP6 = 'Compra de Subsidiarias, Neto del Efectivo Adquirido';
    public readonly FORM2ANEX2A_FEAIP7 = 'Otros pagos para adquirir participaciones en negocios conjuntos, Neto del Efectivo Adquirido';
    public readonly FORM2ANEX2A_FEAIP8 = 'Compra de Propiedades, Planta  y Equipo';
    public readonly FORM2ANEX2A_FEAIP9 = 'Compra de Activos Intangibles';
    public readonly FORM2ANEX2A_FEAIP10 = 'Compra de Otros Activos de largo plazo';
    public readonly FORM2ANEX2A_FEAIP11 = 'Impuestos a las ganancias (pagados) reembolsados';
    public readonly FORM2ANEX2A_FEAIP12 = 'Otros cobros (pagos) de efectivo relativos a la actividad de inversión';

    // FLUJOS DE EFECTIVO DE ACTIVIDAD DE FINANCIACIÓN
    // Clases de cobros en efectivo por actividades de financiación
    public readonly FORM2ANEX2A_FEAFC1 = 'Obtención de Préstamos';
    public readonly FORM2ANEX2A_FEAFC2 = 'Préstamos de entidades relacionadas';
    public readonly FORM2ANEX2A_FEAFC3 = 'Recursos por cambios en las participaciones en la propiedad en subsidiarias que no dan lugar a la pérdida de control';
    public readonly FORM2ANEX2A_FEAFC4 = 'Importes procedentes de la emisión de Acciones';
    public readonly FORM2ANEX2A_FEAFC5 = 'Importes procedentes de la emisión de Otros Instrumentos de Patrimonio';
    public readonly FORM2ANEX2A_FEAFC6 = 'Importes procedentes de subvenciones del gobierno';
    // Clases de pagos en efectivo por actividades de financiación
    public readonly FORM2ANEX2A_FEAFP1 = 'Reembolsos de préstamos';
    public readonly FORM2ANEX2A_FEAFP2 = 'Pagos de pasivos por arrendamientos financieros';
    public readonly FORM2ANEX2A_FEAFP3 = 'Importes procedentes de préstamos de entidades relacionadas';
    public readonly FORM2ANEX2A_FEAFP4 = 'Pagos por cambios en las participaciones en la propiedad en subsidiarias que no dan lugar a la pérdida de control';
    public readonly FORM2ANEX2A_FEAFP5 = 'Pagos por adquirir o rescatar las acciones de la entidad';
    public readonly FORM2ANEX2A_FEAFP6 = 'Pagos por otras participaciones en el patrimonio';
    public readonly FORM2ANEX2A_FEAFP7 = 'Intereses pagados';
    public readonly FORM2ANEX2A_FEAFP8 = 'Dividendos pagados';
    public readonly FORM2ANEX2A_FEAFP9 = 'Impuestos a las ganancias (pagados) reembolsados';
    public readonly FORM2ANEX2A_FEAFP10 = 'Otros cobros (pagos) de efectivo relativos a la actividad de financiación';

    public readonly FORM2ANEX2A_EVTCEEE1 = 'Efectos de las Variaciones en las Tasas de Cambio sobre el Efectivo y Equivalentes al Efectivo';
    public readonly FORM2ANEX2A_EEEIE1 = 'EFECTIVO Y EQUIVALENTE AL EFECTIVO AL INICIO DEL EJERCICIO (*)';

    // Totales
    public readonly FORM2ANEX2A_TOTAL1 = 'FLUJOS DE EFECTIVO Y EQUIVALENTE AL EFECTIVO PROCEDENTE DE (UTILIZADOS EN) ACTIVIDADES DE OPERACIÓN (I)';
    public readonly FORM2ANEX2A_TOTAL2 = 'FLUJOS DE EFECTIVO Y EQUIVALENTE AL EFECTIVO PROCEDENTE DE (UTILIZADOS EN) ACTIVIDADES DE INVERSIÓN (II)';
    public readonly FORM2ANEX2A_TOTAL3 = 'FLUJOS DE EFECTIVO Y EQUIVALENTE AL EFECTIVO PROCEDENTE DE (UTILIZADOS EN) ACTIVIDADES DE FINANCIACIÓN (III)';
    public readonly FORM2ANEX2A_TOTAL4 = 'AUMENTO (DISMINUCIÓN) NETO DE EFEC. Y EQUIV. AL EFECTIVO, ANTES DE LAS VAR. EN LAS TASAS DE CAMBIO (I+II+III)';
    public readonly FORM2ANEX2A_TOTAL5 = 'INCREMENTO (DISMINUCIÓN) NETO DE EFECTIVO Y EQUIVALENTE AL EFECTIVO';
    public readonly FORM2ANEX2A_TOTAL6 = 'EFECTIVO Y EQUIVALENTE AL EFECTIVO AL FINALIZAR EL EJERCICIO (**)';

    // CODIGOS
    public readonly FORM2ANEX2A_COD_FEAOC1 = 'f2anex2a_feaoc1';
    public readonly FORM2ANEX2A_COD_FEAOC2 = 'f2anex2a_feaoc2';
    public readonly FORM2ANEX2A_COD_FEAOC3 = 'f2anex2a_feaoc3';
    public readonly FORM2ANEX2A_COD_FEAOC4 = 'f2anex2a_feaoc4';
    public readonly FORM2ANEX2A_COD_FEAOC5 = 'f2anex2a_feaoc5';

    public readonly FORM2ANEX2A_COD_FEAOP1 = 'f2anex2a_feaop1';
    public readonly FORM2ANEX2A_COD_FEAOP2 = 'f2anex2a_feaop2';
    public readonly FORM2ANEX2A_COD_FEAOP3 = 'f2anex2a_feaop3';
    public readonly FORM2ANEX2A_COD_FEAOP4 = 'f2anex2a_feaop4';
    public readonly FORM2ANEX2A_COD_FEAOP5 = 'f2anex2a_feaop5';

    public readonly FORM2ANEX2A_COD_FEAOEE1 = 'f2anex2a_feaoee1';
    public readonly FORM2ANEX2A_COD_FEAOEE2 = 'f2anex2a_feaoee2';
    public readonly FORM2ANEX2A_COD_FEAOEE3 = 'f2anex2a_feaoee3';
    public readonly FORM2ANEX2A_COD_FEAOEE4 = 'f2anex2a_feaoee4';
    public readonly FORM2ANEX2A_COD_FEAOEE5 = 'f2anex2a_feaoee5';
    public readonly FORM2ANEX2A_COD_FEAOEE6 = 'f2anex2a_feaoee6';

    public readonly FORM2ANEX2A_COD_FEAIC1 = 'f2anex2a_feaic1';
    public readonly FORM2ANEX2A_COD_FEAIC2 = 'f2anex2a_feaic2';
    public readonly FORM2ANEX2A_COD_FEAIC3 = 'f2anex2a_feaic3';
    public readonly FORM2ANEX2A_COD_FEAIC4 = 'f2anex2a_feaic4';
    public readonly FORM2ANEX2A_COD_FEAIC5 = 'f2anex2a_feaic5';
    public readonly FORM2ANEX2A_COD_FEAIC6 = 'f2anex2a_feaic6';
    public readonly FORM2ANEX2A_COD_FEAIC7 = 'f2anex2a_feaic7';
    public readonly FORM2ANEX2A_COD_FEAIC8 = 'f2anex2a_feaic8';
    public readonly FORM2ANEX2A_COD_FEAIC9 = 'f2anex2a_feaic9';
    public readonly FORM2ANEX2A_COD_FEAIC10 = 'f2anex2a_feaic10';
    public readonly FORM2ANEX2A_COD_FEAIC11 = 'f2anex2a_feaic11';
    public readonly FORM2ANEX2A_COD_FEAIC12 = 'f2anex2a_feaic12';

    public readonly FORM2ANEX2A_COD_FEAIP1 = 'f2anex2a_feaip1';
    public readonly FORM2ANEX2A_COD_FEAIP2 = 'f2anex2a_feaip2';
    public readonly FORM2ANEX2A_COD_FEAIP3 = 'f2anex2a_feaip3';
    public readonly FORM2ANEX2A_COD_FEAIP4 = 'f2anex2a_feaip4';
    public readonly FORM2ANEX2A_COD_FEAIP5 = 'f2anex2a_feaip5';
    public readonly FORM2ANEX2A_COD_FEAIP6 = 'f2anex2a_feaip6';
    public readonly FORM2ANEX2A_COD_FEAIP7 = 'f2anex2a_feaip7';
    public readonly FORM2ANEX2A_COD_FEAIP8 = 'f2anex2a_feaip8';
    public readonly FORM2ANEX2A_COD_FEAIP9 = 'f2anex2a_feaip9';
    public readonly FORM2ANEX2A_COD_FEAIP10 = 'f2anex2a_feaip10';
    public readonly FORM2ANEX2A_COD_FEAIP11 = 'f2anex2a_feaip11';
    public readonly FORM2ANEX2A_COD_FEAIP12 = 'f2anex2a_feaip12';

    public readonly FORM2ANEX2A_COD_FEAFC1 = 'f2anex2a_feafc1';
    public readonly FORM2ANEX2A_COD_FEAFC2 = 'f2anex2a_feafc2';
    public readonly FORM2ANEX2A_COD_FEAFC3 = 'f2anex2a_feafc3';
    public readonly FORM2ANEX2A_COD_FEAFC4 = 'f2anex2a_feafc4';
    public readonly FORM2ANEX2A_COD_FEAFC5 = 'f2anex2a_feafc5';
    public readonly FORM2ANEX2A_COD_FEAFC6 = 'f2anex2a_feafc6';

    public readonly FORM2ANEX2A_COD_FEAFP1 = 'f2anex2a_feafp1';
    public readonly FORM2ANEX2A_COD_FEAFP2 = 'f2anex2a_feafp2';
    public readonly FORM2ANEX2A_COD_FEAFP3 = 'f2anex2a_feafp3';
    public readonly FORM2ANEX2A_COD_FEAFP4 = 'f2anex2a_feafp4';
    public readonly FORM2ANEX2A_COD_FEAFP5 = 'f2anex2a_feafp5';
    public readonly FORM2ANEX2A_COD_FEAFP6 = 'f2anex2a_feafp6';
    public readonly FORM2ANEX2A_COD_FEAFP7 = 'f2anex2a_feafp7';
    public readonly FORM2ANEX2A_COD_FEAFP8 = 'f2anex2a_feafp8';
    public readonly FORM2ANEX2A_COD_FEAFP9 = 'f2anex2a_feafp9';
    public readonly FORM2ANEX2A_COD_FEAFP10 = 'f2anex2a_feafp10';

    public readonly FORM2ANEX2A_COD_EVTCEEE1 = 'f2anex2a_evtceee1';
    public readonly FORM2ANEX2A_COD_EEEIE1 = 'f2anex2a_eeeie1';

    public readonly FORM2ANEX2A_COD_TOTAL1 = 'f2anex2a_total1';
    public readonly FORM2ANEX2A_COD_TOTAL2 = 'f2anex2a_total2';
    public readonly FORM2ANEX2A_COD_TOTAL3 = 'f2anex2a_total3';
    public readonly FORM2ANEX2A_COD_TOTAL4 = 'f2anex2a_total4';
    public readonly FORM2ANEX2A_COD_TOTAL5 = 'f2anex2a_total5';
    public readonly FORM2ANEX2A_COD_TOTAL6 = 'f2anex2a_total6';

    // -----------------------------------------------------------------
    // Formulario 2 - ANEXO 2B - ESTADO DE CAMBIOS EN EL PATRIMONIO
    // -----------------------------------------------------------------

    public readonly FORM2ANEX2B_SALDOENE = 'Saldos al 1ero. de enero de ';
    public readonly FORM2ANEX2B_CPC = 'Cambios en Políticas Contables';
    public readonly FORM2ANEX2B_CE = 'Corrección de Errores';
    public readonly FORM2ANEX2B_SIR = 'Saldo Inicial Reexpresado';
    public readonly FORM2ANEX2B_CPRI = 'Cambios en Patrimonio - Resultado Integral';
    public readonly FORM2ANEX2B_GNE = 'Ganancia (Pérdida) Neta del Ejercicio';
    public readonly FORM2ANEX2B_ORI = 'Otro Resultado Integral';
    public readonly FORM2ANEX2B_RITE = 'Resultado Integral Total del Ejercicio';
    public readonly FORM2ANEX2B_DRDP = 'Dividendos reconocidos como distribuciones a los propietarios (incluidos los pagados en efectivo)';
    public readonly FORM2ANEX2B_EP = 'Emisión (reducción) de patrimonio';
    public readonly FORM2ANEX2B_RAAI = 'Reducción o Amortización de Acciones de Inversión';
    public readonly FORM2ANEX2B_IAP = 'Incremento (Disminución) por otras Aportaciones de los Propietarios';
    public readonly FORM2ANEX2B_DDP = 'Disminución (Incremento) por otras Distribuciones a los Propietarios';
    public readonly FORM2ANEX2B_ICPS = 'Incremento (Disminución) por cambios en las participaciones de subsidiarias que no impliquen pérdida de control';
    public readonly FORM2ANEX2B_ITAPC = 'Incremento (Disminución) por transacciones con acciones propias en cartera';
    public readonly FORM2ANEX2B_ITOCP = 'Incremento (Disminución) por Transferencia y Otros Cambios de patrimonio';
    public readonly FORM2ANEX2B_TIP = 'Total incremento (disminución) en el patrimonio';
    public readonly FORM2ANEX2B_SALDODIC = 'Saldos al 31 de diciembre de ';

    // CODIGOS
    public readonly FORM2ANEX2B_COD_SALDOENE = 'f2anex2b_saldoene';
    public readonly FORM2ANEX2B_COD_CPC = 'f2anex2b_cpc';
    public readonly FORM2ANEX2B_COD_CE = 'f2anex2b_ce';
    public readonly FORM2ANEX2B_COD_SIR = 'f2anex2b_sir';
    public readonly FORM2ANEX2B_COD_CPRI = 'f2anex2b_cpri';
    public readonly FORM2ANEX2B_COD_GNE = 'f2anex2b_gne';
    public readonly FORM2ANEX2B_COD_ORI = 'f2anex2b_ori';
    public readonly FORM2ANEX2B_COD_RITE = 'f2anex2b_rite';
    public readonly FORM2ANEX2B_COD_DRDP = 'f2anex2b_drdp';
    public readonly FORM2ANEX2B_COD_EP = 'f2anex2b_ep';
    public readonly FORM2ANEX2B_COD_RAAI = 'f2anex2b_raai';
    public readonly FORM2ANEX2B_COD_IAP = 'f2anex2b_iap';
    public readonly FORM2ANEX2B_COD_DDP = 'f2anex2b_ddp';
    public readonly FORM2ANEX2B_COD_ICPS = 'f2anex2b_icps';
    public readonly FORM2ANEX2B_COD_ITAPC = 'f2anex2b_itapc';
    public readonly FORM2ANEX2B_COD_ITOCP = 'f2anex2b_itocp';
    public readonly FORM2ANEX2B_COD_TIP = 'f2anex2b_tip';
    public readonly FORM2ANEX2B_COD_SALDODIC = 'f2anex2b_saldodic';

    // -----------------------------------------------------------------
    // Formulario 2 - ANEXO 2C - DETALLE DE CUENTAS
    // -----------------------------------------------------------------
    public readonly FORM2ANEX2C_COD_ACCUENTASCOBRARCOMERCIALES = 'f2anex2c_cama';
    public readonly FORM2ANEX2C_ACCUENTASCOBRARCOMERCIALES = 'TOTAL';
    public readonly FORM2ANEX2C_COD_TOTAL_ACCUENTASCOBRARCOMERCIALES = 'f2anex2c_totala';

    public readonly FORM2ANEX2C_COD_ACCUENTASCOBRARCOMERCIALESRELACIONADAS = 'f2anex2c_camb';
    public readonly FORM2ANEX2C_ACCUENTASCOBRARCOMERCIALESRELACIONADAS = 'TOTAL';
    public readonly FORM2ANEX2C_COD_TOTAL_ACCUENTASCOBRARCOMERCIALESRELACIONADAS = 'f2anex2c_totalb';

    public readonly FORM2ANEX2C_COD_ACCUENTASCOBRARDIVERSAS = 'f2anex2c_camc';
    public readonly FORM2ANEX2C_ACCUENTASCOBRARDIVERSAS = 'TOTAL';
    public readonly FORM2ANEX2C_COD_TOTAL_ACCUENTASCOBRARDIVERSAS = 'f2anex2c_totalc';

    public readonly FORM2ANEX2C_COD_ACOTRASCUENTAS = 'f2anex2c_camd';
    public readonly FORM2ANEX2C_ACOTRASCUENTAS = 'TOTAL';
    public readonly FORM2ANEX2C_COD_TOTAL_ACOTRASCUENTAS = 'f2anex2c_totald';

    public readonly FORM2ANEX2C_COD_ANCOTRASCUENTAS = 'f2anex2c_came';
    public readonly FORM2ANEX2C_ANCOTRASCUENTAS = 'TOTAL';
    public readonly FORM2ANEX2C_COD_TOTAL_ANCOTRASCUENTAS = 'f2anex2c_totale';

    public readonly FORM2ANEX2C_COD_PCCUENTASPAGARCOMERCIALES = 'f2anex2c_camf';
    public readonly FORM2ANEX2C_PCCUENTASPAGARCOMERCIALES = 'TOTAL';
    public readonly FORM2ANEX2C_COD_TOTAL_PCCUENTASPAGARCOMERCIALES = 'f2anex2c_totalf';

    public readonly FORM2ANEX2C_COD_PCCUENTASPAGARCOMERCIALESRELACIONADAS = 'f2anex2c_camg';
    public readonly FORM2ANEX2C_PCCUENTASPAGARCOMERCIALESRELACIONADAS = 'TOTAL';
    public readonly FORM2ANEX2C_COD_TOTAL_PCCUENTASPAGARCOMERCIALESRELACIONADAS = 'f2anex2c_totalg';

    public readonly FORM2ANEX2C_COD_PCOBLIGACIONESFINANCIERAS = 'f2anex2c_camh';
    public readonly FORM2ANEX2C_PCOBLIGACIONESFINANCIERAS = 'TOTAL';
    public readonly FORM2ANEX2C_COD_TOTAL_PCOBLIGACIONESFINANCIERAS = 'f2anex2c_totalh';

    public readonly FORM2ANEX2C_COD_PCPROVISIONES = 'f2anex2c_cami';
    public readonly FORM2ANEX2C_PCPROVISIONES = 'TOTAL';
    public readonly FORM2ANEX2C_COD_TOTAL_PCPROVISIONES = 'f2anex2c_totali';

    public readonly FORM2ANEX2C_COD_PCOTRASCUENTAS = 'f2anex2c_camj';
    public readonly FORM2ANEX2C_PCOTRASCUENTAS = 'TOTAL';
    public readonly FORM2ANEX2C_COD_TOTAL_PCOTRASCUENTAS = 'f2anex2c_totalj';

    public readonly FORM2ANEX2C_COD_PNCOBLIGACIONESFINANCIERAS = 'f2anex2c_camk';
    public readonly FORM2ANEX2C_PNCOBLIGACIONESFINANCIERAS = 'TOTAL';
    public readonly FORM2ANEX2C_COD_TOTAL_PNCOBLIGACIONESFINANCIERAS = 'f2anex2c_totalk';

    public readonly FORM2ANEX2C_COD_PNCOTRASCUENTAS = 'f2anex2c_caml';
    public readonly FORM2ANEX2C_PNCOTRASCUENTAS = 'TOTAL';
    public readonly FORM2ANEX2C_COD_TOTAL_PNCOTRASCUENTAS = 'f2anex2c_totall';

    public readonly FORM2ANEX2C_COD_PNCPROVISIONES = 'f2anex2c_camm';
    public readonly FORM2ANEX2C_PNCPROVISIONES = 'TOTAL';
    public readonly FORM2ANEX2C_COD_TOTAL_PNCPROVISIONES = 'f2anex2c_totalm';

    public readonly FORM2ANEX2C_COD_PRESULTADOSNOREALIZADOS = 'f2anex2c_camn';
    public readonly FORM2ANEX2C_PRESULTADOSNOREALIZADOS = 'TOTAL';
    public readonly FORM2ANEX2C_COD_TOTAL_PRESULTADOSNOREALIZADOS = 'f2anex2c_totaln';

    // -----------------------------------------------------------------------------------
    // Formulario 3 - GASTOS DE PERSONAL RELACIONADOS AL COSTO DE PRODUCCIÓN O SERVICIOS
    // -----------------------------------------------------------------------------------

    public readonly FORM3_CR = 'CONCEPTOS REMUNERATIVOS';
    public readonly FORM3_CNR = 'CONCEPTOS NO REMUNERATIVOS';
    public readonly FORM3_CT = 'CONDICIONES DE TRABAJO';
    public readonly FORM3_ACS = 'APORTACIONES Y CONTRIBUCIONES SOCIALES';
    public readonly FORM3_CTS = 'COMPENSACION POR TIEMPO DE SERVICIOS';
    public readonly FORM3_OB = 'OTROS BENEFICIOS (2)';
    public readonly FORM3_GPCT = 'GASTOS DE PERSONAL POR CONTRATOS DE TERCEROS (3)';
    public readonly FORM3_TOTAL = 'TOTAL';

    public readonly FORM3_COD_CR = 'f3_cr';
    public readonly FORM3_COD_CNR = 'f3_cnr';
    public readonly FORM3_COD_CT = 'f3_ct';
    public readonly FORM3_COD_ACS = 'f3_acs';
    public readonly FORM3_COD_CTS = 'f3_cts';
    public readonly FORM3_COD_OB = 'f3_ob';
    public readonly FORM3_COD_GPCT = 'f3_gpct';
    public readonly FORM3_COD_TOTAL = 'f3_total';

}
