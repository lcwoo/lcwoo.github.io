import { Box, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const Footer = () => {
  const [views, setViews] = useState(null)

  useEffect(() => {
    // 페이지 로드 시 방문자 수 가져오기 및 카운트 증가
    fetch('https://api.countapi.xyz/hit/lcwoo.github.io/visits')
      .then(res => res.json())
      .then(data => {
        setViews(data.value)
      })
      .catch(err => console.error('Failed to fetch views:', err))
  }, [])

  return (
    <Box align="center" fontSize="sm">
      {views !== null && (
        <Box mb={3}>
          <Text fontSize="sm" color="gray.500">
            👁️ Total Views: <strong>{views.toLocaleString()}</strong>
          </Text>
        </Box>
      )}
      <Box opacity={0.4}>
        This website was inspired by
        {' '}
        <a href="https://www.craftz.dog/" target="_blank" rel="noopener noreferrer">
          Takuya Matsuyama&apos;s website
        </a>.
      </Box>
    </Box>
  )
}

export default Footer
