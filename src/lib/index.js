export const AP = {
  base: 4,
  start: 4,
  max: 6
}

// TODO: hp max by character + statuses
export const HP_MAX = (stats, equipment, statuses) => {
  const { con, siz } = stats
  let hpMax = con * 5 + siz * 15
  if (equipment)
    Object.keys(equipment).map(key => {
      const { hp } = equipment[key]
      if (hp) hpMax += hp
    })
  return hpMax
}

export const STATS = character => {
  const { equipment, attributes, statuses } = character
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
  if (statuses)
    Object.values(statuses).map(({ bonuses: b }) => {
      if (b)
        Object.entries(b).map(([key, bns]) => {
          if (bonuses[key]) bonuses[key] += bns
        })
    })
  let totalStats = {}
  Object.keys(attributes).map(attr => (totalStats[attr] = bonuses[attr] + attributes[attr]))
  return totalStats
}

export const EQUIPEMENT_STATS = equipment => {
  if (!equipment) return {}
  let ttlarmor = 0
  let ttlmagicArmor = 0
  let ttlhp = 0
  let ttlstr = 0
  let ttldex = 0
  let ttlcon = 0
  let ttlpow = 0
  let ttlcha = 0
  let ttlint = 0
  let ttlsiz = 0
  let ttlcreditsValue = 0
  Object.values(equipment).map(item => {
    const { armor, magicArmor, hp, bonus, creditsValue } = item
    if (armor) ttlarmor += armor
    if (magicArmor) ttlmagicArmor += magicArmor
    if (hp) ttlhp += hp
    if (bonus) {
      const { str, dex, con, pow, cha, int, siz } = bonus
      if (str) ttlstr += str
      if (dex) ttldex += dex
      if (con) ttlcon += con
      if (pow) ttlpow += pow
      if (cha) ttlcha += cha
      if (int) ttlint += int
      if (siz) ttlsiz += siz
    }
    ttlcreditsValue += creditsValue
  })
  return {
    armor: ttlarmor,
    magicArmor: ttlmagicArmor,
    hp: ttlhp,
    str: ttlstr,
    dex: ttldex,
    con: ttlcon,
    pow: ttlpow,
    cha: ttlcha,
    int: ttlint,
    siz: ttlsiz,
    credits: ttlcreditsValue
  }
}

export const STATUSES_STATS = statuses => {
  let ttlarmor = 0
  let ttlmagicArmor = 0
  let ttlhp = 0
  let ttlstr = 0
  let ttldex = 0
  let ttlcon = 0
  let ttlpow = 0
  let ttlcha = 0
  let ttlint = 0
  let ttlsiz = 0
  let ttlLifeSteal = 0
  if (statuses)
    Object.values(statuses).map(({ bonuses }) => {
      const { armor, magicArmor, hp, lifeSteal } = bonuses
      if (armor) ttlarmor += armor
      if (magicArmor) ttlmagicArmor += magicArmor
      if (hp) ttlhp += hp
      if (lifeSteal) ttlLifeSteal += lifeSteal
    })
  return {
    armor: ttlarmor,
    magicArmor: ttlmagicArmor,
    hp: ttlhp,
    str: ttlstr,
    dex: ttldex,
    con: ttlcon,
    pow: ttlpow,
    cha: ttlcha,
    int: ttlint,
    siz: ttlsiz,
    lifeSteal: ttlLifeSteal
  }
}
