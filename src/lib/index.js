export const AP = stats => {
  const base = Math.ceil((stats.str + stats.dex + stats.int) / 6)
  const start = Math.ceil((stats.pow + stats.siz) / 4 + 2)
  const max = Math.ceil((stats.con + stats.siz) / 4 + 5)
  return {
    base,
    start,
    max
  }
}

export const HP_MAX = stats => {
  const { con, siz } = stats
  const hpMax = con * 5 + siz * 15
  return hpMax
}

export const STATS = character => {
  const { equipment, attributes } = character
  let bonuses = {
    str: 0,
    siz: 0,
    con: 0,
    dex: 0,
    int: 0,
    pow: 0,
    cha: 0
  }

  if (equipment)
    Object.keys(equipment).map(key => {
      const eq = equipment[key]
      if (eq.bonus) Object.keys(eq.bonus).map(bns => (bonuses[bns] += eq.bonus[bns]))
    })
  let totalStats = {}
  Object.keys(attributes).map(attr => (totalStats[attr] = bonuses[attr] + attributes[attr]))
  return totalStats
}
