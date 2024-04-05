import { useContext, useState } from 'react'
import { Button } from '../../button'
import { Input } from '../../input'
import { api } from '../../../services'
import { Select } from '../../select'
import { MusicContext, MusicContextType } from '../../../context'
import { useParams } from 'react-router-dom'
import Loading from '../../loading'





export const FormCreateAlbum = () => {
    const { refetchAlbuns } = useContext(MusicContext) as MusicContextType


    const [formData, setFormdata] = useState({
        nome: ''
    })
    const [loading, setLoading] = useState(false)



    const handleCadastrar = () => {
        setLoading(true)
        api.post('/api/album', formData)
            .then(() => {
                alert('Album adicionado com sucesso')
                refetchAlbuns()
            })
            .catch(() => console.log('deu ruim'))
            .finally(() => {



                setLoading(false)


            })
    }
    if (loading) {
        return (
            <Loading />
        )
    }
    return (


        <>



            <div
                className='
                    flex 
                    flex-row 
                    items-center 
                    justify-center'>
                <h1 className='font-bold text-3xl text-center'>
                    Adicione um novo álbum
                </h1>


            </div>


            <Input placeholder='Nome'
                name={'nome'}
                onChange={(event) =>

                    setFormdata(
                        (formData) => ({
                            ...formData,
                            [event.target.name]: event.target.value
                        }))} />


            <Button
                onClick={handleCadastrar}
            >Adicionar novo Album</Button>
        </>

    )
}

interface FaixaFormDataType {
    nome: string
    duracao: string
    'album_id': number | null
}

export const FormCreateFaixa = () => {
    const { music, refetchAlbum, refetchAlbuns } = useContext(MusicContext) as MusicContextType
    const { id = null } = useParams()

    const [formData, setFormdata] = useState<FaixaFormDataType>({
        nome: '',
        duracao: '',
        'album_id': id ? parseInt(id) : null,
    })
    const [loading, setLoading] = useState(false)


    const handleCadastrar = () => {
        setLoading(true)
        console.log(formData)

        api.post('/api/faixa', formData)
            .then(() => alert('Faixa adicionado com sucesso'))
            .catch(() => console.log('deu ruim'))
            .finally(() => {

                if (id) {
                    refetchAlbum(id)
                } else {
                    refetchAlbuns()
                }
                setLoading(false)
            })
    }
    if (loading) {
        return (<Loading />)

    }
    return (

        <>
            <h1 className='font-bold text-3xl text-center'>
                Adicione um nova faixa
            </h1>





            <Input placeholder='Nome'
                name={'nome'}
                onChange={(event) =>

                    setFormdata(
                        (formData) => ({
                            ...formData,
                            [event.target.name]: event.target.value
                        }))} />

            <Input placeholder='Duração'
                name={'duracao'}
                type='time'
                onChange={(event) =>

                    setFormdata(
                        (formData) => ({
                            ...formData,
                            [event.target.name]: event.target.value
                        }))} />
            <Select
                name={'album_id'}
                onChange={(event) =>

                    setFormdata(
                        (formData) => ({
                            ...formData,
                            [event.target.name]: event.target.value
                        }))} >
                {
                    music.albuns.map((item) =>
                        <option key={item.id} value={item.id}>
                            {item.nome}
                        </option>
                    )
                }

            </Select>

            <Button
                onClick={handleCadastrar}
                type='submit'>Adicionar nova faixa</Button>
        </>

    )
}