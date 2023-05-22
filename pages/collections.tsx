import React, { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Divider, useMediaQuery, Chip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/system';
import InfiniteLoader from "react-window-infinite-loader";
import {
    FixedSizeGrid as Grid,
    GridProps,
} from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import axios from '../config/axios.config';
import { addCartItem, selectsCartItems, selectsCollections } from '../store/collectionSlice';
import { GetSessionParams, getSession } from 'next-auth/react';

const ROW_HEIGHT = 400

const Collections = () => {
    return (
        <Layout>
            <Typography
                variant="h2"
                sx={{
                    textAlign: 'center',
                    fontWeight: 600,
                    marginBottom: '24px',
                }}
            >
                Collections
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    textAlign: 'center',
                    fontWeight: 600,
                    marginBottom: '24px',
                }}
            >
                Let your eyes be amazed.
            </Typography>
            <Divider sx={{ margin: '16px auto', width: '80%' }} variant="middle" />
            <ListWrapper />
        </Layout>
    );
};

export default Collections;


const ListWrapper = () => {
    const collectionItems = useSelector(selectsCollections) ?? []

    const [loadedItemsState, setLoadedItemsState] = useState<{
        hasNextPage: boolean
        items: any[]
    }>({
        hasNextPage: true,
        items: []
    })

    const [scrollState, setScrollState] = useState({
        rowIndex: 0,
        columnIndex: 0
    })

    const loadMoreItems = async (startIndex?: number = 0, stopIndex?: number = 0) => {
        const previousItem = loadedItemsState?.items[loadedItemsState?.items?.length - 1] ?? null;
        const previousItemIndex = collectionItems.findIndex(item => item?.id === previousItem?.id)
    
        const nextItems = collectionItems.slice(
          previousItemIndex >= 0 ? previousItemIndex + 1 : 0,
            24
        );
     
        const newItems = [...loadedItemsState.items, ...nextItems];

        setLoadedItemsState({
            hasNextPage: newItems.length < collectionItems.length,
            items: newItems,
        });
    };

    useEffect(() => {
        if (collectionItems && !hasNextPage) {
            loadMoreItems()
        }
    }, [collectionItems])

    const setScrollRowAndColum = React.useCallback((rowIndex: number, columnIndex: number) => {
        setScrollState({ rowIndex, columnIndex })
    }, [])

    const { hasNextPage, items } = loadedItemsState;

    return (
        <List
            hasNextPage={hasNextPage}
            items={items}
            loadMoreItems={loadMoreItems}
            scrollState={scrollState}
            setScrollRowAndColumn={setScrollRowAndColum}
        />
    )
}

interface ListProps {
    hasNextPage: boolean,
    items: any[],
    loadMoreItems: (startIndex: number, stopIndex: number) => Promise<any>
    scrollState: {
        rowIndex: number,
        columnIndex: number
    }
    setScrollRowAndColumn: (rowIndex: number, columnIndex: number) => void
}

export interface BeerItem {
    id: number
    name: string
    image_url: string
    blurDataUrl: string
    abv: number
    tagline: string
    contributed_by: string
}

interface BeerInterface {
    columnIndex: number
    rowIndex: number
    style: React.CSSProperties,
    data: ItemData
}

interface ItemData {
    isItemLoaded: (index: number) => boolean
    items: BeerItem[],
}

