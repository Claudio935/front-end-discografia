export interface Album {
    nome: string,
    id: string,

}
export interface Faixa {
    nome: string,
    id: string,
    duracao: string,
    album_id: string
}
export interface AlbumWithFaixa extends Album {
    faixas: Faixa[]
}
