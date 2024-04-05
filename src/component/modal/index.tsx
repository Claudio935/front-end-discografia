
import { FormCreateAlbum, FormCreateFaixa } from './form'


interface ModalProps {
    openModal: boolean,
    handleModalOpen: () => void,
    typeForm: 'album' | 'faixa',


}

export const Modal: React.FC<ModalProps> = ({ openModal, handleModalOpen, typeForm }) => {


    return (
        <>
            <div
                onClick={handleModalOpen}
                className={`
             fixed 
             top-0
             z-10 
             right-0 
             bg-[rgb(0,0,0,0.1)]
             w-full 
             h-screen
             ${!openModal ? 'hidden' : ''} 
             `} />
            <div

                className={`
fixed
flex
flex-col
z-20 
top-0 
${!openModal ? 'md:-right-[50%]' : 'md:right-0'}
${!openModal ? '-right-[92%]' : 'right-0'}
duration-500
transition-all
md:w-1/2
w-11/12
h-screen 
bg-white
shadow-xl
rounded-lg
p-10
gap-8
justify-between`}>
                <div
                    className='w-full items-center justify-end'
                >
                    <button onClick={handleModalOpen}>X</button>
                </div>
                {
                    typeForm === 'album' ?
                        <FormCreateAlbum />
                        :
                        <FormCreateFaixa />
                }

            </div>
        </>
    )
}