const List = ({
    hasNextPage,
    items,
    loadMoreItems,
    scrollState,
    setScrollRowAndColumn
}: ListProps) => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const mdQuery = useMediaQuery(theme.breakpoints.down('md'));
    const smQuery = useMediaQuery(theme.breakpoints.down('sm'));

    const columnCount: number = smQuery ? 1 : mdQuery ? 2 : 4
    const rowCount: number = Math.ceil(items?.length / columnCount) ?? 0
    const itemCount: number = hasNextPage ? rowCount + 1 : rowCount;
    const cartItems = useSelector(selectsCartItems) ?? []
    const collectionItems = useSelector(selectsCollections) ?? []

    const isItemLoaded = (index: number) => !hasNextPage || !!items[index * columnCount]

    const itemData: ItemData = useMemo(() => ({
        isItemLoaded,
        items

    }), [isItemLoaded, items])


    const addToCart = (beer: BeerItem) => {
        dispatch(addCartItem({ beer }))
    }

    const Item: GridProps["children"] = ({ columnIndex, rowIndex, style, data }: BeerInterface) => {
        const beer = data?.items[rowIndex * (columnCount) + columnIndex] ?? undefined
        const existingInCart = cartItems.some((item) => item?.id === beer?.id) ?? false
        const existingInCollections = collectionItems.some((item) => item?.id === beer?.id) ?? false
        if (!beer) {
            return <div style={style}></div>;
        }
        return (
            <BeerItemContainer
                key={`beer-${beer?.id}`}
                style={style}
                onClick={() => addToCart(beer)}
            >
                <BeerContainer>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 700,
                            color: 'primary.main',
                            fontSize: '24px',
                            marginBottom: '12px',
                            textAlign: 'center',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {beer?.name}
                    </Typography>
                    <Box
                        sx={{
                            position: 'relative',
                            width: 'auto',
                            height: 170,
                            flex: 1,
                            '>img': {
                                width: 'auto !important',
                                margin: 'auto'
                            }
                        }}
                    >
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
                    <Divider sx={{ margin: '16px auto', width: '80%' }} variant="middle" />
                    <Typography
                        variant="subtitle2"
                        sx={{
                            textAlign: 'center',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {beer?.tagline}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        color='primary.light'
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        {beer?.abv} %
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                        {existingInCart || existingInCollections && <Chip
                            size="small"
                            label={existingInCollections ? 'Collected' : 'In Cart'} color="primary" />}
                    </Box>
                </BeerContainer>
            </BeerItemContainer>
        )
    };

    return (
        <AutoSizer
            style={{
                height: '100%',
                width: '100%'
            }}
        >
            {({ _, width }) => (
                <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    itemCount={itemCount}
                    loadMoreItems={loadMoreItems}
                >
                    {({ onItemsRendered, ref }) => (
                        <Grid
                            height={(ROW_HEIGHT * 2 + 50)}
                            width={width ? width + 24 : 24}
                            rowHeight={ROW_HEIGHT}
                            columnWidth={(width ?? 0) / columnCount}
                            rowCount={itemCount}
                            columnCount={columnCount}
                            itemData={itemData}
                            initialScrollTop={ROW_HEIGHT * scrollState.rowIndex}
                            onItemsRendered={({
                                visibleRowStartIndex,
                                visibleColumnStartIndex,
                                visibleRowStopIndex,
                                overscanRowStopIndex,
                                overscanRowStartIndex,
                            }) => {
                                setScrollRowAndColumn(visibleRowStartIndex, visibleColumnStartIndex)
                                onItemsRendered({
                                    overscanStartIndex: overscanRowStartIndex,
                                    overscanStopIndex: overscanRowStopIndex,
                                    visibleStartIndex: visibleRowStartIndex,
                                    visibleStopIndex: visibleRowStopIndex
                                });
                            }}
                            ref={ref}
                        >

                            {Item}
                        </Grid>
                    )}
                </InfiniteLoader>
            )}
        </AutoSizer>
    )
}

const BeerItemContainer = styled(Box)(({ theme }) => ({
    padding: '8px'
}))

const BeerContainer = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.05)',
    boxShadow: '0 0 10px 1px rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(2px)',
    border: '1px solid rgba(255, 255, 255, .05)',
    borderRadius: '16px',
    padding: '16px 8px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    ':hover': {
        background: 'rgba(255, 255, 255, 0.2)',
        'img': {
            animation: `shake 1s ease-in`
        }
    },
    "@keyframes shake": {
        "0%, 40%, 90": {
            transform: "translate(1px, 1px) rotate(0deg)"
        },
        "10%, 50%, 100%": {
            transform: "translate(-1px, -2px) rotate(-1deg)"
        },
        "20%, 60%": {
            transform: "translate(-3px, 0px) rotate(1deg)"
        },
        "30%, 70%": {
            transform: "translate(3px, 2px) rotate(0deg)"
        },
    },
}))

export async function getServerSideProps(context: GetSessionParams | undefined) {
    const session = await getSession(context)
  
    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
  
    return {
      props: { session }
    }
  }