// Modal for adding new items to inventory
import { AddItem } from '../../api/items/addItem';
import CustomModal from './customModal';
import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Input,
    Textarea,
    VStack,
    PopoverTrigger,
    PopoverRoot,
    PopoverContent
} from "@chakra-ui/react";
import { Item } from '../../types/items';
import ImageSelector from "../ImageSelector";

interface ModalProps {
    username: string | null;
    onClose: () => void;
}

export const AddItemModal: React.FC<ModalProps> = ({ username, onClose }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [condition, setCondition] = useState<string>('Good');
    const [image, setImage] = useState<string>('');
    const [tradable, setTradable] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [owner, setOwner] = useState<string | null>(username);
    
    useEffect(() => {
        if (username) {
            setOwner(username);
        }
    }, [username]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description || !image) {
            setError('Please fill in all fields');
            return;
        }

        if (!owner) {
            setError('Owner information is missing');
            return;
        }

        try {
            const newItem: Item = await AddItem({
                title,
                description,
                condition,
                image,
                owner,
                tradable
            });

            if (newItem) {
                alert('Item added successfully');
                window.location.reload();
            } else {
                alert('Failed to add item');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while adding the item');
        }
    }

    return (
        <CustomModal isOpen={true} onClose={onClose} title={`Add New Item`}>
            <Box as="form" onSubmit={handleSubmit}>
                <VStack align="stretch">
                    {error && (
                        <Box color="red.500" fontSize="sm">
                            {error}
                        </Box>
                    )}

                    <Box>
                        <label>Title</label>
                        <Input
                            type="text"
                            placeholder="Enter item title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Box>

                    <Box>
                        <label>Description</label>
                        <Textarea
                            placeholder="Enter item description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Box>

                    <Box>
                        <label>Condition</label>
                        <select
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
                        >
                            <option value="New">New</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                            <option value="Poor">Poor</option>
                        </select>
                    </Box>

                    <Box>
                    <label>Image URL </label>
                        <PopoverRoot>
                            <PopoverTrigger>
                                <div className="mx-3 hover:cursor-pointer active:scale-[.95] ] flex items-center justify-center p-2 rounded-md text-white bg-black hover:bg-gray-800 transition-all">
                                    Open Image Library
                                </div>
                            </PopoverTrigger>
                            <PopoverContent p={4} borderRadius="md" boxShadow="lg" width="auto" minWidth="300px">
                                <ImageSelector setUserPic={setImage} />
                            </PopoverContent>
                        </PopoverRoot>
                        <Input
                            type="text"
                            placeholder="Enter image URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </Box>

                    <Box>
                        <label>
                            <input
                                type="checkbox"
                                checked={tradable}
                                onChange={(e) => setTradable(e.target.checked)}
                            />{" "}
                            Tradable
                        </label>
                    </Box>

                    <Button type="submit" colorScheme="blue" width="full">
                        Add Item
                    </Button>
                </VStack>
            </Box>
        </CustomModal>
    )
}