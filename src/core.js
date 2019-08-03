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

export const rgba = (hex, a) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  return result ? `rgba(${r},${g},${b},${a})` : null
}
