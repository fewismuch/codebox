import React from 'react'

export const DownloadIcon = () => (
  <svg width='1em' height='1em' viewBox='0 0 24 24' fill='currentColor'>
    <g>
      <rect x='4' y='18' width='16' height='2' rx='1' ry='1'></rect>
      <rect x='3' y='17' width='4' height='2' rx='1' ry='1' transform='rotate(-90 5 18)'></rect>
      <rect x='17' y='17' width='4' height='2' rx='1' ry='1' transform='rotate(-90 19 18)'></rect>
      <path d='M12 15a1 1 0 0 1-.58-.18l-4-2.82a1 1 0 0 1-.24-1.39a1 1 0 0 1 1.4-.24L12 12.76l3.4-2.56a1 1 0 0 1 1.2 1.6l-4 3a1 1 0 0 1-.6.2z'></path>
      <path d='M12 13a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z'></path>
    </g>
  </svg>
)

export const GithubIcon = () => (
  <svg width='1em' height='1em' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z'></path>
  </svg>
)

export const CopyIcon = () => (
  <svg width='1em' height='1em' viewBox='0 0 1024 1024' fill='currentColor'>
    <path
      fill='currentColor'
      d='M128 320v576h576V320zm-32-64h640a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32M960 96v704a32 32 0 0 1-32 32h-96v-64h64V128H384v64h-64V96a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32M256 672h320v64H256zm0-192h320v64H256z'
    ></path>
  </svg>
)

export const SuccessIcon = () => (
  <svg width='1em' height='1em' className='icon' viewBox='0 0 1024 1024'>
    <path
      d='M512 981.333333C252.8 981.333333 42.666667 771.2 42.666667 512S252.8 42.666667 512 42.666667s469.333333 210.133333 469.333333 469.333333-210.133333 469.333333-469.333333 469.333333z m-50.432-326.101333L310.613333 504.32a32 32 0 0 0-45.226666 45.226667l174.72 174.762666a32.341333 32.341333 0 0 0 0.341333 0.341334l0.256 0.213333a32 32 0 0 0 50.048-6.144l337.450667-379.605333a32 32 0 1 0-47.872-42.496l-318.762667 358.613333z'
      fill='#52C41A'
    ></path>
  </svg>
)

const IconMap = {
  download: <DownloadIcon />,
  github: <GithubIcon />,
  copyCode: <CopyIcon />,
  success: <SuccessIcon />,
}

interface IIcons {
  name: keyof typeof IconMap
  style?: {
    color?: string
    fontSize?: string | number
  }
  className?: string

  [key: string]: any
}

export const Icons: React.FC<IIcons> = (props) => {
  const { style, name, className = '', ...rest } = props
  return (
    <span
      className={`${className} rainetian-icon`}
      {...rest}
      style={{ display: 'flex', alignItems: 'center', ...style }}
    >
      {IconMap[name]}
    </span>
  )
}
