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
        if (formData.nome.length === 0) {
            alert('preencha todos os campos')
            return
        }
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
    'album_id': string | null
}

export const FormCreateFaixa = () => {
    const { music, refetchAlbum, refetchFaixas } = useContext(MusicContext) as MusicContextType
    const { id = null } = useParams()

    const [formData, setFormdata] = useState<FaixaFormDataType>({
        nome: '',
        duracao: '',
        'album_id': id ? id : null,
    })
    const [loading, setLoading] = useState(false)


    const handleCadastrar = () => {
        if (formData.nome.length === 0) {
            alert('preencha o campo do nome')
            return
        }
        if (formData.duracao.length === 0) {
            alert('preencha o campo de duração')
            return
        }
        if (!formData.album_id) {
            alert('preencha o campo de duração')
            return
        }


        setLoading(true)

        console.log(formData.album_id)

        api.post('/api/faixa', formData)
            .then(() => alert('Faixa adicionado com sucesso'))
            .catch(() => console.log('deu ruim'))
            .finally(() => {

                if (id) {
                    refetchAlbum(id)
                } else {
                    refetchFaixas()
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
                <option disabled >Selecione uma opção</option>
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