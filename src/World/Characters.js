export default {
  characters: {
    '-L3FaZHxx8yR1dw8AdwC': {
      hp: 100,
      hpBase: 100,
      ap: 0,
      apBase: 5,
      apMax: 11,
      apStart: 8,
      attributes: {
        cha: 9,
        con: 12,
        dex: 9,
        int: 9,
        pow: 12,
        siz: 12,
        str: 12
      },
      class: 'thief',
      equipment: {
        head: {
          bonus: {
            dex: 1,
            str: 1
          },
          name: 'Chapeau de paille'
        },
        weapon: {
          bonus: {
            str: 1
          },
          damage: 500,
          name: 'Dague de la mort qui tue',
          size: 2
        }
      },
      kind: 'hero',
      level: 1,
      name: 'GameMaster',
      race: 'hobbit',
      skills: {
        charge: {
          cooldown: 3,
          cost: 3,
          damage: 10,
          level: 1
        },
        disappear: {
          cooldown: 5,
          cost: 4,
          damage: 0,
          level: 1
        }
      },
      standardSkills: {
        athletics: 9,
        boating: 7
      }
    },
    '-L3Nt9lCYo27qf8xbYVl': {
      hp: 100,
      hpBase: 100,
      apBase: 2,
      apMax: 7,
      apStart: 4,
      attributes: {
        cha: 3,
        con: 3,
        dex: 3,
        int: 3,
        pow: 3,
        siz: 3,
        str: 3
      },
      class: 'thief',
      equipment: {
        torso: {
          armor: 1
        },
        weapon: {
          damage: 0,
          name: 'Mains nues',
          size: 1,
          type: 'str'
        }
      },
      inventory: {
        lifePotion: {
          cost: 2,
          name: 'Potion de vie',
          quantity: 1,
          recovery: 20
        }
      },
      kind: 'hero',
      level: 1,
      name: 'this is it',
      race: 'hobbit',
      standardSkills: {
        athletics: 9
      }
    },
    '-L3sRIYRXyi6HeZqJPZb': {
      hp: 100,
      hpBase: 100,
      apBase: 5,
      apMax: 10,
      apStart: 6,
      attributes: {
        cha: 11,
        con: 10,
        dex: 7,
        int: 9,
        pow: 8,
        siz: 9,
        str: 11
      },
      class: 'warlock',
      equipment: {
        torso: {
          armor: 1
        },
        weapon: {
          damage: 0,
          name: 'Mains nues',
          size: 1,
          type: 'str'
        }
      },
      inventory: {
        lifePotion: {
          cost: 2,
          name: 'Potion de vie',
          quantity: 1,
          recovery: 20
        }
      },
      kind: 'hero',
      level: 1,
      name: 'Lulu',
      race: 'elf',
      standardSkills: {
        athletics: 5
      }
    },
    '-L4GNAfiisgbYQKz40PV': {
      hp: 100,
      hpBase: 100,
      apBase: 2,
      apMax: 7,
      apStart: 5,
      attributes: {
        cha: 8,
        con: 3,
        dex: 3,
        int: 3,
        pow: 8,
        siz: 3,
        str: 3
      },
      class: 'thief',
      equipment: {
        torso: {
          armor: 1
        },
        weapon: {
          damage: 0,
          name: 'Mains nues',
          size: 1,
          type: 'str'
        }
      },
      inventory: {
        lifePotion: {
          cost: 2,
          name: 'Potion de vie',
          quantity: 1,
          recovery: 20
        }
      },
      kind: 'foe',
      level: 1,
      name: 'skel',
      race: 'hobbit',
      standardSkills: {
        athletics: 0,
        boating: 0,
        brawn: 0
      }
    },
    '-L4bhqvZEctycuAlh5dE': {
      hp: 100,
      hpBase: 100,
      apBase: 6,
      apMax: 12,
      apStart: 10,
      attributes: {
        cha: 18,
        con: 13,
        dex: 13,
        int: 13,
        pow: 18,
        siz: 13,
        str: 12
      },
      class: 'warlock',
      equipment: {
        torso: {
          armor: 1
        },
        weapon: {
          damage: 0,
          name: 'Mains nues',
          size: 1,
          type: 'str'
        }
      },
      inventory: {
        lifePotion: {
          cost: 2,
          name: 'Potion de vie',
          quantity: 1,
          recovery: 20
        }
      },
      kind: 'hero',
      level: 1,
      name: 'Robi',
      race: 'elf',
      standardSkills: {
        athletics: 20,
        boating: 0,
        brawn: 0
      }
    }
  },
  items: {
    bow: 'arc de malade',
    sword: 'épée de ouf'
  },
  skills: {
    charge: {
      cooldown: 3,
      cost: 3,
      damage: 10,
      level: 1
    },
    disappear: {
      cooldown: 5,
      cost: 4,
      damage: 0,
      level: 1
    }
  }
}

