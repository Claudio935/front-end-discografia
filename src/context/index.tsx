import { createContext, useState } from 'react'
import { Album, AlbumWithFaixa, Faixa } from '../interfaces'
import { api } from '../services'
type Type = 'albuns' | 'faixas' | 'album' | 'faixa'
export interface Action {
    type: Type
    payload?: {
        id: string | null
    }
}

export interface InitialStateType {
    albuns: Album[]
    faixas: Faixa[]
    album: AlbumWithFaixa | null

}

export const initialState: InitialStateType = {
    albuns: [],
    faixas: [],
    album: null

}
export interface MusicContextType {
    music: InitialStateType
    loading: boolean
    refetchAlbuns: () => void
    refetchFaixas: () => void
    refetchAlbum: (id: string) => void

}
export const MusicContext = createContext<MusicContextType | null>(null);

const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [music, setMusic] = useState<InitialStateType>(initialState)
    const [loading, setLoading] = useState(false)
    const refetchAlbuns = async () => {
        setLoading(true)
        try {
            const { data } = await api.get('api/album')
            setMusic((music) => ({ ...music, albuns: data }))
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false);
        }
    }
    const refetchFaixas = async () => {
        try {
            setLoading(true)

            const { data } = await api.get('api/faixa')
            setMusic((music) => ({ ...music, faixas: data }))

        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false);
        }
    }
    const refetchAlbum = async (id: string) => {
        try {
            setLoading(true)
            const { data } = await api.get(`api/album/${id}`)
            setMusic((music) => ({ ...music, album: data }))
            setLoading(false)
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <MusicContext.Provider
            value={{
                music,
                loading,
                refetchAlbum,
                refetchAlbuns,
                refetchFaixas
            }}>
            {children}
        </MusicContext.Provider>
    )
}
export default MusicProvider;