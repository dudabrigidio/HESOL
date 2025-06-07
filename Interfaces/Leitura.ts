export interface Leitura {
    idLeitura: number | string;
    idUsuario: number| string;
    idSensor: number| string;
    temperatura: number | string;
    Co2: number | string;
    umidade: number | string;
    poluicao: number | string;
    resultado: string |  null;
}