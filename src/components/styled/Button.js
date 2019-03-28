import system from 'system-components'

const Button = system(
  {
    is: 'button',
    display: 'inline-block',
    px: 5,
    py: 3,
    fontSize: 16,
    fontWeight: 500,
    border: '2px solid',
    borderColor: 'black',
    textAlign: 'center',
    outline: 'none',
    focus: { outline: 'none' },
    active: { outline: 'none' }
  },
  () => ({
    cursor: 'pointer'
  }),
  'color',
  'borderColor',
  'width',
  'maxWidth',
  'height',
  'hover',
  'outline'
)

export default Button
