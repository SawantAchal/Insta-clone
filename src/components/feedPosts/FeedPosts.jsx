import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FeedPost from './FeedPost'

const FeedPosts = () => {
  const [isLoading , setIsLoading] = useState(true)

  //set time for loading skeleton
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
  }, [])

  return (
    <Container maxW={'container.sm'} py={10} px={2}>
      {
        isLoading && [0,1,2,3].map((_,index) => (
          <VStack key={index} gap={4} alignItems={'flex-start'} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={10} />
              <VStack gap={2} alignItems={'flex-start'}>
                <Skeleton height={'10px'} w={'200px'} />
                <Skeleton height={'10px'} w={'100px'} />
              </VStack>
            </Flex>
            <Skeleton w={'full'}>
              <Box h={'500px'}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))
      }
      {
        !isLoading && (
          <>
            <FeedPost img='/img1.png' username='achal sawant' avatar='/img1.png'/>
            <FeedPost img='/img2.png' username='amol dhawle' avatar='/img2.png'/>
            <FeedPost img='/img3.png' username='Bubu' avatar='/img3.png'/>
            <FeedPost img='/img4.png' username='Dudu' avatar='/img4.png'/>
          </>
        )
      }
    </Container>
  )
}

export default FeedPosts