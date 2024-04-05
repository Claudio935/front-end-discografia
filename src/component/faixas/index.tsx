
import { Faixa } from '../../interfaces'
import { RoundedDeleteButton } from '../button'

interface FaixasProps {
    data: Faixa[]
}
const Faixas = ({ data }: FaixasProps) => {


    return (
        <div className='
        w-full 
        md:px-72
        px-7 
        flex 
        flex-col 
        gap-4
        h-[calc(100vh_-_390px)]
        overflow-y-auto'>
            {data.map((item) => {
                return (
                    <div
                        key={item.id}
                        className='
                            flex
                            flex-row
                            w-full
                            justify-between
                            items-center
                            p-4
                            border-black
                            border-solid
                            border
                            rounded-lg
                            '>
                        <p className='font-bold text-xs md:text-base'>
                            {item.nome}
                        </p>
                        <div className='flex flex-row justify-center gap-2 items-center'>
                            <p className='font-normal text-base'>
                                duração:
                            </p>
                            <div className='
                            flex
                            items-center
                            justify-center
                            gap-2

                            '>
                                <p className='text-xs font-bold'>
                                    {item.duracao}
                                </p>
                                <RoundedDeleteButton deleteType='faixa' albumFaixaId={item.id} />
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default Faixas