// // TODO: Get characters from firebase
// export default {
//   'ch1': {
//     idCharacter: 'pa',
//     kind: 'hero',
//     name: 'Pa le Hobbit',
//     level: 1,
//     ap: 3,
//     apBase: 3,
//     apMax: 5,
//     attributes: {
//       str: 3,
//       con: 3,
//       siz: 3,
//       dex: 3,
//       int: 3,
//       pow: 8,
//       cha: 8
//     },
//     standardSkills: {
//       athletics: 0
//     },
//     race: 'Hobbit',
//     class: 'Thief',
//     talents: [{ name: 'Maîtrise épée lvl 1' }, { name: 'Furtivité lvl 1' }],
//     skills: [{ name: 'Calouflage', cost: 3 }, { name: 'Fuite', cost: 1 }],
//     // equipment: [
//     //   {
//     //     slot: 'weapon',
//     //     item: {
//     //       name: 'Dague de la mort qui tue',
//     //       size: 2,
//     //       damage: 100,
//     //       bonus: { dexterity: 2, strength: 1 }
//     //     }
//     //   },
//     //   {
//     //     slot: 'head',
//     //     item: {
//     //       name: 'Chapeau de paille',
//     //       bonus: { dexterity: 1 }
//     //     }
//     //   },
//     //   { slot: 'neck', item: null },
//     //   { slot: 'back', item: null },
//     //   { slot: 'waist', item: null },
//     //   { slot: 'hands', item: null },
//     //   { slot: 'ring1', item: null },
//     //   { slot: 'ring2', item: null },
//     //   { slot: 'legs', item: null },
//     //   { slot: 'shoulders', item: null },
//     //   { slot: 'torso', item: null },
//     //   { slot: 'wrists', item: null },
//     //   { slot: 'feet', item: null }
//     // ],
//     equipment: {
//       weapon: { type: 'str', name: 'Mains nues', size: 1, damage: 0 },
//       torso: { armor: 1 }
//     },
//     inventory: {
//       lifePotion: {
//         name: 'Potion de vie',
//         quantity: 1,
//         cost: 2,
//         recovery: 20
//       }
//     }
//   },
//   'ch2': {
//     idCharacter: 'raoul',
//     type: 'hero',
//     name: 'Raoul la menace',
//     level: -20,
//     ap: 3,
//     apBase: 3,
//     apMax: 5,
//     attributes: {
//       str: 3,
//       con: 3,
//       siz: 3,
//       dex: 3,
//       int: 3,
//       pow: 8,
//       cha: 8
//     },
//     standardSkills: {
//       athletics: 0
//     },
//     race: 'Hobbit',
//     class: 'Cleric',
//     talents: [{ name: 'Maîtrise épée lvl 1' }, { name: 'Furtivité lvl -8000' }],
//     skills: [{ name: 'Faire du bruit', cost: 1 }, { name: "Fuite vers l'avant", cost: 1 }],
//     equipment: {
//       weapon: { type: 'str', name: 'Mains nues', size: 1, damage: 0 },
//       torso: { armor: 1 }
//     },
//     inventory: {
//       lifePotion: {
//         name: 'Potion de vie',
//         quantity: 1,
//         cost: 2,
//         recovery: 20
//       }
//     }
//     // equipment: [
//     //   {
//     //     slot: 'weapon',
//     //     item: {
//     //       name: 'Gourdin',
//     //       size: 3,
//     //       damage: 150,
//     //       bonus: { dexterity: 1, strength: 3 }
//     //     }
//     //   },
//     //   { slot: 'head', item: null },
//     //   { slot: 'neck', item: null },
//     //   { slot: 'back', item: null },
//     //   { slot: 'waist', item: null },
//     //   { slot: 'hands', item: null },
//     //   { slot: 'ring1', item: null },
//     //   { slot: 'ring2', item: null },
//     //   { slot: 'legs', item: null },
//     //   { slot: 'shoulders', item: null },
//     //   { slot: 'torso', item: null },
//     //   { slot: 'wrists', item: null },
//     //   { slot: 'feet', item: null }
//     // ],
//     // inventory: [{ name: 'Couteau suisse' }]
//   }
// }
//
// export const foes = [
//   {
//     idCharacter: 'skeleton',
//     type: 'enemy',
//     name: 'Skeleton',
//     lvl: 5,
//     ap: 2,
//     apBase: 3,
//     apMax: 6,
//     attributes: {
//       strength: 4,
//       dexterity: 4,
//       constitution: 4,
//       intelligence: 4,
//       perception: 4,
//       speed: 7
//     },
//     race: 'Undead',
//     class: 'Archer',
//     talents: [{ name: 'Maîtrise épée lvl 1' }, { name: 'Furtivité lvl 1' }],
//     skills: [{ name: 'Calouflage', cost: 1 }, { name: 'Fuite', cost: 1 }],
//     equipment: [
//       {
//         slot: 'weapon',
//         item: {
//           name: 'Dague de la mort qui tue',
//           size: 2,
//           damage: 10,
//           bonus: { dexterity: 2, strength: 1 }
//         }
//       },
//       { slot: 'head', item: null },
//       { slot: 'neck', item: null },
//       { slot: 'back', item: null },
//       { slot: 'waist', item: null },
//       { slot: 'hands', item: null },
//       { slot: 'ring1', item: null },
//       { slot: 'ring2', item: null },
//       { slot: 'legs', item: null },
//       { slot: 'shoulders', item: null },
//       { slot: 'torso', item: null },
//       { slot: 'wrists', item: null },
//       { slot: 'feet', item: null }
//     ],
//     inventory: [{ name: 'Couteau suisse' }]
//   }
// ]
