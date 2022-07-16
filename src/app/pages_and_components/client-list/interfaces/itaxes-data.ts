export interface ITaxesData {
    "data": number,
    "numero": number,
    "scadenza": number,
    "importo": number,
    "natura": string,
    "quantita": number,
    "cliente": {
        "nome": string,
        "id": number
    },
    "id": number
}
