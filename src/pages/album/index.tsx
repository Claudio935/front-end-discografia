import { useContext, useEffect, useState } from 'react';

import { Faixa } from '../../interfaces';
import { Input } from '../../component/input';
import Faixas from '../../component/faixas';
import { MusicContext, MusicContextType } from '../../context';
import { useParams } from 'react-router-dom';
import { RoundedButton } from '../../component/button';
import { Modal } from '../../component/modal';
import Loading from '../../component/loading';



const AlbumPage = () => {

    const { music, loading, refetchAlbum } = useContext(MusicContext) as MusicContextType
    const { id } = useParams()

    const [searchFaixas, setSearchFaixas] = useState<Faixa[]>([])
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        if (id)
            refetchAlbum(id)
    }, [id])



    const handleChange = (searchText: string) => {
        if (!music.album) {
            return
        }

        if (searchText.length === 0) {
            setSearchFaixas(music.faixas)
        }
        const oldFaixas = music.faixas

        const newFaixas = oldFaixas.filter((item) => item.nome.includes(searchText))

        setSearchFaixas(newFaixas)
    }

    const handleModalOpen = () => {

        setOpenModal(!openModal)


    }
    if (loading) {
        return (
            <div className='h-screen'>
                <Loading />
            </div>
        )
    }
    return (
        <div className='flex items-center justify-center flex-col gap-8'>
            <div
                className=' 
            p-[60px]
           
            w-full
            flex
            flex-col
            justify-center
            items-center
            gap-12
            '>
                <div className='
                w-full
            flex
            flex-row
            gap-2
            justify-start
            items-center
            md:px-20
            px-10
            '>
                    <h1
                        className='
                md:text-4xl 
                text-xl
                font-bold'>Album:</h1>
                    <h1
                        className='
           
            md:text-4xl 
            text-xl 
            font-medium'> {music.album?.nome}</h1>
                </div>


            </div>
            <div className='w-full md:px-[25%] px-[15%]'>
                <Input
                    placeholder='Digita aqui a faixa do album'
                    onChange={(event) => handleChange(event.target.value)} />
            </div>
            <Faixas data={
                searchFaixas.length > 0 ?
                    searchFaixas : music.album?.faixas ?
                        music.album.faixas : []} />
            <RoundedButton
                onClick={() => setOpenModal(true)}>+</RoundedButton>
            <Modal
                openModal={openModal}
                handleModalOpen={handleModalOpen}
                typeForm={'faixa'}
            />

        </div>
    )
}
export default AlbumPage;