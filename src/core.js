export const g = base => `${base * 8}px`

export const colors = {
  primary1: '#add8e6',
  accent1: '#d95b43',
  accent2: '#c02942',
  accent3: '#542437',
  accent4: '#53777a',
  neutral1: '#001d29',
  neutral2: '#013340',
  neutral3: '#236475',
  neutral4: '#93b8c2',
  neutral5: '#dceff5',
  white: '#fff'
}

export const variants = {
  'primary-1': colors.primary1,
  'accent-1': colors.acent1,
  'accent-2': colors.acent2,
  'accent-3': colors.acent3,
  'accent-4': colors.acent4,
  'neutral-1': colors.neutral1,
  'neutral-2': colors.neutral2,
  'neutral-3': colors.neutral3,
  'neutral-4': colors.neutral4,
  'neutral-5': colors.neutral5,
  white: colors.white
}

export const rgba = (hex, a) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  return result ? `rgba(${r},${g},${b},${a})` : null
}
