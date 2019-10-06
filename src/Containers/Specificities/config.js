export const secretShelter = {
  slug: 'secrect-shelter',
  name: 'Abri secret',
  kind: 'advantages',
  restrictions: 'Peut être inconnu ou connu d’une personne (-1)',
  points: -2,
  effects: '',
  description:
    "Vous avez découvert un endroit dissimulé aux yeux de tous, ou difficile à atteindre une grotte, des ruines, une salie secrète oubliée etc. Au fil des années, vous y avez aménagé secrètement votre tanière, votre refuge. Ce lieu n'est connu que de vous seul."
}
export const lucky = {
  slug: 'lucky',
  name: 'Chanceux',
  kind: 'advantages',
  restrictions: 'Incompatible avec Malchanceux',
  points: -3,
  effects:
    'Vous commencez chaque session un point de chance en plus.\nChaque jet de dé comprenant de la chance a une difficulté réduite de 1.',
  description: 'Vous êtes chanceux'
}
export const unlucky = {
  slug: 'unlucky',
  name: 'Malchanceux',
  kind: 'flaws',
  restrictions: 'Incompatible avec Chanceux',
  points: 3,
  effects:
    'Vous commencez chaque session un point de chance en moins.\nChaque jet de dé comprenant de la chance a une difficulté augmentée de 1.',
  description: 'Vous êtes chanceux'
}
export const maladroit = {
  slug: 'maladroit',
  name: 'Maladroit',
  kind: 'flaws',
  restrictions: 'Incompatible avec Adroit',
  points: 2,
  effects: "Vos jets d'adresse ont une difficulté augmentée de 1",
  description: 'Vous êtes maladroit.'
}
export const adroit = {
  slug: 'adroit',
  name: 'Adroit',
  kind: 'advantages',
  restrictions: 'Incompatible avec Maladroit',
  points: -2,
  effects: "Vos jets d'adresse ont une difficulté réduite de 1",
  description: 'Vous êtes adroit.'
}
export const bourgeois = {
  slug: 'bourgeois',
  name: 'Bourgeois',
  kind: 'advantages',
  points: -2,
  effects: 'Vos jets en rapport avec les bourgeois ont une difficulté réduite de 1',
  description:
    "Votre famille est sortie de la misère paysanne en installant une échoppe dans les faubourgs d'un village qui depuis est devenu une ville. Au fil des années, l'affaire familiale a pris de l'importance et vous êtes désormais à l'abri du besoin. Ceci vous vaut le respect mais aussi la convoitise de la noblesse. Afin de maintenir votre activité vous êtes amené à vous rendre au château du seigneur local pour vous acquitter des taxes. Vous prêtez également de l'argent à certaines figures du Domaine."
}
export const caravanier = {
  slug: 'caravanier',
  name: 'Caravanier',
  kind: 'advantages',
  restrictions: 'Nécessite CHA à 10',
  points: -2,
  effects: 'Vos jets en rapport avec les commerçants ont une difficulté réduite de 1',
  description:
    "Depuis des années, vous sillonnez les routes des Royaumes avec votre caravane pleine de marchandises venues des quatre coins du continent. À chacun de vos passages les hommes et femmes viennent vous acheter des armes finement ouvragées, des tissus précieux, des bijoux et de mets exotiques. C'est également pour eux l'occasion de prendre des nouvelles des pays voisins et de leurs habitants.\nComme tout marchand vous bénéficiez de bon nombre d'objets. Vous devez néanmoins vous spécialiser et établir la liste des biens que vous convoyez. Vous ne pouvez disposez que de 1000 pièces d'or en valeur de marchandises plus 200 pièces d'or par point de création supplémentaires dépensés dans cet avantage."
}
export const famous = {
  slug: 'famous',
  name: 'Célèbre',
  kind: 'advantages',
  restrictions: '',
  points: -1,
  effects: 'Vos jets en rapport avec les gens qui vous connaissent ont une difficulté rédeuite de 1',
  description:
    "Vous avez accompli un acte qui vous a valu la notoriété sur les terres environnantes. Le seigneur vous a fait venir à sa cour et vous bénéficiez désormais d'un traitement de faveur. Certes, des gens tels que vous se succèdent au château mais vous avez acquis la sympathie du seigneur. Vous êtes désormais l'une des figures du château au même titre que le Maître d'Armes, les Chevaliers ou le Chambellan."
}
export const chambellan = {
  slug: 'chambellan',
  name: 'Chambellan',
  kind: 'advantages',
  restrictions: 'Nécessite CHA à 12',
  points: -4,
  effects: "Vos jets en rapport avec l'emploi, la gestion du royaume, les villageois ont une difficulté réduite de 1",
  description:
    "Sans vous le chaos s'installerait au château. L'un de vos ancêtres a été choisi par l'aïeul du seigneur pour gérer la forteresse. Vous avez succédé à cette lourde tâche et exercez désormais la fonction la plus importante du Domaine. Les responsabilités du Chambellan sont énormes. Vous contrôlez les ressources du Domaine et vous assurez la subsistance de la famille du seigneur. Vous êtes également chargé des questions de protocoles et conseillez souvent le seigneur lors des visites amicales de ses voisins. C'est vous qui décidez qui travaille au château. Les villageois vous reconnaissent et vous respectent. Nombreux sont ceux qui rêvent de marier l'un de leurs enfants au vôtre."
}
export const bribe = {
  slug: 'bribe',
  name: 'Chantage',
  kind: 'advantages',
  restrictions: '',
  points: -4,
  effects: "Peut varier selon la personne que l'on veut faire chanter.",
  description:
    "Vous avez été le témoin d'un acte honteux, ou une information que certaines personnes veulent taire est parvenue à vos oreilles. Quelle que soit cette information (mariage secret, bâtard, etc.), vous avez décidé de la mettre à profit vous avez monnayé votre silence avec les principaux intéressés. Malin, vous avez pu exiger des avantages en monnaie ou en biens mais également un traitement de faveur s'il s'agit de nobles ou de gens fortunés.\nVous faites chanter quelu'un qui doit vous aider."
}
export const knownFamily = {
  slug: 'known-family',
  name: 'Famille reconnue',
  kind: 'advantages',
  restrictions: 'Incompatible avec Famille honnie',
  points: -1,
  effects: 'Vos jets en rapport avec les gens qui connaissent votre famille ont une difficulté réduite de 1',
  description:
    "L'un des membres de votre famille a accompli une prouesse. Tous les habitants du Domaine vous connaissent et respectent votre lignage. On vous salue dans les villages, les gens vous appellent par votre nom. Le seigneur de la région n'oublie pas votre visage et se souvient parfois lui aussi de votre identité."
}
export const fraternite = {
  slug: 'fraternite',
  name: 'Fraternité',
  kind: 'advantages',
  restrictions: '',
  points: -2,
  effects: '',
  description:
    "Vous faites parti d'une fraternité répandue dans tous les royaumes. Vous avez des contacts que vous pouvez faire jouer."
}
export const noble = {
  slug: 'noble',
  name: 'Noblesse',
  kind: 'advantages',
  restrictions: 'Incompatible avec paysan',
  points: -2,
  effects:
    'Vos jets en rapport avec les nobles ont une difficulté réduite de 1. En temps de guerre, vous pouvez être appelé au combat.',
  description:
    "Vous êtes un Chevalier, un membre de la noblesse. Par le passé, un seigneur a reconnu la bravoure d'un des vôtres et lui a octroyé le droit de monter à cheval, de porter des armes et une armure arborant un blason. À votre majorité, vous avez renouvelé la loyauté de votre famille à celle du seigneur. Vous avez le même rôle que celui-ci mais dans un unique village qui lui appartient. En temps de guerre, vous devez obéissance au Maître d'Armes. il peut alors vous considérer comme l'un de ses sergents. En paix, vous êtes son égal au côté du seigneur."
}
export const spiesNetwork = {
  slug: 'spies-network',
  name: "Réseau d'espions",
  kind: 'advantages',
  restrictions: 'Nécessite une compétence à 50 parmi : conceal, influence, insight, locale, stealth, disguise',
  points: -4,
  effects: '',
  description:
    "Au fil des années, les guerres et les trahisons ont convaincu les seigneurs de se doter de conseillers secrets qui les renseignent sur les agissements de leurs voisins ou même de certains individus puissants qui vivent sur leurs terres. Ces conseillers discrets ont constitué des réseaux d'homologues qui mettent leur intelligence au service du Domaine. Qui sont-ils ? Des malfrats ou des bandits à qui le seigneur garantit la vie sauve malgré leurs crimes ou bien des hommes habiles qui étaient prêts à tout pour ne pas vivre pauvrement d'un labeur éprouvant. La qualité d'un tel réseau se mesure à votre capacité à tenir ses hommes qui rêvent d'aventures et/ou de rapines au service de votre seigneur. La tache est ardue. il en va bien souvent de la sécurité du seigneur, de sa famille et de ses biens."
}
export const lord = {
  slug: 'lord',
  name: 'Seigneur',
  kind: 'advantages',
  restrictions: '',
  points: -5,
  effects: '',
  description:
    "Vous êtes un seigneur. Votre famille règne sur ses terres par le sang et les armes depuis des générations, et vous vous devez d'honorer sa mémoire. Vous vivez dans une forteresse qui domine vos terres et vos villages. Les mortels qui vivent sur votre territoire vous doivent respect et obéissance. Vous leur devez la paix et le respect des autres Domaines. Certes leur labeur vous nourrit, vous et les vôtres ; mais si vous exigez trop d'eux, ils se révolteront tôt ou tard contre votre famille. Vous devez donc gérer vos terres en respectant vos vassaux si vous ne voulez pas que ceux-ci se soulèvent contre vous.\nVos revenus sont difficiles à estimer. Vous mangez à votre faim sauf quand le climat affame votre peuple. Votre richesse ne se compte certainement pas en espèces sonnantes et trébuchantes mais bien en terre cultivable. La géographie de votre Domaine détermine vos richesses et il vous appartient de discuter avec votre Éminence Grise des moyens que vous employez pour faire ”fructifier” ces biens. Toutefois, si votre Domaine ne dispose pas de ville, vous serez incapable de faire du commerce et donc d'obtenir une trésorerie digne de ce nom.\nIl existe des équivalents variés de cet avantage, tel que Guide dans l'Enclave boucanière ou sang royal en Janrénie. Les conditions de gestion et les responsabilités qui en découlent sous à adapter en fonction de ces variations. Un prochain supplément décrivant de nombreux Domaines vous donneront des indications en ce sens. En Domaine : cet avantage ne peut être présent qu'une seule fois dans une Compagnie à moins que les terres des différents seigneurs ne partagent leurs histoires et leurs frontières. Dans ce dernier cas, la répartition des terres et les rapports entre vos familles doivent être débattus devant le MJ qui vous suggérera une disposition des lieux en fonction de son décor de campagne. Comme d'habitude, elle seule aura le dernier mot sur cette situation particulière."
}
export const lostLove = {
  slug: 'lost-love',
  name: 'Amour disparu',
  kind: 'flaws',
  restrictions: '',
  points: 1,
  effects: '',
  description:
    "Vous aimiez passionnément une personne qui a aujourd'hui disparu. Depuis sa disparition, vous avez perdu le goût de la vie. Vos nuits sont agitées et vous ressentez le besoin de poursuivre votre route le plus possible. Si votre amour est décédé, vous aurez d'énormes difficultés à communiquer avec les personnes du sexe opposé ; vous ne les remarquez plus. S'il est encore en vie - il s'agit alors vraisemblablement d'un enlèvement - vous n'avez qu'un seul but le retrouver."
}
export const debt = {
  slug: 'debt',
  name: 'Dette',
  kind: 'flaws',
  restrictions: '',
  points: 1,
  effects: '',
  description:
    "Vous devez une importante somme à quelqu'un déterminé à revoir son dû. Cette dette peut très bien être un service ou une mission à accomplir. il peut également être question d'une dette d'honneur.Quoi qu'il en soit, votre débiteur vous réclame régulièrement ce que vous lui devez. Dès votre première partie, votre créancier mettra tout en oeuvre pour que vous le remboursiez dans un bref délai. Si vous vous acquittez d'un surcoût d'un point, cette personne est chef d'une guilde criminelle et n'hésitera pas à lancer des mercenaires à vos trousses ou à vous menacer lui-même. il peut même tenter de vous tuer."
}
export const alien = {
  slug: 'alien',
  name: 'Étranger',
  kind: 'flaws',
  restrictions: '',
  points: 1,
  effects: 'Vos jets en relation avec les commerçants ont une difficulté augmentée de 1',
  description:
    "Vous venez de loin et ne partagez pas la nationalité des autres inspirés de votre Compagnie. Même s'ils vous apprécient vous ne pouvez empêcher certains d'entre eux d'être méfiants à votre égard. Les habitants de la région n'aiment pas avoir affaire à vous. Plus votre royaume natal est éloigné, plus les rumeurs à votre encontre circulent. Il vous est donc difficile de pratiquer le commerce ou de vous procurer certains biens sans payer des sommes beaucoup trop importantes."
}
export const badReputationFamily = {
  slug: 'bad-reputation-family',
  name: 'Famille honnie',
  kind: 'flaws',
  restrictions: 'Incompatible avec famille reconnue',
  points: 2,
  effects: 'Vos jets en rapport avec les gens qui connaissent votre famille ont une difficulté augmentée de 1',
  description:
    "Tout le monde peut commettre des erreurs mais dans les Royaumes crépusculaires certaines peuvent entraîner de sérieux ennuis. Votre famille a commis une telle faute et est peu appréciée pour cette raison. Les vôtres sont les sujets des plaisanteries ou même d'une haine irraisonnée. Les gens se moquent de vous et/ou vous maltraitent ; vous payez le crime de votre ancêtre. Peut-être tenterez-vous de laver l'honneur de votre famille ? Dans ce cas, le MJ veillera à ce que votre route soit semée d'embûches..."
}
export const badReputation = {
  slug: 'bad-reputation',
  name: 'Mauvaise réputation',
  kind: 'flaws',
  restrictions: '',
  points: 1,
  effects: 'Vos jets enver ceux qui ont entendu parler de vous ont une difficulté augmentée de 1',
  description:
    "On raconte des balivernes à votre sujet qui ne forcent pas la confiance. Les gens de la région ont eu vent de rumeurs à votre sujet et ne sont guère disposés à être aimables à votre égard. Vous rencontrerez bien des difficultés pour vous sortir d'un mauvais pas si d'aventure des ennuis survenaient sur votre sol natal. Le MJ peut considérer que cette réputation s'étend à des royaumes voisins. Exemples coureur de jupons, traître, assassin, sorcier (Obscurantiste des Abysses) etc."
}
export const orphan = {
  slug: 'orphan',
  name: 'Orphelin',
  kind: 'flaws',
  restrictions: '',
  points: 2,
  effects: '',
  description:
    "Vous avez perdu vos parents très jeune et avez été élevé par des tiers. Malgré les efforts de ces derniers, les autres enfants vous faisaient ressentir cette différence et, encore aujourd'hui, vous n'aimez guère la compagnie. Si vous avez dû vous éduquer seul."
}
export const burden = {
  slug: 'burden',
  name: 'Personne à charge',
  kind: 'flaws',
  restrictions: '',
  points: 3,
  effects: 'Quand vous êtes séparés trop longtemps de cette personne, tous vos jets ont une difficulté augmentée de 1',
  description:
    "Vous avez sous votre responsabilité une personne qui ne peut s'assumer toute seule un jeune enfant, une personne âgée, un infirme, etc. Vous ne pouvez vous absenter souvent ou alors vous devez l'emmener avec vous. Vous pouvez aussi la confier à quelqu'un de confiance. Néanmoins vous ne serez pas tranquille ; votre esprit, le jour comme la nuit; sera accaparé par l'inquiétude."
}
export const deadReputation = {
  slug: 'dead-reputation',
  name: 'Réputé mort',
  kind: 'flaws',
  restrictions: '',
  points: 1,
  effects: '',
  description:
    'On vous croit mort ! Que vous soyez parti en guerre dans une contrée désolée et dangereuse ou que votre navire ait disparu en mer, les gens de votre région natale vous croient mort. \n- Sans famille (1) : Ils ont déjà partagé vos biens si vous étiez sans famille\n- Évincé (2) : Quelqu’un de votre famille a pris votre place.\n- Remarié (3) : Votre femme (mari) a peut être déjà changé de conjoint\n- Terres annexées (4) : Nécessite Noblesse ou Seigneur -> Si vous possédiez des terres, elles ont été annexées par un seigneur voisin ou un parent lointain a déjà pris votre place.'
}
export const noLands = {
  slug: 'no-lands',
  name: 'Sans terres',
  kind: 'flaws',
  restrictions: 'Nécessite Noblesse ou Seigneur',
  points: 2,
  effects: '',
  description:
    "Vous avez perdu vos terres ou vous n'en possédez plus depuis au moins une génération. Votre existence est certainement dévouée à l'acquisition d'une nouvelle terre à moins que vous vous battiez pour récupérer vos biens."
}
export const savage = {
  slug: 'savage',
  name: 'Sauvage',
  kind: 'flaws',
  restrictions: '',
  points: 3,
  effects: 'Vos jets en rapport avec les coutumes ont une difficulté augmentée de 1',
  description:
    "Vous avez grandi, seul, dans la nature, avec pour seuls compagnons les animaux sauvages. Durant la plus grande partie de votre vie vous n'avez parlé à personne et avez tout ignoré des habitants des Royaumes crépusculaires. Depuis votre arrivée dans la société, vous avez appris quelques mots et tournures de phrases qui vous permettent d'obtenir l'autonomie d'un jeune enfant. À la création de votre personnage, vous ne pouvez pas choisir des compétences de la famille Société ou Occulte."
}
export const secret = {
  slug: 'secret',
  name: 'Secret terrible ou honteux',
  kind: 'flaws',
  restrictions: '',
  points: 2,
  effects: '',
  description:
    "Un secret vous hante. S'il était su de tous, la honte deviendrait votre ombre. il est possible qu'une vengeance vous frappe et que vous soyez rejeté par vos compagnons et/ou votre famille. Vous viviez au quotidien avec l'angoisse de voir ce secret révélé au grand jour. Ce secret vous interdit la fréquentation de certains lieux ou même de certaines personnes."
}
export const wanderer = {
  slug: 'wanderer',
  name: 'Vagabond',
  kind: 'flaws',
  restrictions: 'Incompatible avec Abri secret',
  points: 2,
  effects: '',
  description:
    "Vous n'avez nul part. où aller et les gens que vous rencontrez ne savent pas ni d'où vous venez, ni pourquoi vous vagabondez dans les Royaumes crépusculaires. Vous ne possédez rien, pas même une arme, à part vos vêtements - il ne peut s'agir d'une pièce d'armure. Vous n'avez pas d'argent."
}
export const ambidextre = {
  slug: 'ambidextre',
  name: 'Ambidextre',
  kind: 'advantages',
  restrictions: '',
  points: -5,
  effects: '',
  description:
    "Votre personnage peut utiliser indifféremment l'une ou l'autre de ses mains pour des travaux manuels, de précision ou en combat. De plus, il est capable de manipuler deux objets simultanément, un dans chaque main."
}
export const colossus = {
  slug: 'colossus',
  name: 'Colosse',
  kind: 'advantages',
  restrictions: 'Incompatible avec Tout petit. Nécessite SIZ à 15, CON et STR à 12',
  points: -5,
  effects: '+2 en STR, +2 en CON, +2 en SIZ',
  description:
    'Pour un membre de votre espèce vous êtes plus grand -sans pour autant être un géant - et plus fort que la moyenne.'
}
export const natureStrength = {
  slug: 'nature-strength',
  name: 'Force de la nature',
  kind: 'advantages',
  restrictions: '',
  points: -3,
  effects: '+1 en CON',
  description:
    "Vous êtes un solide gaillard, un de ceux que les saisonins nomment une ”force de la nature”. Vous êtes rarement malade et lorsque c'est le cas vous récupérez plus rapidement que n'importe qui d'autre."
}
export const immunity = {
  slug: 'immunity',
  name: 'Immunité',
  kind: 'advantages',
  restrictions: '',
  points: -1,
  effects:
    "L'immunité peut être mineure (1) ou majeure (2).Vos jets en rapport avec cette immunité ont une difficulté réduite de 1 / 2",
  description:
    "Vous êtes particulièrement résistant à une toxine de votre choix : alcool, drogue, poison etc. Le MJ peut exiger que vous précisiez le type ou l'origine de la toxine. Par exemple, un poison particulier."
}
export const young = {
  slug: 'young',
  name: 'Jeune',
  kind: 'advantages',
  restrictions: 'Incompatible avec Vieillard',
  points: -5,
  effects: 'Vos jets de compétence physique ont une difficulté réduite de 1',
  description: "Vous bénéficiez de la vigueur de l'adolescence. "
}
export const reflexes = {
  slug: 'reflexes',
  name: 'Réflexes éclairs',
  kind: 'advantages',
  restrictions: 'Nécessite DEX à 12',
  points: -2,
  effects: "Vous bénéficiez d'un bonus d'initiative de 3. Vos jets de rapidité ont une difficulté réduite de 1",
  description:
    "Vous êtes attentifs à votre environnement et réagissez à des situations avec les réflexes d'un véritable fauve. Vous bénéficiez d'un bonus de +3 à l'initiative."
}
export const secondBreath = {
  slug: 'second-breath',
  name: 'Second souffle',
  kind: 'advantages',
  restrictions: '',
  points: -2,
  effects: "Vos jets en rapport avec l'effort et l'asphyxhie ont une difficulté réduite de 1",
  description:
    "Bien que vous ne soyez pas forcément doté d'une capacité physique exceptionnelle, vous avez appris à économiser votre souffle. Ainsi, vous disposez de ressources insoupçonnées qui vous permettent de sortir de situations délicates. Vous ne serez essoufflé que deux fois plus longtemps après tous les autres."
}
export const augmentedSense = {
  slug: 'augmented-sense',
  name: 'Sens aiguisé',
  kind: 'advantages',
  restrictions: '',
  points: -1,
  effects: 'Vos jets en rapport avec ce sens ont une difficulté réduite de 1 / 2 / 3',
  description:
    "Un ou plusieurs de vos sens sont surdéveloppés. Les effets de cet avantage varient selon le(s) sens que vous choisissez, il est possible de choisir plusieurs sens affectés par ce trait.\n- Sens aiguisé (1) : votre sens est bien au-dessus de la moyenne.\n- Sens surdéveloppé (3) : votre sens est proche de la perfection.\n- Sens absolu (5) : votre sens est au-delà de ce que l'on peut imaginer !"
}
export const easySleep = {
  slug: 'easy-sleep',
  name: 'Sommeil facile',
  kind: 'advantages',
  restrictions: '',
  points: -1,
  effects: '',
  description:
    "Vous pouvez vous endormir n'importe où et n'importe quand. Dès que vos yeux sont clos, vous sombrez dans un sommeil profond dont on peut vous tirer aisément. Vous pouvez ainsi gérer votre sommeil journalier comme bon vous semble."
}
export const superfluousSleep = {
  slug: 'superfluous-sleep',
  name: 'Sommeil superflu',
  kind: 'advantages',
  restrictions: '',
  points: -5,
  effects: '',
  description:
    "Votre organisme n'a besoin que de quatre heures de repos total et continu par jour. Ceci vous permet de pratiquer davantage d'activités que vos compagnons et vous assure une réduction de moitié des temps d'apprentissage, à supposer que vous puissiez travailler pendant que les autres dorment."
}
export const spartian = {
  slug: 'spartian',
  name: 'Spartiate',
  kind: 'advantages',
  restrictions: '',
  points: -2,
  effects: 'Vos jets de résistance dus à la soif et la faim ont une difficulté réduite de 1',
  description: 'Vous mangez et buvez moins que la moyenne de votre peuple.'
}
export const verySmall = {
  slug: 'very-small',
  name: 'Tout petit',
  kind: 'advantages',
  restrictions: 'Incompatible avec Colosse. Nécessite SIZ à 9 maximum.',
  points: -1,
  effects: "-2 en SIZ, +2 en DEX. Vos jets d'esquive ont une difficulté réduite de 1",
  description:
    'Vous êtes vraiment plus petit que la moyenne. Vous pouvez vous faufiller là où les autres ne peuvent pas.'
}
export const arthritis = {
  slug: 'arthritis',
  name: 'Arthrite',
  kind: 'flaws',
  restrictions: '',
  points: 2,
  effects: '-1 en DEX. Vos jets de travaux manuels de précision ont une difficulté augmentée de 1',
  description:
    'Vos articulations sont douloureuses. Vous avez des difficultés à exécuter des travaux manuels de précision et à vous mouvoir aisément sous peine de ressentir des douleurs pénibles.'
}
export const cripple = {
  slug: 'cripple',
  name: 'Boiteux',
  kind: 'flaws',
  restrictions: '',
  points: 2,
  effects: '-2 en initiative. En combat, vos déplacements sont réduits de moitié',
  description: 'Handicapé de naissance ou suite à un accident; vous éprouvez des difficultés à vous déplacer.'
}
export const weak = {
  slug: 'weak',
  name: 'Fragile',
  kind: 'flaws',
  restrictions: '',
  points: 2,
  effects: 'Vos jets de résistance ont une difficulté augmentée de 1',
  description:
    "Depuis votre naissance, vous attrapez les pires afflictions. Vos amis vous ont toujours connu malade. Si une région est sous le coup d'une grave épidémie, vous serez le premier à contracter le mal."
}
export const heavySleeper = {
  slug: 'heavy-sleeper',
  name: 'Gros dormeur',
  kind: 'flaws',
  restrictions: '',
  points: 2,
  effects: "Si vous n'avez pas assez dormi, vos jets de compétence physique ont une difficulté augmentée de 1",
  description: 'Vous avez impérativement besoin de dormir 10 heures par jour.'
}
export const leprous = {
  slug: 'leprous',
  name: 'Lépreux',
  kind: 'flaws',
  restrictions: '',
  points: 4,
  effects: 'Les jets de soins sur vous ont une difficulté augmentée de 1',
  description:
    'Vous avez contracté la lèpre. Tout le monde vous fuit, de peur de développer cette terrible maladie. Votre peau en état avancé de décomposition propage une forte puanteur. Toutes blessures sont susceptibles de se gangrener.'
}
export const sicky = {
  slug: 'sicky',
  name: 'Malingre',
  kind: 'flaws',
  restrictions: 'Nécessite STR à 9 maximum',
  points: 2,
  effects: '-2 en STR',
  description:
    "La nature vous a doté d'une faible ossature et de peu de muscles. Vous êtes bien incapable de soulever de lourdes charges, de défoncer une porte ou de tordre des barreaux."
}
export const obese = {
  slug: 'obese',
  name: 'Obèse',
  kind: 'flaws',
  restrictions: '',
  points: 5,
  effects: 'Vos déplacements sont réduits de moitié. Vos jets de compétence physique ont une difficulté augmentée de 1',
  description:
    "Votre existence est une succession de festins et d'excès. Au fil des repas, votre embonpoint s'est accentué et vous êtes désormais bien incapable de participer à un effort physique."
}
export const old = {
  slug: 'old',
  name: 'Veillard',
  kind: 'flaws',
  restrictions: 'Incompatible avec Jeune',
  points: 4,
  effects: '-1 en STR. Vos jets de compétence physique et de résistance ont une difficulté augmentée de 1',
  description:
    "Les années vous ont rattrapé. Vous n'avez désormais plus la force d'antan et vos compagnons vous considèrent comme un poids. Un humain aurait entre 50 et 60 ans (adaptez cet âge selon les autres races)."
}
export const defectiveSense = {
  slug: 'defective-sense',
  name: 'Sens Déficient',
  kind: 'flaws',
  restrictions: '',
  points: 1,
  effects: 'Vos jets en rapport avec ce sens ont une difficulté augmentée de 1 / 2 / 3',
  description:
    'Un ou plusieurs de vos sens sont déficients. Les effets de ce défaut varient selon le(s) sens que vous choisissez. Il est possible de choisir plusieurs sens affectés par ce trait.\n- Sens déficient (1) : Votre sens est bien en-dessous de la moyenne.\n- Sens défaillant (3) : Votre sens est sous-développé, quasi inexistant.\n- Sens perdu (5) : Votre sens est complètement inexistant et vous handicape.'
}
export const heavySleep = {
  slug: 'heavy-sleep',
  name: 'Sommeil lourd',
  kind: 'flaws',
  restrictions: 'Incompatible avec Sommeil léger',
  points: 1,
  effects: '',
  description:
    "Votre sommeil est si profond que vous pouvez dormir dans un clocher alors que l'on sonne les cloches. Vous ne pouvez pas vous réveiller avant d'avoir dormi suffisamment. C'est une aubaine pour les assassins qui tenteraient de vous égorger dans votre sommeil."
}
export const lesserMember = {
  slug: 'lesser-member',
  name: 'Un membre en moins',
  kind: 'flaws',
  restrictions: '',
  points: 3,
  effects: 'Vos jets impliquants ce membre sont impossible',
  description:
    "Vous avez perdu l'un de vos membres en combat ou à la suite d'un accident. Quoi qu'il en soit, un certain nombre de conséquences s'appliquent. Si c'est une jambe, vous vous déplacez très lentement (MV divisé par 3). Si c'est un bras, vous ne pouvez plus utiliser d'objets nécessitant deux mains."
}
export const wineAllergy = {
  slug: 'wine-allergy',
  name: 'Allergie au vin',
  kind: 'flaws',
  restrictions: '',
  points: 1,
  effects: '',
  description: 'Mon pauvre, vous êtes allergique au vin et ne pouvez profiter des dégustations de l’Œnerrance !'
}
export const combatSensitive = {
  slug: 'combat-sensitive',
  name: 'Sens du combat',
  kind: 'advantages',
  restrictions: '',
  points: -6,
  effects:
    "Vous commencez avec une réussite sur vos compétence de combat à 75. Vous apprenez plus vite que les autres. Vos chances d'infliger un coup critique sont augmentées de 10% en combat.",
  description:
    "Le combat est votre vie et l'annonce de celui-ci vous électrise. Vous ne tenez jamais en place, vous aimez le choc des armes, le cri de la bataille, la sueur et le sang qui coulent. Vous êtes doué et vous le savez."
}
export const warWound = {
  slug: 'war-wound',
  name: 'Blessure de guerre',
  kind: 'flaws',
  restrictions: '',
  points: 3,
  effects: '',
  description:
    "Vous avez livré d'innombrables batailles et y avez récolté un peu plus que votre comptant de blessures. Vous subissez les effets d'une Blessure Critique."
}
export const permanentWarWound = {
  slug: 'permanent-war-wound',
  name: 'Blessure de guerre permanente',
  kind: 'flaws',
  restrictions: '',
  points: 5,
  effects: '',
  description:
    "Vous avez livré d'innombrables batailles et y avez récolté un peu plus que votre comptant de blessures. Vous subissez les effets d'une Blessure Critique. Cette Blessure Critique entraîne une Blessure Grave permanente."
}
export const goodSense = {
  slug: 'good-sense',
  name: 'Bon sens',
  kind: 'advantages',
  restrictions: '',
  points: -3,
  effects: '+1 INT. Vos jets de bon sens ont une difficulté réduite de 1',
  description:
    "Votre jugement est sans équivalent. Vous faites en effet preuve de bon sens en toutes circonstances. Votre entourage fait souvent appel à vous lorsqu'un problème se pose et qu'aucun spécialiste n'est présent. Vous bénéficiez d'un bonus de + 1 en INT. Le maximum de cette caractéristique est également majoré de 1 point."
}
export const clarity = {
  slug: 'clarity',
  name: 'Clarté de pensée',
  kind: 'advantages',
  restrictions: '',
  points: -2,
  effects: 'Vos jets en rapport à la concentration ont une difficulté réduite de 1',
  description:
    "Vous avez une très grande capacité de concentration. Dès que le calme est nécessaire à d'autres pour accomplir telle opération ou se livrer à une activité nécessitant des conditions favorables à la réflexion, vous vous acquitté aisément de ces tâches dans les pires circonstances."
}
export const selfConfidence = {
  slug: 'self-confidence',
  name: 'Confiance en soi',
  kind: 'advantages',
  restrictions: '',
  points: -3,
  effects: '+1 POW',
  description:
    'Vous êtes sûr de votre fait. Lorsque vous avez une conviction sur un sujet ou que vous entamez une tâche, vous êtes absolument convaincu de votre bon droit. Cette tranquille sérénité vous permet de traverser des épreuves difficiles et de réaliser de véritables exploits.'
}
export const languageTalented = {
  slug: 'language-talented',
  name: 'Don pour les langues',
  kind: 'advantages',
  restrictions: '',
  points: -2,
  effects: 'Vos jets de language ont une difficulté réduite de 1',
  description:
    'Depuis votre plus jeune âge vous manifestez un don pour les langues. Vous parliez avant votre cousin du même âge et alors que vous appreniez ensemble les subtilités du calcul mental vous parliez déjà une langue étrangère. Vous apprenez les langues plus rapidement que les autres. Vous savez reconnaître les langues des différentes régions. '
}
export const profitableMistakes = {
  slug: 'profitable-mistakes',
  name: 'Erreurs profitables',
  kind: 'advantages',
  restrictions: '',
  points: -5,
  effects: 'Vos jets de vos précéndents erreurs ont une difficulté réduite de 1',
  description:
    "Vous apprenez plus vite que les autres de vos erreurs. Vous savez en effet tiré un enseignement de chacune de vos maladresses. Beaucoup pensent que vous bénéficiez d'une expérience tirée de vie(s) antérieure(s)."
}
export const eideticMemory = {
  slug: 'eidetic-memory',
  name: 'Mémoire eidétique',
  kind: 'advantages',
  restrictions: '',
  points: -3,
  effects: '',
  description:
    "Votre mémoire est stupéfiante. Elle ne peut s'empêcher d'emmagasiner le moindre détail. Vous vous souvenez de passages entiers de livres que vous avez lus, vous citez les propos de vos interlocuteurs avec une précision déconcertante, vous apprenez des recueils de poèmes sans rencontrer la moindre difficulté.\nComme vous n'oubliez jamais rien, le MJ doit vous rappeler tous les détails des scènes que vous avez vécues."
}
export const lightSleep = {
  slug: 'light-sleep',
  name: 'Sommeil léger',
  kind: 'advantages',
  restrictions: 'Incompatible avec Sommeil lourd',
  points: -1,
  effects: '',
  description:
    "Le moindre bruit vous réveille et vous ne dormez jamais que d'un oeil. Vous pouvez vous réveiller à volonté dans votre sommeil au prix d'un jet de volonté."
}
export const ironWill = {
  slug: 'iron-will',
  name: 'Volonté de fer',
  kind: 'advantages',
  restrictions: '',
  points: -2,
  effects: 'Vos jets de volonté ont une difficulté réduite de 1',
  description:
    "Vous êtes déterminé et il est difficile de vous abuser ou de vous manipuler. Il est également ardu d'extraire des informations de vous par la ruse - le chantage ou des sortilèges par exemple - ou la force - la torture, etc. Cela s'appluique à toute tentative de vous manipuler ou à toutes pressions physiques ou psychiques."
}
export const sweetHeart = {
  slug: 'sweet-heart',
  name: 'Cœur tendre',
  kind: 'flaws',
  restrictions: 'Incompatible avec Cœur de pierre',
  points: 2,
  effects: '',
  description:
    "La souffrance des autres vous est insupportable. Vous êtes incapable de porter un coup de grâce à un humain ou un saisonin et si, en combat, un coup entraîne la mort, vous perdez le sommeil pendant plusieurs jours. Ce défaut vous oblige à éviter le danger et à convaincre vos amis de faire de même. Il peut prendre la forme d'un interdit moral si votre éthique personnelle rentre en jeu."
}
export const stoneHeart = {
  slug: 'stoneHeart',
  name: 'Coeur de pierre',
  kind: 'advantages',
  restrictions: 'Incompatible avec Coeur tendre',
  points: -2,
  effects: '',
  description:
    'Vous avez un coeur de Pierre, la souffrance des autres vous est égal. Vous avez un sang froid hors du commun.'
}
export const distracted = {
  slug: 'distracted',
  name: 'Distrait',
  kind: 'flaws',
  restrictions: '',
  points: 2,
  effects: "Vos jets en rapport avec l'attention / concentration ont une difficulté augmentée de 1",
  description:
    "Vous n'écoutez pas tout ce que l'on vous dit. On vous reproche souvent d'être dans les nuages ou de mépriser votre entourage. il est tout à fait possible que les personnes qui ne vous connaissent pas très bien -lors d'une première rencontre par exemple - croient que vous êtes sourd. Le MJ est invité à ne jamais vous rappeler les détails de ce que vous avez vécu, voire à vous en donner des descriptions moins détaillées. Vous avez un malus de -1 à tout jet demandant de l'attention."
}
export const hotTempered = {
  slug: 'hot-tempered',
  name: 'Emporté',
  kind: 'flaws',
  restrictions: '',
  points: 2,
  effects: '',
  description:
    "Vous êtes d'un tempérament colérique. Vos excès d'humeur ne sont plus discutés par vos proches depuis bien longtemps, ils se sont en effet habitués à vos colères et il leur arrive d'en jouer. Vos ennemis profitent bien souvent de cette faiblesse pour vous faire commettre des erreurs. Lorsque vous vous sentez insulté, vous devez faire un jet de volonté. Si vous échouez, vous devenez violent"
}
export const illusions = {
  slug: 'illusions',
  name: 'Illusions',
  kind: 'flaws',
  restrictions: '',
  points: 1,
  effects: '',
  description:
    "Vous vous faites des illusions. Vous êtes convaincus que vous possédez des talents surnaturels et/ou que vous pouvez produire des OEuvres que vous êtes bien incapable d'exécuter. Vous pouvez également être convaincu d'être un Mage redoutable ou que le Cryptogramme-magicien vous doit une faveur. Pour 1 point de plus, ces illusions peuvent être liées à vos ennemis. Dans ce cas, attendez-vous à ce que le MJ utilise ces ennemis dans sa campagne."
}
export const obsession = {
  slug: 'obsession',
  name: 'Obsession',
  kind: 'flaws',
  restrictions: '',
  points: 1,
  effects: '',
  description:
    "Quelque chose vous obsède. Il peut s'agir d'un trouble du comportement - regarder plusieurs fois pardessus son épaule avant de pénétrer dans une pièce, etc. - ou d'un sujet fixe qui vous empêche d'aborder objectivement des situations liées à cette obsession."
}
export const paranoid = {
  slug: 'paranoid',
  name: 'Paranoïa',
  kind: 'flaws',
  restrictions: '',
  points: 1,
  effect: '',
  description:
    "Certaines personnes vous veulent du mal. Du moins le croyez-vous ! Elles n'ont pas forcément décidé de vous tuer mais semblent y réfléchir. Vous êtes convaincu de les avoir démasquées. Vous les imaginez derrière chaque acte du quotidien qui peut paraître suspect un homme s'est retourné sur votre passage ou a levé les yeux vers vous, quelqu'un est derrière vous depuis que vous remontez la rue, etc."
}
export const phobia = {
  slug: 'phobia',
  name: 'Phobie',
  kind: 'flaws',
  restrictions: '',
  points: 1,
  effects: 'Vos jets en rapport avec votre phobie ont une difficulté augmentée de 1 / 2 / Impossible',
  description:
    "Vous êtes incommodé par quelque chose. De la simple méfiance à la terreur irraisonnée, vous soufrez bel et bien d'une phobie qui peut parfois vous causer de sérieux torts.\n- Crainte (1) : -1 aux actions en rapport avec la phobie\n- Peur (2) : -2 aux actions en rapport avec la phobie\n- Terreur (4) : Incapacité à agir face à la phobie"
}

