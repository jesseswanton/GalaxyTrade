// Item details modal component
import { Item } from '../../types/items';
import CustomModal from './customModal';
import { Image, Text } from '@chakra-ui/react';

interface ModalProps {
    item: Item;
    onClose: () => void;
}

export const DetailsModal: React.FC<ModalProps> = ({ item, onClose }) => {
    console.log(item.offers);
    return (
        <CustomModal isOpen={true} onClose={onClose} title={item.title}>
            <Image src={item.image} alt={item.title} />
            <Text className='my-1 mt-2'>{item.description}</Text>
            <Text className='my-1'>Condition: {item.condition}</Text>
            <Text className='my-1'>Owner: {item.owner}</Text>
            <Text className='my-1'>Offers:</Text>
            <ul>
                {item.offers.map((offer, index) => (
                    <li key={index}>Offer by: {offer.offerer}, Status: {offer.status}</li>
                ))}
            </ul>
        </CustomModal>
    )
}