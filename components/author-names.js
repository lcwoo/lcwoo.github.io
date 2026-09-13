import { Text, useColorModeValue } from '@chakra-ui/react'

const AuthorNames = ({ authors, fontSize = '0.8rem', lineHeight = 1.5 }) => {
  const muted = useColorModeValue('ink.500', 'ink.400')
  const strong = useColorModeValue('ink.900', 'ink.50')

  return (
    <Text color={muted} fontSize={fontSize} lineHeight={lineHeight}>
      {authors.map((author, index) => {
        const isMe = /chungwoo lee/i.test(author)

        return (
          <Text
            as="span"
            key={`${author}-${index}`}
            fontWeight={isMe ? 700 : 400}
            color={isMe ? strong : 'inherit'}
          >
            {author}
            {index < authors.length - 1 ? ', ' : ''}
          </Text>
        )
      })}
    </Text>
  )
}

export default AuthorNames
