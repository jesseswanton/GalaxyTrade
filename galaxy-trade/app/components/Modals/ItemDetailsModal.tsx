// Item details modal component
import { Item } from '../../types/items';
import CustomModal from './customModal';
import { Image } from '@chakra-ui/react';

interface ModalProps {
    item: Item;
    onClose: () => void;
}

export const DetailsModal: React.FC<ModalProps> = ({ item, onClose }) => {
    console.log(item.offers);
    return (
        <CustomModal isOpen={true} onClose={onClose} title={item.title}>
            <Image src={item.image} alt={item.title} />
            <p>{item.description}</p>
            <p>Condition: {item.condition}</p>
            <p>Owner: {item.owner}</p>
            <p>Offers:</p>
            <ul>
                {item.offers.map((offer, index) => (
                    <li key={index}>Offer by: {offer.offerer}, Status: {offer.status}</li>
                ))}
            </ul>
        </CustomModal>
    )
}