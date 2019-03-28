import styled from 'styled-components'

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.opacity};
  object-position: ${props => props.objectPosition || 'left'};
`

Image.Gray = styled(Image)`
  filter: grayscale(1);
`

export default Image