export const presumptuous = {
  slug: 'presumptuous',
  name: 'Présomptueux',
  kind: 'flaws',
  restrictions: '',
  points: 1,
  effects: '',
  description:
    "Vous avez une haute opinion de vous-même et vous vous faites une idée très exagérée sur vos réelles capacités. Ce défaut fausse vos relations avec des personnes qui vous connaissent trop peu car elles sont tentées de vous croire lorsque vous prétendez connaître tel sujet ou être capable d'accomplir telle action. Si vous êtes un combattant, vous êtes absolument convaincu qu'aucun adversaire ne peut vous résister.\nLorsque vous échangez des données techniques sur votre personnage avec les autres joueurs, exagérez vos scores."
}
export const notSmart = {
  slug: 'not-smart',
  name: 'Pas fûté',
  kind: 'flaws',
  restrictions: 'Nécessite INT à 9 maximum',
  points: 3,
  effects: '-2 en INT',
  description:
    "Vous êtes un peu moins intelligent que la moyenne. Tout le monde s'en rend compte et n'hésite pas en faire un sujet de plaisanterie. Vous évitez autant que possible les travaux intellectuels. Vous avez beaucoup de difficulté à appréhender des concepts abstraits pourtant fort simples. Vous avez un malus de - 1 en INT."
}
export const simpleMinded = {
  slug: 'simple-minded',
  name: "Simple d'esprit",
  kind: 'flaws',
  restrictions: '',
  points: 4,
  effects: '',
  description:
    "Sans être l'idiot du village, vous êtes tout de même un peu simple d'esprit. Vos capacités cérébrales ne sont pas en cause. Il semblerait plutôt que vous ne parveniez pas à faire usage de votre intelligence. Vous avez le mode de pensée d'un enfant et éprouvez de réelles difficultés face à des problèmes abstraits. Certains vous disent candide."
}
export const sylvanSensibility = {
  slug: 'sylvan-sensibility',
  name: 'Sensibilité sylvestre',
  kind: 'advantages',
  restrictions: '',
  points: -2,
  effects: 'Vos jets de en rapport avec les plantes ont une difficulté réduite de 1',
  description:
    "Vous avez un sixième sens pour tout ce qui concerne les plantes. D'un coup d'oeil, vous pouvez jauger si elles sont comestibles ou non, d'où elles viennent, comment il faut les préparer, quelles sont leurs vertus et, s'il est possible de les cultiver, comment on peut y parvenir."
}
export const brutal = {
  slug: 'brutal',
  name: 'Brutal',
  kind: 'flaws',
  restrictions: 'Incompatible avec Ennemi naturel',
  points: 1,
  effects: 'Vos jets en rapport avec le dressage ont une difficulté augmentée de 1',
  description:
    "Vous n'aimez pas les bêtes et leur faites bien sentir. Pour 1 point de plus, les animaux dont vous disposez sont systématiquement maltraités, et le malus s'applique sur toutes les interactions, sauf lorsqu'il s'agit de les tuer, bien entendu."
}
export const charismatic = {
  slug: 'charismatic',
  name: 'Charismatique',
  kind: 'advantages',
  restrictions: '',
  points: -3,
  effects: '+1 en CHA. Vos jets pour convaincre, inspirer le respect, impressionner ont une difficulté réduite de 1',
  description:
    "D'un seul coup d'oeil vous êtes en mesure de vous faire écouter, de persuader ou de convaincre, d'inspirer le respect, d'impressionner un adversaire."
}
export const agility = {
  slug: 'agility',
  name: 'Adresse',
  kind: 'advantages',
  restrictions: '',
  points: -3,
  effects: "+1 en DEX. Vos jets d'agilité ont une difficulté réduite de 1",
  description:
    'Votre agilité est légendaire. Vous avez un contrôle inégalé sur vos muscles et vos amis vous comparent à certains félins. Vous êtes peut-être également un spécialiste des tours de passe-passe ou du pickpocket ou vous savez vous désarticuler.'
}
export const perfectInsinct = {
  slug: 'perfect-instinct',
  name: 'Instinct de la perfection',
  kind: 'advantages',
  restrictions: '',
  points: -5,
  effects: '',
  description:
    "Vos rapports avec les êtres et les choses sont instinctifs. Vous réagissez en général comme vous le sentez sans prendre la peine de réfléchir ou d'analyser et cela vous réussit. À croire que vous avez pensé certains détails de la création du monde."
}
export const inventive = {
  slug: 'inventive',
  name: 'Inventif',
  kind: 'advantages',
  restrictions: '',
  points: -1,
  effects: "Vos jets d'inventivité' ont une difficulté réduite de 1",
  description:
    "Votre personnage est en perpétuelle effervescence. Son existence n'a de sens que grâce à son inventivité qui s'exprime au quotidien dans des oeuvres, des inventions ou des solutions pratiques avec très peu de composants."
}
export const attractive = {
  slug: 'attractive',
  name: 'Séduisant',
  kind: 'advantages',
  restrictions: 'Incompatible avec Hideux',
  points: -1,
  effects: 'Vos jets de relation sociale ont une difficulté réduite de 1',
  description:
    "Les personnes des deux sexes qu'ils soient humains ou pas sont attirés par vous (exception faite de ceux n'ayant pas de représentant des deux sexes). Elles vous trouvent irrésistible et ressentent le besoin de profiter de votre compagnie. Certaines chercheront à attirer votre attention ou tenteront de vous séduire."
}
export const hideous = {
  slug: 'hideous',
  name: 'Hideux',
  kind: 'flaws',
  restrictions: 'Incompatible avec Séduisant',
  points: 1,
  effects: 'Vos jets de relation sociale ont une difficulté augmentée de 1',
  description:
    "Les personnes des deux sexes qu'ils soient humains ou pas vous trouevent répugnant (exception faite de ceux n'ayant pas de représentant des deux sexes). Elles ont du mal à profiter de votre compagnie. Certaines chercheront à se moquer de vous sans raisons."
}
export const sensitive = {
  slug: 'sensitive',
  name: 'Sensible',
  kind: 'advantages',
  restrictions: '',
  points: -3,
  effects: 'Vos jets de créativité ont une difficulté réduite de 1',
  description:
    "Votre âme est accordée au monde. Vous le considérez comme l'oeuvre ultime qui n'aura jamais de pareille. Vous en ressentez les moindres détails qui sont pour vous autant de sources d'inspiration et vous les ré-interprétez dans vos créations personnelles."
}
export const jaded = {
  slug: 'jaded',
  name: 'Blasé',
  kind: 'flaws',
  restrictions: '',
  points: 2,
  effects: 'Vos jets de créativité ont une difficulté augmentée de 1',
  description:
    'Plus rien ne vous étonne. Vous ressentez des difficultés à innover ou inventer. Au fil des années, vous avez acquis la certitude que toutes vos idées ou créations ne sont en fait que de pales copies, et non des oeuvres originales, ou des réinterprétations maladroites.'
}
export const disfigured = {
  slug: 'disfigured',
  name: 'Défiguré',
  kind: 'flaws',
  restrictions: '',
  points: 2,
  effects: 'Vos jets de relation sociale ont une difficulté augmentée de 1',
  description:
    'Suite à une bataille ou à un triste accident vous avez été défiguré. Votre entourage ressent de réelles difficultés à vous regarder en face et leur pitié tout comme leur effroi sont désormais vos compagnons de route. Une infection ou une maladie a pu tout aussi bien entraîner ce défaut.'
}
export const unpleasant = {
  slug: 'unpleasant',
  name: 'Désagréable',
  kind: 'flaws',
  restrictions: '',
  points: 2,
  effects: '-1 en CHA. Certains jets de relation sociale ont une difficulté augmentée de 1',
  description:
    "C'est plus fort que vous. Il faut que vous soyez désobligeant Vous ne pouvez vous empêcher de faire remarquer les défauts d'autrui, de vous moquer d'eux et de les ridiculiser. Ce n'est pas que vous soyez une personne retorse cherchant toujours à percer les faiblesses de votre entourage, mais plutôt que vous ne réfléchissez pas à ce que vous dîtes."
}
export const mishapen = {
  slug: 'mishapen',
  name: 'Difforme',
  kind: 'flaws',
  restrictions: '',
  points: 5,
  effects: '-1 en CHA. Certains jets de relation sociale ont une difficulté augmentée de 1',
  description:
    "Vous êtes né difforme. Que l'un de vos membres soit plus court que l'autre, que vous soyez bossu ou qu'il vous manque des doigts, votre physique indispose en général votre entourage."
}
export const undecided = {
  slug: 'undecided',
  name: 'Indécis',
  kind: 'flaws',
  restrictions: '',
  points: 4,
  effects: '',
  description:
    "Vous passez votre temps à réfléchir aux décisions à prendre sans parvenir à vous décider à temps. Ainsi, vous passez souvent à côté de l'innovation que tout le monde perçoit à un instant donné et ce sont d'autres qui les produisent avant vous. En général, votre entourage est agacé. il ressent à raison votre attitude comme un manque d'enthousiasme ou la volonté de nier ce qui contente tout le monde par esprit de contradiction."
}
export const naturalEnemy = {
  slug: 'naturalEnemy',
  name: 'Ennemi naturel',
  kind: 'flaws',
  restrictions: 'Incompatible avec Brutal',
  points: 6,
  effects: 'Vos jets en rapport avec les animaux ont une difficulté augmentée de 2',
  description:
    "Tout le règne animal vous considère comme un prédateur, un ennemi naturel dangereux. Vous ne pouvez rien obtenir des bêtes, qui dans le meilleur des cas s'enfuient à votre approche, dans le pire vous attaquent à vue. Tant que vous êtes à portée de sens d'un animal quelconque, celui-ci est pratiquement incontrôlable et tente systématiquement de s'éloigner de vous ou de vous attaquer. Bien entendu vous ne pouvez pas monter et ne pourrez jamais faire partie d'une caravane."
}
export const whip = {
  slug: 'whip',
  name: 'La Fouettarde',
  kind: 'flaws',
  restrictions: '',
  points: 2,
  effects: '- 1D10 de PV enlevés à chaque contrition.',
  description:
    'Habitué aux sanctions physiques lors de votre noviciat, vous avez développé une affliction mentale. A chaque acte que vous considérez comme honteux, vous êtes pris d’une irrésistible envie de vous infliger des coups de fouet. Définir en amont la notion de faute, en prenant comme base les préceptes de l’ordre, les croyances et les us et coutumes. Si le personnage commet une faute pendant la journée, il devra se purifier par le sang à la tombée de la nuit, dès lors qu’il sera un peu isolé. Cependant, il aura du mal à rester discret : linge et draps souillés de sang, plaies ouvertes dans le dos... Il bénéficie gracieusement d’un fouet.'
}
export const beastGifted = {
  slug: 'beastGifted',
  name: 'Don des Bêtes',
  kind: 'advantages',
  restrictions: 'Incompatible avec Brutal et Ennemi naturel',
  points: -5,
  effects: 'Vos jets en relation avec les animaux ont une difficulté réduite de 2',
  description:
    'Vous avez un don avec les animaux. Jamais aucun animal ne vous attaquera ; si vous aggressez même le plus féroce prédateur, celui-ci préférera prendre la fuite plutôt que de vous affronter. Vous n’inspirez pourtant pas la peur aux bêtes, mais plutôt un sentiment de supériorité qui vous place de facto à la tête de la meute, de la harde, du clan ou de toute autre organisation sociale dont disposent les différentes espèces animales.\nEn terme de règles, vous ne pouvez pas être attaqué par un animal, même corrompu. Par ailleurs, vous pouvez faire cohabiter sans effort (ni malus) deux espèces normalement incapables de se côtoyer, comme des loups et des chevaux par exemple. En votre présence, ils se comportent comme s’ils faisaient partie de la même communauté. Si vous les dressez, ils peuvent même considérer ce fait comme acquis, y compris lorsque vous n’êtes plus là pour modérer leurs antagonismes.'
}
export const pedagogue = {
  slug: 'pedagogue',
  name: 'Pédagogue',
  kind: 'advantages',
  restrictions: '',
  points: -3,
  effects:
    "Après un enseignement, vos élèves ont le droit de tirer 1+1d6 (au lieu de 1+1d4) d'expérience. De plus leur chance de réussite est améliorée de 50%.",
  description:
    'Formé à Préceptorale, vous savez particulièrement bien enseigner. Vous possédez une certaine réputation au sein de l’ordre pour la qualité de vos cours et la clarté de votre enseignement.'
}
export const darkHumour = {
  slug: 'darkHumour',
  name: 'Humour noir',
  kind: 'advantages',
  restrictions: '',
  points: -3,
  effects: "Vos jets de résistance à l'effroi ont une difficulté réduite de 1",
  description:
    "Vous avez l'esprit particulièrement caustique et la peur n'est pour vous qu'amusante. La terreur a du niai à vous atteindre car elle est immédiatement désamorcée par vos rires."
}
export const furious = {
  slug: 'furious',
  name: 'Furieux',
  kind: 'flaws',
  restrictions: '',
  points: 3,
  effects: '',
  description:
    "Vous avez incroyablement mauvais caractère, pire que celui d'une ogresse. Vous êtes incapable de laisser passer une insulte à moins de réussir un jet de Volonté difficulté 50. En cas d'échec, vous entrez dans une rage folle qui ne pourra s'apaiser que dans le sang. "
}
export const impulsive = {
  slug: 'impulsive',
  name: 'Impulsif',
  kind: 'flaws',
  restrictions: '',
  points: 4,
  effects: '-1 en INT',
  description:
    "Vous réfléchissez peu et agissez beaucoup, trop sans doute. Votre faible intelligence n'est pas le fait d'une lenteur de réflexion ou d'un déficit intellectuel. Elle provient de ce que vous rejetez le mode de pensée des autres et tentez d'agir à l'instinct. Vous n'avez pas de bon sens. Pire encore, chaque fois que vous obtenez un Fumble (échec critique), les résultats sont encore plus graves."
}
export const pragmatic = {
  slug: 'pragmatic',
  name: 'Pragmatique',
  kind: 'advantages',
  restrictions: '',
  points: -2,
  effects: "Vos jets d'organisation ont une difficulté réduite de 1",
  description:
    "S'il fallait trouver un nom pour caractériser l'organisation ce serait le vôtre ! Au travail comme à domicile, vous êtes ordonné, prévoyant et rien ne peut vous surprendre. Cependant, quand l'imprévu survient malgré tout, vous ne perdez jamais votre sang-froid et trouvez toujours une solution. Le désordre est votre ennemi et vous prenez toujours un malin plaisir à l'affronter...\nVous disposez d'un bonus ayant trait à l'organisation et la plannification d'une tâche, qu'il s'agisse de ranger une maison, de faire le plan d'un château ou d'attaquer un convoi."
}
export const determined = {
  slug: 'determined',
  name: 'Acharné',
  kind: 'advantages',
  restrictions: '',
  points: -1,
  effects: 'Vos jets de volonté en rapport à une quête ou un travail de longue haleine ont une difficulté réduite de 1',
  description:
    "Vous êtes un jusqu'au-boutiste invétéré. Lorsque vous vous fixez un but, vous devenez implacable en ce qui le concerne."
}
export const workaolic = {
  slug: 'workaolic',
  name: 'Obsédé du travail',
  kind: 'flaws',
  restrictions: '',
  points: 1,
  effects: 'Vos jets de relationnel ont une difficulté augmentée de 1',
  description:
    "Vous travaillez trop et cela vous handicape remarquablement. Vos amis vous ont presque oublié et votre femme ne vous voit plus. Pour vous, tout ce qui compte c'est de finir ce fichu chantier à temps ou de devenir le meilleur guerrier du clan. Vous êtes obsédé par votre travail et ne parlez que de cela. Tout autre sujet vous ennuie très vite et vous y revenez sans délais, agaçant au plus haut point les gens qui vous fréquentent."
}
export const drunkard = {
  slug: 'drunkard',
  name: 'Ivrogne',
  kind: 'flaws',
  restrictions: '',
  points: 4,
  effects: '-1 en CHA. Vos jets de relationnel ont une difficulté augmentée de 1',
  description:
    "Plus que simplement dépendant à l'alcool, vous en êtes complètement imbibé. Vos vêtements sentent son odeur, votre haleine est putride et même à jeun, vous vous exprimez de façon peu intelligible. Rat d'auberge, vous ne buvez pas pour la bonne chère mais parce que la vie est dure et qu'il faut oublier. Vous avez un besoin permanent d'alcool."
}
export const sponsor = {
  slug: 'sponsor',
  name: 'Mécène',
  kind: 'advantages',
  restrictions: '',
  points: -1,
  effects: '',
  description:
    "Vos talents artistiques ont attiré l'attention d'un riche notable qui, désormais, patronne vos efforts. Vous avez, vis-àvis de votre mécène, quelques obligations, mais il vous le rend très largement en faisant connaître vos Oeuvres et en vous payant généreusement."
}
export const vengefulDemon = {
  slug: 'vengefulDemon',
  name: 'Démon vengeur',
  kind: 'flaws',
  restrictions: '',
  points: 1,
  effects: '',
  description:
    "Vous avez attiré la haine d'un Démon, quelle qu'en soit la raison. Peut-être est-ce une sombre histoire de Connivence non remplie ou bien l'avez-vous empêché de sortir des Abysses par le passé. Dans tous les cas, il vous en veut et va tenter de vous nuire./nLe coût de ce Défaut est relatif à la puissance du Démon offensé. Vous devrez construire une histoire autour de ce Défaut avec votre MJ. À moins que vous ne le laissiez faire..."
}
export const fraternityMember = {
  slug: 'fraternityMember',
  name: "Membre d'une fraternité",
  kind: 'advantages',
  restrictions: '',
  points: -1,
  effects: '',
  description:
    "Vous appartenez à l'une des petites assemblées informelles de votre royaume. Ces groupes se réunissent sous le patronage de leur Advocatus Diaboli : ils facilitent la diffusion des encres, échangent des conseils sur les endroits à éviter, etc. Les fraternités ont chacune leur signe distinctif, parfois un emblème, et un bureau dans la plupart des grandes villes (voir plus loin). Vous pouvez compter particulièrement sur l'assistance de vos confrères si vous avez la possibilité de rencontrer l'un d'eux. En contrepartie, vous devez également tout faire pour aider un des vôtres. Toutefois, vous n'êtes pas obligé pour cela de contrevenir à la loi du royaume ou de vous mettre en danger."
}
export const exiled = {
  slug: 'exiled',
  name: 'Exilé',
  kind: 'flaws',
  restrictions: '',
  points: 2,
  effects: '',
  description:
    "Vous n'habitez plus votre cité d'origine. Pour une raison ou une autre vous avez quitté la ville qui vous a fait naître. Vous serez considéré avec pitié et déconsidération par tous les gens de votre lieu d'origine que vous rencontrerez."
}
export const offGame = {
  slug: 'offGame',
  name: 'Hors jeu',
  kind: 'flaws',
  restrictions: '',
  points: 3,
  effects: '',
  description:
    "Le Roi a mis votre tête à prix. Tous les Cavaliers de la ville vous recherchent pour vous faire rencontrer votre châtiment. Les Rois des autres cités seront portés à émettre le même jugement si vous vous exilez. À moins d'un changement de Roi ou d'un exploit flamboyant, vous êtes condamné."
}
export const descendants = {
  slug: 'descendants',
  name: 'Descendance',
  kind: 'advantages',
  restrictions: '',
  points: -2,
  effects: "Vos jets d'intéraction avec vos proches ont une difficulté réduite de 1",
  description:
    'Vous avez une descendance! Vous pouvez en être fier, elle est de votre sang. Cet événement rare vous procure l’adiration et même l’envie de vos pairs.'
}
export const abyssal = {
  slug: 'abyssal',
  name: 'Remonté des Abysses',
  kind: 'flaws',
  restrictions: '',
  points: 1,
  effects: '',
  description:
    'Il y a quelques années, vous avez été capturé par des démons et entraîné dans leur univers souterrain. Vous abez quelque chose de sombre en vous que vous ne pourrez jamais retrouver.'
}
export const plantFriend = {
  slug: 'plantFriend',
  name: 'Ami des plantes',
  kind: 'advantages',
  restrictions: '',
  points: -3,
  effects:
    'Vous pouvez converser avec les plantes (difficulté 50).Vos jets en rapport avec les plantes ont une difficulté réduite de 1',
  description:
    "Depuis votre enfance, vous vivez dans un monde magnifique. Où que vous alliez, vous trouvez toujours des amis, Il est vrai que ce ne sont pas des amis ordinaires. La Dame vous a béni et VOUS vivez ce don avec bonheur. Vous comprenez le langage des plantes et elles vous comprennent. C'est merveilleux!"
}
export const greenHand = {
  slug: 'greenHand',
  name: 'Main verte',
  kind: 'advantages',
  restrictions: '',
  points: -2,
  effects: "Vos jets d'entretien de la nature ont une difficulté réduite de 1",
  description:
    'Les lutins sont connus pour être les plus merveilleux jardiniers. Mais vous, vous transcendez ce talent. Les plantes dont vous vous occupez croissent encore plus vite et les jardins que vous composez sont des merveilles touchées par la grâce. '
}
export const springMark = {
  slug: 'springMark',
  name: 'Marque du Printemps',
  kind: 'flaws',
  restrictions: '',
  points: 1,
  effects:
    'Sans rituel, vous aurez un malus de -1 à tous vos jets, cumulatif par semaine sans ce rituel. Ces malus disparaissent une fois le rituel accompli.',
  description:
    "Votre relation avec la nature est des plus profondes. Vous avez été marqué par la Dame pour montrer à l'univers l'alliance ancestrale entre la nature et votre peuple. Malheureusement, ce signe est parfois gênant en dehors de la société lutine et nombre de Mages trouvent en vous un cas des plus intéressants à étudier.\nCette marque peut se manifester par des cheveux verts ou des ongles en écorce. Voire par le remplacement du sang par de la sève. Vous avez besoin au moins une fois par semaine de vous mettre au soleil et de plonger vos pieds dans la terre. "
}
export const fieryHelped = {
  slug: 'fieryHelped',
  name: 'Aidé par une Fée',
  kind: 'advantages',
  restrictions: '',
  points: -5,
  effects: '',
  description:
    "Vous avez a une caractéristique qui a séduit une Fée. Celle-ci vous considère à la fois comme une chose à protéger et comme un être de bonne compagnie, de sorte qu'elle a décidé de veiller sur vous. Cela peut prendre de nombreuses formes, depuis un simple compagnonnage amical et de bons alois jusqu'à une surveillance discrète mais paranoïaque de tous vos faits et gestes. Il n'empêche, depuis le temps, vous avez remarqué son petit manège et connaissez son existence. il vous est sans doute arrivé de vous sauver la vie mutuellement une ou deux fois. Vous pouvez faire occasionnellement appel à la Fée qui vous protège (si vous le faites plus d'une fois par séance de jeu, elle cessera de vous répondre pendant plus ou moins longtemps mais continuera de vous protéger) et savez par expérience qu'elle interviendra dans toutes les situations susceptibles de mettre votre existence en danger; la forme que peut prendre cette intervention est très variable, la Fée peut tout aussi bien vous extraire d'une mêlée difficile en vous emportant dans les airs qu'attaquer un de vos adversaires."
}
export const followedFiery = {
  slug: 'followedFiery',
  name: 'Poursuivi par une Fée',
  kind: 'flaws',
  restrictions: '',
  points: 2,
  effects: '',
  description:
    "Vous possédez une particularité étrange qui vous a valu d'attirer l'attention d'une Fée. Elle a décidé de veiller sur vous, mais cette fois ce n'est pas à votre avantage car elle complètement folle. Elle a des exigences extraordinaires, voire intenables (l'arrêt de toute relation avec les femmes pour un satyre, par exemple), tente régulièrement de vous enlever afin de vous emmener dans son antre, attaque vos amis comme vos ennemis et intervient à tout bout de champs dans votre vie de préférence de la manière la plus inopportune. Elle n'a aucun intérêt ni dans votre confort, ni dans votre sécurité immédiate, au point d'être tout à fait prête à vous blesser ou à vous mutiler afin d'obtenir ce qu'elle souhaite de vous. Le MJ est seule juge des concessions que vous avez du faire. Dans tous les cas, cela n'empêche pas le comportement bizarre de la Fée."
}
export const extraCharacteristic = {
  slug: 'extraCharacteristic',
  name: 'Caractéristique Flamboyante',
  kind: 'advantages',
  restrictions: '',
  points: -3,
  effects: '+2 dans la caractéristique de votre choix. Le maximum est majoré de 2',
  description: 'Vous êtes extrêmement doué dans la compétence de votre choix !'
}
