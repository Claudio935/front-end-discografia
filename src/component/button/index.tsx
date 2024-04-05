import { ButtonHTMLAttributes, useContext } from 'react'
import { api } from '../../services'
import { MusicContext, MusicContextType } from '../../context'
import { useParams } from 'react-router-dom'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
interface ButtonDeleteProps extends ButtonProps {
    albumFaixaId: string
    deleteType: 'album' | 'faixa'
}
export const Button: React.FC<ButtonProps> = ({ ...props }) => {

    return (
        <button {...props}
            className='
            py-4
            px-10
            font-bold
            text-white
            bg-orange-700
            hover:bg-orange-800
            text-lg
            rounded-lg'/>
    )
}


export const RoundedButton: React.FC<ButtonProps> = ({ ...props }) => {

    return (
        <button {...props}
            className='
            py-4
            px-6
            font-bold
            text-white
            bg-orange-700
            hover:bg-orange-800
            text-lg
            rounded-full
            fixed
            z-[5]
            bottom-2
            right-2
            '/>
    )
}

export const RoundedDeleteButton: React.FC<ButtonDeleteProps> =
    ({ albumFaixaId, deleteType, ...props }) => {

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const deleteIcon = require('../../assets/icon/delete.png')
        const { refetchAlbuns, refetchAlbum } = useContext(MusicContext) as MusicContextType
        const { id } = useParams()
        const deleteFaixaOrAlbum = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation()


            api.delete(`/api/${deleteType}/${albumFaixaId}`)
                .then(() => alert('faixa deletada'))
                .catch((err) => console.log(err.message))
                .finally(() => {

                    if (id) {
                        refetchAlbum(id)
                        return
                    }
                    refetchAlbuns()

                })
        }


        return (
            <button {...props}
                onClick={(e) => deleteFaixaOrAlbum(e)}
                className='
            py-3
            px-3
            font-bold
            text-white
            bg-red-700
            hover:bg-red-800
            md:text-lg
            text-sm
            rounded-full
            z-[5]
            '>
                <img
                    src={deleteIcon}
                    className='w-5 h-5'
                />
            </button>
        )
    }

