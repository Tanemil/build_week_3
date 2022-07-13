export interface IClientsData {
    "ragioneSociale": string,
    "partitaIva"?: number,
    "tipoCliente"?: string,
    "email"?: string,
    "pec"?: string,
    "telefono"?: number,
    "nomeContatto"?: string,
    "cognomeContatto"?: string,
    "telefonoContatto"?: number,
    "emailContatto"?: string,
    "indirizzoSedeOperativa"?: {
        "via"?: string,
        "civico"?: number,
        "cap"?: number,
        "localita"?: string,
        "comune"?: {
            "id"?: number,
            "nome"?: string,
            "provincia"?: {
                "id"?: number,
                "nome"?: string,
                "sigla"?: string
            }
        }
    },
    "indirizzoSedeLegale"?: {
        "via"?: string,
        "civico"?: number,
        "cap"?: number,
        "localita"?: string,
        "comune"?: {
            "id"?: number,
            "nome"?: string,
            "provincia"?: {
                "id"?: number,
                "nome"?: string,
                "sigla"?: string
            }
        }
    },
    "dataInserimento"?: number,
    "dataUltimoContatto"?: number
}
