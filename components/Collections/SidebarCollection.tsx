import React from 'react';
import { Box, Typography, Drawer, IconButton, Button } from '@mui/material'
import Image from 'next/image'
import { Close } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from "react-redux";
import {
    selectsShowCollectionDrawer,
    toggleCollectionDrawer,
    selectsCartItems,
    removeCartItem,
    resetCart,
    addBeerCollection,
    addCartToCollection
} from '../../store/collectionSlice';
import { BeerItem } from '../../pages/beers';

interface BeerProps {
    beer: BeerItem,
    handleRemoveCartItem: (id: number) => void
    handleAddCollection: (beer: BeerItem) => void
}

const SidebarCollection = () => {
    const collectionDrawer = useSelector(selectsShowCollectionDrawer)
    const beers = useSelector(selectsCartItems) ?? []
    const dispatch = useDispatch()

    const handleCollectionDrawer = () => {
        dispatch(toggleCollectionDrawer())
    }

    const handleRemoveCartItem = (id: number) => {
        dispatch(removeCartItem(id))
    }

    const handleResetCart = () => {
        if (beers.length > 0) {
            dispatch(resetCart())
        }
    }

    const handleAddCollection = (beer: BeerItem) => {
        dispatch(addBeerCollection(beer))
    }


    const handleAddCartToCollection = () => {
        dispatch(addCartToCollection())
    }


    return (
        <Drawer
            anchor="right"
            open={collectionDrawer}
            onClose={handleCollectionDrawer}
            sx={{
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: '400px',
                    padding: '16px',
                },
            }}
        >
            <Header>
                <Typography>
                    Collection Cart
                </Typography>
                <IconButton
                    onClick={handleCollectionDrawer}
                >
                    <Close />
                </IconButton>
            </Header>
            <Box sx={{
                marginBottom: '16px',
                display: 'flex',
                gap: '16px'
            }}>
                <Button
                    onClick={handleAddCartToCollection}
                    variant="contained">
                    Add to Collection
                </Button>
                <Button
                    onClick={handleResetCart}
                    variant="outlined"
                    color="primary">
                    Remove all
                </Button>
            </Box>
            <Box>
                {beers && beers.length > 0 && beers.map((beer) => {
                    return (
                        <Beer
                            key={`cart-${beer.id}`}
                            beer={beer}
                            handleAddCollection={handleAddCollection}
                            handleRemoveCartItem={handleRemoveCartItem} />
                    )
                })}
                {
                    beers && beers.length === 0 && <Typography>Start adding items to cart</Typography>
                }
            </Box>

        </Drawer>
    );
};

const Beer = ({
    beer,
    handleRemoveCartItem,
    handleAddCollection
}: BeerProps) => {
    return (
        <BeerItemContainer
            key={`cart-${beer?.id}`}>
            <Box sx={{
                position: 'relative',
                height: 170,
                flex: 1,
                width: '30%',
                '>img': {
                    width: 'auto !important',
                    margin: 'auto'
                }
            }}>
                <Image
                    src={beer?.image_url}
                    alt="Beer Image"
                    fill={true}
                    loading='lazy'
                    placeholder='blur'
                    blurDataURL={beer?.blurDataUrl ?? ''}
                    style={{
                        objectFit: 'contain'
                    }}
                />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Typography color="primary.main">
                    {beer?.name}
                </Typography>
                <Typography
                    color="secondary.light"
                    variant="subtitle2">
                    {beer?.tagline}
                </Typography>
                <Typography variant="subtitle2">
                    {beer?.abv} %
                </Typography>
                <Typography
                    color="secondary.dark"
                    sx={{
                        fontSize: '12px',
                        flex: 1,
                        display: 'flex',
                        alignItems: 'flex-end',
                        marginBottom: '8px',
                    }}
                    variant="subtitle2">
                    by {beer?.contributed_by}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <Button
                        size="small"
                        variant='contained'
                        onClick={() => handleAddCollection(beer)}
                    >
                        Add to Collection
                    </Button>
                    <Button
                        size="small"
                        variant='outlined'
                        onClick={() => handleRemoveCartItem(beer?.id)}
                    >
                        Remove
                    </Button>
                </Box>
            </Box>

        </BeerItemContainer>
    )
}

const Header = styled(Box)(({ }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 16px',
}))

const BeerItemContainer = styled(Box)(({ }) => ({
    display: 'flex',
    gap: '16px',
    padding: '16px 16px',
    borderRadius: '16px',
    marginBottom: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    boxShadow: '0 0 10px 1px rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(2px)',
    border: '1px solid rgba(255, 255, 255, .05)',
    '>div:last-child': {
        width: '70%'
    }
}))

export default SidebarCollection;