import React, { useContext, useEffect, useState } from 'react';
import { Album, Faixa } from '../../interfaces';
import { Input } from '../../component/input';
import Albuns from './albuns';
import { Select } from '../../component/select';
import Faixas from '../../component/faixas';
import { MusicContext, MusicContextType } from '../../context';
import { RoundedButton } from '../../component/button';
import { Modal } from '../../component/modal';
import Loading from '../../component/loading';



type SelectType = 'album' | 'faixa'

type AlbumOrFaixa = Album[] | Faixa[]
function Home() {

    const {
        music,
        loading,
        refetchAlbuns,
        refetchFaixas } = useContext(MusicContext) as MusicContextType

    const [selectType, setSelectType] = useState<SelectType>('album')
    const [searchData, setSearchData] = useState<AlbumOrFaixa>([])
    const [openModal, setOpenModal] = useState(false)


    const handleModalOpen = () => {
        setOpenModal(!openModal)
    }


    useEffect(() => {

        selectType === 'album' ?
            refetchAlbuns()
            :
            refetchFaixas()

    }, [selectType])

    const handleChange = (searchText: string) => {

        if (searchText.length === 0) {

            selectType === 'faixa' ?
                setSearchData(music.faixas)
                :
                selectType === 'album'
            setSearchData(music.albuns)


        }

        const oldData: AlbumOrFaixa = selectType === 'album' ? music.albuns : music.faixas

        const newData: AlbumOrFaixa = oldData.filter((item) => item.nome.includes(searchText))


        setSearchData(newData)


    }
    if (loading) {
        return (
            <div className='h-screen'>
                <Loading />
            </div>
        )
    }


    return (
        <div className='
    w-full 
    flex 
    flex-col 
    justify-center 
    items-center 
    gap-8
   '>
            <div className='
            p-[60px] 
            flex 
            flex-col
            gap-10 
            justify-center 
            items-center '>
                <div className='
            flex 
            flex-col
            gap-2 
            justify-center 
            items-center '>
                    <h1 className='font-bold text-4xl '>Sucessos de Tião Carreiro e Pardinho</h1>
                    <h1 className='font-medium text-2xl '>Escolha a sua musica preferida </h1>
                </div>

            </div>
            <div className='
            w-full 
            md:px-[25%] 
            px-[15%] 
            grid 
            grid-cols-[2fr,1fr]
            gap-2
            '>

                <Input
                    placeholder={'Digita aqui seu album'}
                    onChange={(event) => handleChange(event.target.value)} />


                <Select

                    onChange={(e) => setSelectType(
                        e.target.value as SelectType
                    )}>
                    <option value={'album'} >Album</option>
                    <option value={'faixa'}>Faixa</option>
                </Select>
            </div>
            <RoundedButton
                onClick={() => setOpenModal(true)}>+</RoundedButton>
            <Modal
                openModal={openModal}
                handleModalOpen={handleModalOpen}
                typeForm={selectType}
            />
            {selectType === 'album' ?
                <Albuns data={searchData.length > 0 ? searchData : music.albuns} />
                :
                <Faixas data={searchData.length > 0 ? searchData as Faixa[] : music.faixas} />}

        </div>

    );
}

export default Home;
