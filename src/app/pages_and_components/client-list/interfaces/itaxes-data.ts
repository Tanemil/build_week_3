export interface ITaxesData {
    "data": number,
    "numero": number,
    "anno": number,
    "importo": number,
    "stato": {
        "id": number,
        "nome": string
    },
    "cliente": {
        "id": number
    }
}
