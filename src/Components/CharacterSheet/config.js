export default [
  {
    id: 'name',
    type: 'text',
    label: 'Nom du Personnage'
  },
  {
    id: 'kind',
    type: 'select',
    label: 'Type de charactère',
    options: [
      { label: 'Héros', value: 'hero' },
      { label: 'Ennemi', value: 'foe' }
    ]
  },
  {
    id: 'race',
    type: 'select',
    label: 'Race',
    options: [
      { label: 'Hobbit', value: 'hobbit' },
      { label: 'Elfe', value: 'elf' }
    ]
  },
  {
    id: 'class',
    type: 'select',
    label: 'Classe',
    options: [
      { label: 'Voleur', value: 'thief' },
      { label: 'Guerrier', value: 'warrior' },
      { label: 'Démoniste', value: 'warlock' }
    ]
  },
  {
    type: 'children',
    id: 'attributes',
    label: 'Attributs',
    extendedType: 'attributes',
    children: [
      { id: 'str', label: 'Force' },
      { id: 'con', label: 'Constitution' },
      { id: 'siz', label: 'Taille' },
      { id: 'dex', label: 'Dexterité' },
      { id: 'int', label: 'Intelligence' },
      { id: 'pow', label: 'Puissance' },
      { id: 'cha', label: 'Charisme' }
    ]
  },
  {
    type: 'children',
    id: 'standardSkills',
    label: 'Standard Skills',
    extendedType: 'standardSkills',
    children: [
      { id: 'athletics', label: 'Athletics' },
      { id: 'boating', label: 'Boating' },
      { id: 'brawn', label: 'Brawn' },
      { id: 'conceal', label: 'Conceal' },
      { id: 'customs', label: 'Customs' },
      { id: 'dance', label: 'Dance' },
      { id: 'deceit', label: 'Deceit' },
      { id: 'drive', label: 'Drive' },
      { id: 'endurance', label: 'Endurance' },
      { id: 'evade', label: 'Evade' },
      { id: 'firstAid', label: 'First Aid' },
      { id: 'influence', label: 'Influence' },
      { id: 'insight', label: 'Insight' },
      { id: 'locale', label: 'Locale' },
      { id: 'nativeTongue', label: 'Native Tongue' },
      { id: 'perception', label: 'Perception' },
      { id: 'ride', label: 'Ride' },
      { id: 'sing', label: 'Sing' },
      { id: 'stealth', label: 'Stealth' },
      { id: 'swim', label: 'Swim' },
      { id: 'unarmed', label: 'Unarmed' },
      { id: 'willpower', label: 'Willpower' }
    ]
  },
  {
    type: 'children',
    id: 'proSkills',
    label: 'Professional Skills',
    extendedType: 'proSkills',
    children: [
      { id: 'acting', label: 'Acting' },
      { id: 'acrobatics', label: 'Acrobatics' },
      { id: 'art', label: 'Art' },
      { id: 'astrogation', label: 'Astrogation' },
      { id: 'bureaucracy', label: 'Bureaucracy' },
      { id: 'commerce', label: 'Commerce' },
      { id: 'comms', label: 'Comms' },
      { id: 'computers', label: 'Computers' },
      { id: 'courtesy', label: 'Courtesy' },
      { id: 'craft', label: 'Craft' },
      { id: 'culture', label: 'Culture' },
      { id: 'demolitions', label: 'Demolitions' },
      { id: 'disguise', label: 'Disguise' },
      { id: 'electronics', label: 'Electronics' },
      { id: 'engineering', label: 'Engineering' },
      { id: 'forgery', label: 'Forgery' },
      { id: 'gambling', label: 'Gambling' },
      { id: 'healing', label: 'Healing' },
      { id: 'language', label: 'Language' },
      { id: 'literacy', label: 'Literacy' },
      { id: 'lockpicking', label: 'Lockpicking' },
      { id: 'lore', label: 'Lore' },
      { id: 'mechanisms', label: 'Mechanisms' },
      { id: 'musicianship', label: 'Musicianship' },
      { id: 'navigation', label: 'Navigation' },
      { id: 'oratory', label: 'Oratory' },
      { id: 'pilot', label: 'Pilot' },
      { id: 'politics', label: 'Politics' },
      { id: 'research', label: 'Research' },
      { id: 'science', label: 'Science' },
      { id: 'seamanship', label: 'Seamanship' },
      { id: 'seduction', label: 'Seduction' },
      { id: 'sensors', label: 'Sensors' },
      { id: 'sleight', label: 'Sleight' },
      { id: 'streetwise', label: 'Streetwise' },
      { id: 'survival', label: 'Survival' },
      { id: 'teach', label: 'Teach' },
      { id: 'track', label: 'Track' }
    ]
  }
]
