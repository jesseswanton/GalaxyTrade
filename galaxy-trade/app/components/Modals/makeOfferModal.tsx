"use client";

import { addItemOffer } from '../../lib/actions'
import { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

const MakeOfferModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [offeredItemId, setOfferedItemId] = useState('');
    const 

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
    }
}

export default MakeOfferModal;
