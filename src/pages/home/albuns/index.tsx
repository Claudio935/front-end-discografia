import { useNavigate } from 'react-router-dom';
import { Album } from '../../../interfaces';
import { RoundedDeleteButton } from '../../../component/button';



interface Albuns {
    data: Album[]

}

const Albuns = ({ data }: Albuns) => {


    const navigation = useNavigate()
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
        e.stopPropagation()
        navigation(`album/${id}`)
    }

    return (
        <div className='    
        w-full 
        flex 
        flex-col 
        gap-2 
        md:px-72
        px-7
        h-[calc(100vh_-_390px)]
        overflow-y-auto'>

            {
                data.map((item) => {

                    return (
                        <div
                            key={item.id}
                            className='
              cursor-pointer
              border-spacing-2
              rounded-lg
              border-solid
              border-black
              border
              flex 
              flex-row 
              items-center 
              justify-between 
              w-full
              p-5
              hover:bg-orange-800
              hover:text-white'
                            onClick={(e) => { handleClick(e, item.id) }}>
                            <p className='font-bold text-xs md:text-base' >Album: {item.nome}</p>
                            <div className='
                            flex 
                            flex-row 
                            justify-center 
                            items-center
                            gap-2'>
                                <p>Ver mais</p>
                                <RoundedDeleteButton deleteType='album' albumFaixaId={item.id} />
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )

}

export default Albuns;