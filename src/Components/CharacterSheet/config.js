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
    options: [{ label: 'Héros', value: 'hero' }, { label: 'Ennemi', value: 'foe' }]
  },
  {
    type: 'children',
    id: 'attributes',
    label: 'Attributs',
    extendedType: 'attributes',
    children: [
      { id: 'str', label: 'Force', score: '(3d6)' },
      { id: 'con', label: 'Constitution', score: '(3d6)' },
      { id: 'siz', label: 'Taille', score: '(3d6)' },
      { id: 'dex', label: 'Dexterité', score: '(3d6)' },
      { id: 'int', label: 'Intelligence', score: '(3d6)' },
      { id: 'pow', label: 'Puissance', score: '(2d6 + 6)' },
      { id: 'cha', label: 'Charisme', score: '(2d6 + 6)' }
    ]
  }
]
