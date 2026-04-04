const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@homeopatie-petra.cz" },
    update: {},
    create: {
      email: "admin@homeopatie-petra.cz",
      password: hashedPassword,
      name: "Petra Cihlářová",
    },
  });

  // ── Articles (CS) ─────────────────────────────────────────────────
  const articlesCs = [
    {
      slug: "homeopaticky-seminar-v-la",
      locale: "cs",
      category: "Semináře",
      title: "Homeopatický seminář v LA",
      description: "Výjimečný homeopatický seminář v Los Angeles v luxusním jachtařském klubu. Přednášeli Nancy Herrick, Roger Morrison, Resie Moonen, Michal Yakir a Massimo Mangialavori.",
      content: `Autorka popisuje výjimečný homeopatický seminář, který se v únoru uskutečnil v Los Angeles v prostředí luxusního jachtařského klubu. Akci organizovala Homeopatická škola v Los Angeles a účastnili se jí homeopaté ze všech koutů světa spolu s uznávanými experty v oboru.

Nancy Herrick a Roger Morrison otevřeli seminář prezentací případů. Nancy ukázala případ středověké ženy s depresí, potížemi s menopauzou a migrénou. Použitý lék Naja 1M měl transformativní účinek. Roger představil případy bipolární poruchy a dětských fobií, zdůrazňující důležitost Sankaranovy metodiky při výběru léků.

Resie Moonen se věnovala lanthanoidům — barevným kovům moderní éry. Vysvětlila, jak pacienti vyžadující lanthanoidní léky vykazují vysokou kreativitu a spirituální hledání. Ilustrovala to případy autoimunitních onemocnění a WiFi přecitlivělosti.

Michal Yakir diskutovala systematizaci rostlin a vývoj nekvetoucích rostlin reflektující evoluci planety. Zaměřila se na Sequoiadendron giganteum — strom starý 2–3 tisíce let, kterého použila v provingu.

Massimo Mangialavori uzavřel seminář tématem spirituálního vnímání v homeopatii, rozlišuje šest stavů mysli: mysticismus, transcendenci, sekulární religiozitu, představu trestajícího boha, apotropaické rituály a absolutní utrpení.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2025/07/Seminar_LA.jpg",
      featured: true,
      published: true,
      publishedAt: new Date("2025-07-12"),
    },
    {
      slug: "dama-v-nesnazich",
      locale: "cs",
      category: "Případy z praxe",
      title: "Dáma v nesnázích",
      description: "Případ 52leté pacientky s kombinací zdravotních a psychických problémů v období přechodu. Homeopatická léčba Carcinosinem a Sepií přinesla trvalé zlepšení.",
      content: `Petra Cihlářová představuje případ 52leté pacientky, která se obrátila na homeopatickou léčbu v červnu 2024. Žena trpěla kombinací zdravotních a psychických problémů, včetně střídavého průjmu a zácpy, zhoršeného kombinací tučného a sladkého jídla.

Pacientka byla zatížena rodinným stresem — starostí o nemocnou dceru, starající se o operované rodiče a pracovala v manželově firmě, což způsobovalo rodinné konflikty. Trpěla také poruchami spánku, obsedantně-kompulzivními tendencemi a existenciálními obavami z rakoviny, kterou ztratila bratra.

Cihlářová nejprve podala Carcinosin 200. Pacientka si zpočátku vedla lépe — zlepšila se její nálada, energie a zažívání. Předčasné opakování léku však vedlo k zhoršení stavu a pocitům napětí a nervozity.

Následně byl předepsán Sepia 200, který přinesl trvalejší zlepšení. Pacientka se stabilizovala, vrátila se jí menstruace bez komplikací a získala duševní klid. V květnu 2025 se pacientka vrátila pouze pro doplnění zásob Sepie, přičemž vedla aktivní, uspokojivý život a věnovala se kurzům průvodcovství.

Cihlářová v závěru apeluje na ženy středního věku, aby neváhaly a vyhledaly homeopatickou pomoc během přechodu do menopauzy.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2025/07/Dama_nesnaze.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2025-07-12"),
    },
    {
      slug: "dobre-proockovana-populace",
      locale: "cs",
      category: "Články",
      title: "Dobře proočkovaná populace aneb vítejte v pekle",
      description: "Klinické zkušenosti s pacienty postiženými vedlejšími účinky vakcinace. Tři případy léčené homeopatickými prostředky.",
      content: `Článek pojednává o vedlejších účincích očkování, zejména COVID-19 vakcín. Autorka představuje tři klinické případy:

1. Tříletý chlapec s autismem po hexavakcíně, který se zlepšil homeopatickou léčbou.

2. 31letý Američan s neurologickými symptomy po Gardasilu a meningokokovém očkování, který trpěl osm let.

3. Dva pacienti s potížemi po COVID vakcínách, které se léčily homeopatickými prostředky (Crotalus cascavela, Nux vomica, Bryonia).`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2022/01/očkování.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2024-09-30"),
    },
    {
      slug: "ockovani-proti-rakovine-delozniho-cipku",
      locale: "cs",
      category: "Případy z praxe",
      title: "Očkování 'proti rakovině děložního čípku'",
      description: "Případ 20leté studentky se zdravotními problémy po HPV vakcinaci. Homeopatická léčba vedla ke stabilizaci a celkovému zlepšení.",
      content: `Článek pojednává o případu 20leté studentky technické vysoké školy, která se obrátila na homeopatku kvůli zdravotním problémům. Dívka trpěla absencí menstruace, bolestmi v koleni a malých kloubech na rukou. Příznaky se objevily po očkování proti HPV viru v 13 letech.

Homeopatka nejdříve aplikovala Pulsatillu 200, což vedlo k obnovení menstruačního cyklu a zmírnění bolestí. Následně byly předepisovány další léky včetně Kali sulphuricum, Aristolochia clematitis a Dulcamara v různých potencích.

Během léčby se u pacientky observoval komplexní léčebný proces: zlepšila se psychická kondice, zvýšilo se sebevědomí, dívka se emancipovala z nehodícího se vztahu a postupně se zbavila všech fyzických potíží. Proces trvající přibližně rok a čtvrt vedl k stabilizaci menstruačního cyklu a celkovému zlepšení zdravotního stavu.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2024/09/dívky.jpeg",
      featured: false,
      published: true,
      publishedAt: new Date("2024-09-30"),
    },
    {
      slug: "ocko-covid-pro-blaho-lidstva",
      locale: "cs",
      category: "Případy z praxe",
      title: "Očko Covid pro blaho lidstva",
      description: "Případ pacienta s nejasným stavem fyzické slabosti trvajícím dva roky po Covid vakcinaci. Homeopatická léčba vedla ke zlepšení.",
      content: `Autorka popisuje případ pacienta, který přišel s nejasným stavem fyzické slabosti a pocitem otoku v oblasti hlavy a krku trvajícím dva roky. Pacient původně připisoval své problémy zubnímu implantátu, ale podle autorčina vyšetření souvisely se čtyřmi dávkami Covid vakcinace.

Pacient měl 4 dávky Covid vakcíny a postupně ztrácel fyzické schopnosti. Poslední tenis hrál v květnu 2021, krátce po třetí dávce. V září 2021 došlo ke zhroucení během cvičení.

Homeopatické léčení (Crotalus cascavela 200, později Buthus tamulus 200) vedlo ke zlepšení stavu.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2024/03/očko_cov.jpeg",
      featured: false,
      published: true,
      publishedAt: new Date("2024-03-24"),
    },
    {
      slug: "mimozemstan-v-cizim-tele",
      locale: "cs",
      category: "Případy z praxe",
      title: "Mimozemšťan v cizím těle",
      description: "Článek o homeopatickém případu publikovaný v PDF formátu s ilustracemi.",
      content: "Článek o homeopatickém případu. Podrobný obsah je dostupný v PDF verzi.",
      image: "https://homeopatie-praha.com/wp-content/uploads/2024/03/Mimozemstan_v_hlave_nahled.png",
      featured: false,
      published: true,
      publishedAt: new Date("2024-03-24"),
    },
    {
      slug: "hlasy-v-hlave",
      locale: "cs",
      category: "Případy z praxe",
      title: "Hlasy v hlavě",
      description: "Článek Petry Cihlářové o homeopatickém případu pacienta slyšícího hlasy.",
      content: "Článek o homeopatickém případu pacienta slyšícího hlasy. Podrobný obsah je dostupný v PDF verzi.",
      image: "https://homeopatie-praha.com/wp-content/uploads/2024/03/Hlasy_v_hlave_nahled.png",
      featured: false,
      published: true,
      publishedAt: new Date("2024-03-24"),
    },
    {
      slug: "kongres-lmhi-bogota-2023",
      locale: "cs",
      category: "Kongresy",
      title: "Kongres LMHI v Bogotě 2023",
      description: "Zpráva z kongresu Mezinárodní homeopatické lékařské ligy v Bogotě s dokumentací a fotografiemi.",
      content: "Zpráva z kongresu Mezinárodní homeopatické lékařské ligy (LMHI) v Bogotě 2023. Článek obsahuje fotografie a dokumentaci z kongresu.",
      image: "https://homeopatie-praha.com/wp-content/uploads/2024/03/HLL_Bogota-1-400x252.png",
      featured: false,
      published: true,
      publishedAt: new Date("2024-03-24"),
    },
    {
      slug: "vliv-traumat-z-detstvi",
      locale: "cs",
      category: "Články",
      title: "Vliv traumat z dětství na dospělý život",
      description: "Jak dětská traumata ovlivňují dospělý život a jak může homeopatie pomoci.",
      content: "Článek o vlivu dětských traumat na dospělý život a možnostech homeopatické léčby. Podrobný obsah je dostupný v PDF verzi.",
      image: "https://homeopatie-praha.com/wp-content/uploads/2024/03/trauma.png",
      featured: false,
      published: true,
      publishedAt: new Date("2024-03-24"),
    },
    {
      slug: "mnichovska-konference-2023",
      locale: "cs",
      category: "Kongresy",
      title: "Mnichovská konference 2023",
      description: "Fotoreportáž a postřehy ze setkání evropských homeopatů v Mnichově v roce 2023.",
      content: "Fotoreportáž ze setkání evropských homeopatů v Mnichově v roce 2023. Článek obsahuje fotografie z konference.",
      image: "https://homeopatie-praha.com/wp-content/uploads/2024/03/Konference-_Mnichov_2023.png",
      featured: false,
      published: true,
      publishedAt: new Date("2024-03-23"),
    },
    {
      slug: "nam-vladne-kral-heroin",
      locale: "cs",
      category: "Případy z praxe",
      title: "'Nám vládne král, má jméno Heroin…'",
      description: "Článek o homeopatickém přístupu k léčbě závislostí.",
      content: "Článek o homeopatickém přístupu k léčbě závislostí. Podrobný obsah je dostupný v PDF verzi.",
      image: "https://homeopatie-praha.com/wp-content/uploads/2023/02/Nam_vladne_heroin-1.png",
      featured: false,
      published: true,
      publishedAt: new Date("2024-03-24"),
    },
    {
      slug: "pripad-schizofrenie",
      locale: "cs",
      category: "Případy z praxe",
      title: "Případ úspěšně vyléčené schizofrenie",
      description: "Případ mladé ženy diagnostikované se schizofrenií, léčené homeopatickým lékem Mancinella 1M s výraznými výsledky.",
      content: `Někdy to vypadá, jako by homeopatie neměla limity — a tento případ je toho důkazem.

Pacientka pocházela z přísné rodiny s dominantní matkou. Vyrůstala jako poslušné dítě, snažící se zalíbit, přičemž postupně ztrácela svou identitu. Doma vládlo napětí, ve škole zažívala šikanu. Tato kombinace vedla k psychiatrickým problémům — slyšela 'zlý hlas" v hlavě, cítila se jako zlo samo.

V 19 letech byla hospitalizována, léčena silnými psychiatrickými léky. Její duševní zdraví se zhoršovalo navzdory medikaci. Otec ji nakonec přivedl k homeopatce v červenci 2020.

Léčba spočívala v podání homeopatického léku Mancinella 1M. Účinky byly pozoruhodné:
- Po 14 dnech: hlava téměř nebolí, zlý hlas se ztratil
- Po měsíci: pacientka se cítila o 50 % lépe, vrátila se menstruace, postupně vysadila psychiatrické léky
- Po několika měsících: normální život, práce, vztahy, štěstí

Poslední opakování léku bylo v lednu 2021 v souvislosti s COVID-19. Pacientka se věnuje běhu, udržuje vztah a připravuje se na svatbu.

Mancinella pochází z nejjedovatějšího stromu na zemi zvaného 'ďáblovo jablko" a homeopaticky reprezentuje stavy, kdy se pacient cítí posedlý zlem.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2022/01/manc-v.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2022-12-11"),
    },
    {
      slug: "pohybovy-aparat-v-pozdejsim-veku",
      locale: "cs",
      category: "Případy z praxe",
      title: "Pohybový aparát v pozdějším věku",
      description: "Dva případy pacientů s bolestmi pohybového aparátu po padesátce. Homeopatická léčba Natrium muriaticum a Calcarea carbonica.",
      content: `Když se po 50. ráno probudíš a nic tě nebolí, jsi mrtvý — běžné vnímání, které autorka zpochybňuje.

První případ — pan M. (ročník 1950):
Po odchodu do důchodu upadl do sociální izolace. Postupně ztratil kontakt s bývalými kolegy a uzavřel se do sebe. Fyzicky trpěl drtivými bolestmi zad, které mu bránily v chůzi. Bolesti trvaly pět let a progredovaly z beder přes kyčel až do nohy.

Léčba Natrium muriaticum v potenci 200 C vedla k výraznému zlepšení. Po měsíci pacient hlásil zmírnění bolestí a zlepšení nálady. Po dvou měsících se bolesti vytrácely úplně, pacient si znovu užíval života a polepšily se i vztahy.

Druhý případ — paní A. (ročník 1963):
Původně trpěla bolestmi a praskáním kloubů, návaly horka, stresovou inkontinencí a ekzémy. Psychické kořeny problémů vycházely z dětství — matka ji manipulovala a vydírala rodinu. Vyvinul se vzorec: musím být hodná, všem vyhovět, aby byl klid.

Calcarea carbonica 200 C odstartovala transformaci. Pacientka si uvědomila, že celý život plnila představy druhých. Získala sebevědomí, mohla odmítnutí říci, změnila pracovní situaci a zlepšily se její mezilidské vztahy.

Homeopatie umožňuje lidem překonat strachy a sebou kladené limity v jakémkoliv věku.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2022/01/pohyb_ap.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2022-01-04"),
    },
    {
      slug: "dobre-proockovana-generace",
      locale: "cs",
      category: "Články",
      title: "Dobře proočkovaná generace aneb vítejte v pekle",
      description: "Klinické zkušenosti s pacienty postiženými vedlejšími účinky vakcinace, zejména případ 31letého muže z USA po Gardasilu.",
      content: `Petra Cihlářová popisuje svoje klinické zkušenosti s pacienty postiženými vedlejšími účinky vakcinace. Uvádí případy dětí s poruchami chování a autismem po podání hexavakcíny.

Hlavní případ se týká 31letého muže z USA, který podstoupil povinné očkování proti meningokoku a Gardasilu. Po Gardasilu se jeho stav dramaticky zhoršil — muž upadl do halucinací, stal se agresivní a zcela odkázán na péči rodiny.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2022/01/očkování.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2023-03-06"),
    },
    {
      slug: "prohlaseni-ceskych-homeopatu",
      locale: "cs",
      category: "Články",
      title: "Prohlášení českých homeopatů k tzv. koronavirové krizi",
      description: "Společné prohlášení českých homeopatů k pandemii COVID-19. Nabídka homeopatické pomoci a výzva k odpovědnosti za vlastní zdraví.",
      content: `Čeští homeopaté vydali společné prohlášení, v němž vyjadřují znepokojení nad mediálním pokrytím epidemie. Nabízejí homeopatickou pomoc při zvládání krizí a zvýšení imunity.

Prohlášení vyzývá média k pravdivému informování veřejnosti o alternativních léčebných přístupech. Uzavírá apelem na občany, aby si vzali odpovědnost za své zdraví do svých rukou.

Prohlášení je podepsáno osmi pracovníky zdravotnického sektoru, včetně Mgr. Lenky Ničkové a MUDr. Martiny Nosálové.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2020/05/LOUKA2.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2023-03-06"),
    },
    {
      slug: "homeoprofylaxe",
      locale: "cs",
      category: "Články",
      title: "Homeoprofylaxe – případy, studie, zkoušky",
      description: "Komplexní přehled historických a současných použití homeopatie jako prevence infekčních onemocnění od roku 1799.",
      content: `Autor: Fran Sheffield, překlad: Mgr. Lenka Ničková

Dokument představuje komplexní přehled historických a současných použití homeopatie jako prevence různých infekčních onemocnění. Samuel Hahnemann objevil roku 1799 preventivní možnosti homeopatie během epidemie spály. Od té doby jsou tyto metody systematicky používány při velkých epidemiích po celém světě.

Choroby pokryté v dokumentu: Chikungunya, cholera, horečka Dengue, difterie, japonská encefalitida, leptospiróza, malárie, meningokokové onemocnění, poliomyelitida, spála, neštovice, černý kašel a respirační infekce.

Studie z různých zemí (Indie, Brazílie, Kuba, Keňa) ukazují vysokou účinnost homeoprofylaxe.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2020/04/epidemie.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2014-08-22"),
    },
    {
      slug: "homeopatie-pomaha",
      locale: "cs",
      category: "Články",
      title: "Homeopatie pomáhá",
      description: "Jak homeopatie pomáhá lidem zvládat strach, posílit imunitu a upevnit zdraví v nelehké době.",
      content: `Ocitáme se uprostřed nelehké doby. Stát přijal opatření — uzavření provozoven, omezení pohybu a nošení roušek.

Mnoho osob žije pod tlakem ze strachu o zdraví, příjmy a budoucnost. Taková stresová zatížení snižují obranné schopnosti organismu právě v době, kdy jsou nejvíce potřeba.

Homeopatie pomáhá lidem zacházet se strachem, posílit imunitu, upevnit zdraví. Doporučujeme vyplnit dotazník na webových stránkách České lékařské homeopatické společnosti a kontaktovat homeopata.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2020/04/gaia.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2022-12-11"),
    },
    {
      slug: "strach-ma-velke-oci",
      locale: "cs",
      category: "Případy z praxe",
      title: "Strach má velké oči",
      description: "Případ 42leté pacientky Dany s úzkostmi, nespavostí a panickými stavy. Léčba Argentum nitricum přinesla výrazné zlepšení.",
      content: `Strach má velké oči — v dubnu 2020 pandemie COVID-19 vyvolala strach, přestože počty nakažených v Česku neodpovídaly parametrům epidemie. Média nás neustále masírují zprávami v absolutních číslech bez správného kontextu.

Hlavní část článku se věnuje případu pacientky Dany, 42leté ženy s dlouhodobými problémy se stresem, úzkostí, nespavostí a panickými stavy. Její problémy pocházely z dětství — její matka ji upřednostňovala méně než její mladší sestru, což vedlo k chronickému sebepodceňování a snaze všem vyhovět.

Pacientka byla léčena homeopatickým lékem Argentum nitricum — nejprve v potenci 200, později v 1M. Po léčbě se její příznaky výrazně zlepšily: ustoupily strachy, zlepšil se spánek, vrátila se energie a pozitivní nálada.

Homeopatie je účinná v rozpouštění strachu. Doporučuji čtenářům vyhledat kvalifikovaného homeopata při potížích s úzkostí a obavami.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2019/12/podzim_05.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2020-04-26"),
    },
    {
      slug: "jak-ucinne-bojovat-s-koronavirem",
      locale: "cs",
      category: "Články",
      title: "Jak účinně bojovat s koronavirem",
      description: "Homeopatický přístup k léčbě COVID-19 s přehledem doporučených homeopatických léků a preventivních opatření.",
      content: `Článek pojednává o šíření covidu-19 z Číny do celého světa. Jedná se o horečnaté onemocnění dýchacích cest s mírným průběhem u většiny nakažených.

Stres způsobený strachem je pro lidský organismus mnohem horší, než chřipka způsobená koronavirem. Homeopatie léčila epidemie po dobu 250 let s prokazatelnou účinností (příklad: londýnská cholera v 19. století s 2% mortalitou při homeopatické léčbě versus 40% při konvenční léčbě).

Doporučené léky:
- Arsenicum album 30 CH (proti strachu)
- Bryonia alba 30 CH (bolesti při pohybu)
- Gelsemium 30 CH (chřipkové příznaky)
- Antimonium tartaricum 30 CH (plicní komplikace)
- Eupatorium perfoliatum 30 CH (kostní bolesti)
- Justicia adhatoda 30 C (vážné plicní komplikace)`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2020/03/vir20.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2020-04-26"),
    },
    {
      slug: "strach-ze-smrti",
      locale: "cs",
      category: "Případy z praxe",
      title: "Strach ze smrti",
      description: "Případ 23leté pacientky traumatizované sebevraždou švagrové. Homeopatická léčba pomocí Arsenicum album přinesla uzdravení.",
      content: `Článek pojednává o případu 23leté pacientky, kterou zasáhla tragédie sebevraždy její blízké švagrové. Tato traumatická zkušenost spustila dlouhodobé problémy se zdravím.

Dlouhotrvající úzkosti, strachy a deprese se dostavily osm let před návštěvou u homeopata. Mladá žena zažívala intenzivní obavy z nemoci, smrti a strachu, že se 'zblázní jako švagrová." Fyzicky pociťovala strach v žaludku a měla hormonální nerovnováhu s polycystickými vaječníky.

Lékařka Petra Cihlářová postupně podávala několik preparátů: Anacardium, které sjednotilo rozštěpené já pacientky; Carcinosinum; Aconitum a nakonec Arsenicum album. Poslední lék se ukázal jako definitivní řešení.

Po homeopatické léčbě se pacientka úžasně zlepšila na všech úrovních. Strachy a úzkosti se rozpustily a mohla žít svobodně bez katastrofických scénářů.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2019/12/priroda_06.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2020-04-26"),
    },
    {
      slug: "maly-smutny-pozustaly",
      locale: "cs",
      category: "Případy z praxe",
      title: "Malý smutný pozůstalý",
      description: "Případ devítiletého chlapce trpícího po smrti prababičky. Léčba Carcinosinum 10M proměnila smutné dítě ve veselého klučinu.",
      content: `Článek pojednává o tom, jak smrt v rodině zasahuje pozůstalé. Úmrtí osoby bývá často spouštěcím momentem různých zdravotních potíží.

Příběh se zaměřuje na devítiletého chlapce, jemuž zemřela jeho 95letá prababička. Chlapec přišel na konzultaci se svou matkou. Vyznačoval se velice smutnýma očima a trpěl nespavostí od pohřbu. Tvrdil, že mu v břiše chodí ještěrka a popisoval fyzický pocit štípání a šťouchání okolo celého těla.

Dítě bylo velmi citlivé na zvuky, mělo strachy z rakoviny, selhání a smrti. Trpělo také dlouhodobě na atopický ekzém od tří měsíců věku.

Diagnostika odhalila mladého pacienta postrádajícího vnější ochranu, hluboce dotčeného životními událostmi. Homeopatická terapie pomocí léku Carcinosinum 10M ve formě jediné dávky vedla k výraznému zlepšení. Chlapec se postupně proměnil ze smutného dítěte plného strachů ve veselého nebojácného klučinu.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2019/12/mysl_02.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2020-04-26"),
    },
    {
      slug: "astmaticky-sportovec",
      locale: "cs",
      category: "Případy z praxe",
      title: "Astmatický sportovec",
      description: "Případ 29letého atleta s alergií a astmatem. Homeopatický lék Medorrhinum odstranil fyzické i psychické potíže.",
      content: `Případ popisuje 29letého atleta, který přišel na konzultaci kvůli těžké alergii na psy a astmatu. Pacient se vyznačoval živostí, energií a sklonem k rizikům — měl rád extrémní sporty a cestování.

Při první konzultaci byla předepsána Phosphorus, která přinesla částečné zlepšení psychického stavu, nikoli však ústup astmatu. Následovalo vyzkoušení Tuberculinum bez větších výsledků.

Během šesté kontroly se pacient otevřel: v dětství byl obézní a trpěl šikanou od vrstevníků. Obsahoval také hluboké strachy ze tmy a nadpřirozených existencí, které jej pronásledovaly v nočních můrách po celý život.

Na základě repertorizace byl vybrán Medorrhinum v potenci 200 a později 1M. Léčba přinesla dramatické zlepšení: pacient se zbavil strachů, zmizely noční můry, astma a alergie postupně vymizely. Nalezl klid a stabilní vztah.

Homeopatie léčí člověka jako celek — duši i tělo zároveň, nikoli jen symptomy.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2019/12/lide_03.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2020-04-26"),
    },
    {
      slug: "mechanismus-homeopatickych-leku",
      locale: "cs",
      category: "Věda",
      title: "Mechanismus fungování homeopatických léků vědecky prokázán",
      description: "Zpráva ze semináře v Royal Society of Medicine v Londýně 2018 s přednáškami nositelů Nobelovy ceny.",
      content: `Seminář se konal 14. července 2018 v Londýně v sídle Royal Society of Medicine. Vědci včetně nositelů Nobelovy ceny představili vědecké důkazy o fungování homeopatických léků.

Mezi přednášejícími byli: Luc Montagnier (nositel Nobelovy ceny za medicínu za objev viru HIV) a Brian Josephson (nositel Nobelovy ceny za fyziku). Další významní vědci prosazovali teorii, že voda má větší informační kapacitu než dosud používaný křemík.

Gerald Pollack představil teorii čtyř fází vody včetně tzv. EZ vody. Vladimír Voeikov prokázal experimentálně, že velmi vysoké ředění původní látky je ve svých fyzikochemických vlastnostech odlišné od původní vody.

Seminář přitáhl 300 účastníků z celého světa namísto plánovaných 100. Ústředním tématem byla obhajoba homeopatie proti skepticismu vědeckou metodou a studiem nanostruktur.

Všechny přednášky jsou dostupné na YouTube.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2018/08/water_science-400x207.png",
      featured: true,
      published: true,
      publishedAt: new Date("2022-12-11"),
    },
    {
      slug: "setkani-homeopatu-vychodu-a-zapadu",
      locale: "cs",
      category: "Kongresy",
      title: "Setkání homeopatů východu a západu",
      description: "Reportáž z mezinárodního semináře homeopatů v indickém Mussoorie s přednáškami Farokha Mastera a Fredericka Schroyense.",
      content: `Článek popisuje účast české delegace na mezinárodním semináři homeopatů v Mussoorie v Indii (7.–11. února 2007). Seminář vedli dva lektoři: Farokh Master z Indie a Frederick Schroyens z Belgie.

Článek dokumentuje sérii případů demonstrujících homeopatické diagnostické techniky. Jeden případ se zabýval ženou s těžkým astmatem a srdeční poruchou, která byla vyléčena pomocí Kali carbonicum.

Dalším tématem byla analýza tuberkulinů — speciálních léčiv používaných v homeopatii. Článek rozlišuje pět hlavních typů: Tuberculinum Koch, BCG vakcína, Bacillinum, Tuberculinum Bovinum a Tuberculinum Aviare, každý s jinými indikacemi a charakteristikami.

Přílohou byly osobní postřehy z návštěvy indických kulturních památek, včetně tibetského kláštera v Dharamšále, Ashrama v Dehradunu a památné návštěvy Rishikeše na řece Ganze.

Seminář byl velmi zajímavý a produktivní, Indie je kouzelná země.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2018/02/clanek1-1.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2018-08-17"),
    },
    {
      slug: "je-homeopatie-jen-obchod-s-iluzi",
      locale: "cs",
      category: "Články",
      title: "Je homeopatie jen obchod s iluzí?",
      description: "Úvaha o principech homeopatie, historii Samuela Hahnemanna a nadčasovosti Organonu léčebného umění.",
      content: `V osmnáctém století byla medicína ve velmi špatném stavu. Léčebné postupy té doby připomínaly spíše mučení než skutečnou péči o pacienty. V této době objevil lékař Samuel Hahnemann a následně rozpracoval principy léčby v díle nazvaném Organon léčebného umění.

Hahnemann popisuje zákonitosti léčebné metody od definice nemoci až po způsoby její léčby nejšetrnějším a nejtrvalejším způsobem. Pozoruhodné na této knize je její nadčasovost — homeopaté po celém světě jej dodnes používají jako zdroj svých principů.

Systém se nazývá homeopatie proto, že je založen na principu léčení podobného podobným. Cílem je vrátit nemocným zdraví nejrychlejším, nejspolehlivějším a nejšetrnějším způsobem.

Hahnemann nezpochybňuje fyziologické procesy v těle. Klíčovou roli hraje podle něj dynamis — nehmotná životní síla, která ovládá organismus. Právě v ní se rozhoduje mezi nemocí a zdravím.

Přestože věda zatím nedokázala, jak homeopatie funguje, je to její problém, ne důkaz neúčinnosti. Homeopatie nadále léčí nezávisle na vědecké víře v ni.

Často vyslovovaná námitka placeba má v homeopatické praxi malou úlohu. Léčitel se musí snažit najít správný lék, což vyžaduje roky vzdělání a příslušného úsilí.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2018/02/clanek14-400x533.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2018-02-20"),
    },
  ];

  // ── Articles (EN) ─────────────────────────────────────────────────
  const articlesEn = [
    {
      slug: "homeopathic-seminar-in-la",
      locale: "en",
      category: "Seminars",
      title: "Homeopathic Seminar in LA",
      description: "An exceptional homeopathic seminar held at a luxury yacht club in Los Angeles. Speakers included Nancy Herrick, Roger Morrison, Resie Moonen, Michal Yakir, and Massimo Mangialavori.",
      content: `An exceptional homeopathic seminar took place in February in Los Angeles at a luxury yacht club. The event was organized by the Homeopathic School in Los Angeles and was attended by homeopaths from around the world along with renowned experts in the field.

Nancy Herrick and Roger Morrison opened the seminar with case presentations. Nancy showed a case of a medieval woman with depression, menopausal issues, and migraines. The remedy Naja 1M had a transformative effect. Roger presented cases of bipolar disorder and childhood phobias, emphasizing the importance of Sankaran's methodology in remedy selection.

Resie Moonen focused on lanthanides — colorful metals of the modern era. She explained how patients requiring lanthanide remedies exhibit high creativity and spiritual seeking. She illustrated this with cases of autoimmune diseases and WiFi hypersensitivity.

Michal Yakir discussed plant systematization and the evolution of non-flowering plants reflecting planetary evolution. She focused on Sequoiadendron giganteum — a tree 2–3 thousand years old, which she used in a proving.

Massimo Mangialavori closed the seminar with the topic of spiritual perception in homeopathy, distinguishing six states of mind: mysticism, transcendence, secular religiosity, the concept of a punishing god, apotropaic rituals, and absolute suffering.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2025/07/Seminar_LA.jpg",
      featured: true,
      published: true,
      publishedAt: new Date("2025-07-12"),
    },
    {
      slug: "a-lady-in-distress",
      locale: "en",
      category: "Case Studies",
      title: "A Lady in Distress",
      description: "A case of a 52-year-old female patient with a combination of physical and psychological issues during menopause. Homeopathic treatment with Carcinosinum and Sepia brought lasting improvement.",
      content: `Petra Cihlářová presents the case of a 52-year-old patient who sought homeopathic treatment in June 2024. The woman suffered from a combination of health and psychological problems, including alternating diarrhea and constipation, worsened by a combination of fatty and sweet foods.

The patient was burdened by family stress — caring for a sick daughter, looking after operated parents, and working in her husband's company, which caused family conflicts. She also suffered from sleep disorders, obsessive-compulsive tendencies, and existential fears of cancer, which had taken her brother.

Cihlářová first administered Carcinosin 200. The patient initially improved — her mood, energy, and digestion got better. However, premature repetition of the remedy led to worsening and feelings of tension and nervousness.

Subsequently, Sepia 200 was prescribed, bringing more lasting improvement. The patient stabilized, her menstruation returned without complications, and she gained mental peace.

Cihlářová concludes by appealing to middle-aged women not to hesitate and to seek homeopathic help during the transition to menopause.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2025/07/Dama_nesnaze.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2025-07-12"),
    },
    {
      slug: "well-vaccinated-population",
      locale: "en",
      category: "Articles",
      title: "A Well-Vaccinated Population, or Welcome to Hell",
      description: "Clinical experience with patients affected by adverse effects of vaccination. Three cases treated with homeopathic remedies.",
      content: `The article discusses the side effects of vaccination, particularly COVID-19 vaccines. The author presents three clinical cases:

1. A three-year-old boy with autism after hexavalent vaccine, who improved with homeopathic treatment.

2. A 31-year-old American with neurological symptoms after Gardasil and meningococcal vaccination, who suffered for eight years.

3. Two patients with problems after COVID vaccines, treated with homeopathic remedies (Crotalus cascavela, Nux vomica, Bryonia).`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2022/01/očkování.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2024-09-30"),
    },
    {
      slug: "vaccination-against-cervical-cancer",
      locale: "en",
      category: "Case Studies",
      title: "Vaccination \"Against Cervical Cancer\"",
      description: "A case of a 20-year-old student with health issues following HPV vaccination. Homeopathic treatment led to stabilization and overall improvement.",
      content: `The article discusses the case of a 20-year-old technical university student who turned to a homeopath for health problems. The girl suffered from absence of menstruation, knee pain, and pain in the small joints of her hands. Symptoms appeared after HPV vaccination at age 13.

The homeopath first applied Pulsatilla 200, which led to restoration of the menstrual cycle and pain relief. Subsequently, other remedies were prescribed including Kali sulphuricum, Aristolochia clematitis, and Dulcamara in various potencies.

During treatment, a complex healing process was observed: psychological condition improved, self-confidence increased, the girl emancipated from an unsuitable relationship, and gradually got rid of all physical problems.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2024/09/dívky.jpeg",
      featured: false,
      published: true,
      publishedAt: new Date("2024-09-30"),
    },
    {
      slug: "covid-jab-for-humanity",
      locale: "en",
      category: "Case Studies",
      title: "The Covid Jab for the Good of Humanity",
      description: "A case of a patient with an unexplained state of physical weakness lasting two years after Covid vaccination. Homeopathic treatment led to improvement.",
      content: `The author describes a case of a patient who presented with an unclear state of physical weakness and a sensation of swelling in the head and neck area lasting two years. The patient initially attributed his problems to a dental implant, but the examination revealed a connection with four doses of Covid vaccination.

The patient had 4 doses of the Covid vaccine and gradually lost physical abilities. He last played tennis in May 2021, shortly after the third dose. In September 2021, he collapsed during exercise.

Homeopathic treatment (Crotalus cascavela 200, later Buthus tamulus 200) led to improvement.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2024/03/očko_cov.jpeg",
      featured: false,
      published: true,
      publishedAt: new Date("2024-03-24"),
    },
    {
      slug: "alien-in-a-foreign-body",
      locale: "en",
      category: "Case Studies",
      title: "An Alien in a Foreign Body",
      description: "An article about a homeopathic case study published in PDF format with illustrations.",
      content: "An article about a homeopathic case. Detailed content is available in the PDF version.",
      image: "https://homeopatie-praha.com/wp-content/uploads/2024/03/Mimozemstan_v_hlave_nahled.png",
      featured: false,
      published: true,
      publishedAt: new Date("2024-03-24"),
    },
    {
      slug: "voices-in-the-head",
      locale: "en",
      category: "Case Studies",
      title: "Voices in the Head",
      description: "An article by Petra Cihlářová about a homeopathic case of a patient hearing voices.",
      content: "An article about a homeopathic case of a patient hearing voices. Detailed content is available in the PDF version.",
      image: "https://homeopatie-praha.com/wp-content/uploads/2024/03/Hlasy_v_hlave_nahled.png",
      featured: false,
      published: true,
      publishedAt: new Date("2024-03-24"),
    },
    {
      slug: "lmhi-congress-bogota-2023",
      locale: "en",
      category: "Congresses",
      title: "LMHI Congress in Bogotá 2023",
      description: "A report from the International Homeopathic Medical League congress in Bogotá, with documentation and photographs.",
      content: "A report from the International Homeopathic Medical League (LMHI) congress in Bogotá 2023. The article includes photographs and documentation from the congress.",
      image: "https://homeopatie-praha.com/wp-content/uploads/2024/03/HLL_Bogota-1-400x252.png",
      featured: false,
      published: true,
      publishedAt: new Date("2024-03-24"),
    },
    {
      slug: "impact-of-childhood-trauma",
      locale: "en",
      category: "Articles",
      title: "The Impact of Childhood Trauma on Adult Life",
      description: "How childhood trauma affects adult life and how homeopathy can help.",
      content: "An article about the impact of childhood trauma on adult life and the possibilities of homeopathic treatment. Detailed content is available in the PDF version.",
      image: "https://homeopatie-praha.com/wp-content/uploads/2024/03/trauma.png",
      featured: false,
      published: true,
      publishedAt: new Date("2024-03-24"),
    },
    {
      slug: "munich-conference-2023",
      locale: "en",
      category: "Congresses",
      title: "Munich Conference 2023",
      description: "A photo report and observations from a gathering of European homeopaths in Munich in 2023.",
      content: "A photo report from a gathering of European homeopaths in Munich in 2023. The article includes photographs from the conference.",
      image: "https://homeopatie-praha.com/wp-content/uploads/2024/03/Konference-_Mnichov_2023.png",
      featured: false,
      published: true,
      publishedAt: new Date("2024-03-23"),
    },
    {
      slug: "our-king-heroin",
      locale: "en",
      category: "Case Studies",
      title: "\"Our King Rules Us, His Name Is Heroin…\"",
      description: "An article on the homeopathic approach to treating addiction.",
      content: "An article on the homeopathic approach to treating addiction. Detailed content is available in the PDF version.",
      image: "https://homeopatie-praha.com/wp-content/uploads/2023/02/Nam_vladne_heroin-1.png",
      featured: false,
      published: true,
      publishedAt: new Date("2024-03-24"),
    },
    {
      slug: "successfully-treated-schizophrenia",
      locale: "en",
      category: "Case Studies",
      title: "A Successfully Treated Case of Schizophrenia",
      description: "A case of a young woman diagnosed with schizophrenia, treated with the homeopathic remedy Mancinella 1M with remarkable results.",
      content: `Sometimes it seems as if homeopathy has no limits — and this case is proof of that.

The patient came from a strict family with a dominant mother. She grew up as an obedient child, trying to please, while gradually losing her identity. There was tension at home, and she experienced bullying at school. This combination led to psychiatric problems — she heard an "evil voice" in her head and felt like evil itself.

At 19, she was hospitalized and treated with strong psychiatric medications. Her mental health deteriorated despite medication. Her father eventually brought her to a homeopath in July 2020.

Treatment consisted of administering the homeopathic remedy Mancinella 1M. The effects were remarkable:
- After 14 days: head barely hurts, the evil voice disappeared
- After a month: patient felt 50% better, menstruation returned, gradually discontinued psychiatric medication
- After several months: normal life, work, relationships, happiness

Mancinella comes from the most poisonous tree on earth called "the devil's apple" and homeopathically represents states where the patient feels possessed by evil.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2022/01/manc-v.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2022-12-11"),
    },
    {
      slug: "musculoskeletal-system-later-life",
      locale: "en",
      category: "Case Studies",
      title: "The Musculoskeletal System in Later Life",
      description: "Two cases of patients over fifty with musculoskeletal pain. Homeopathic treatment with Natrium muriaticum and Calcarea carbonica.",
      content: `When you wake up after 50 and nothing hurts, you're dead — a common perception that the author challenges.

First case — Mr. M. (born 1950):
After retirement, he fell into social isolation. He gradually lost contact with former colleagues and withdrew. Physically, he suffered from crushing back pain that prevented him from walking. The pain lasted five years and progressed from the lower back through the hip to the leg.

Treatment with Natrium muriaticum 200 C led to significant improvement. After a month, the patient reported reduced pain and improved mood. After two months, the pain disappeared completely.

Second case — Mrs. A. (born 1963):
She suffered from joint pain and cracking, hot flashes, stress incontinence, and eczema. The psychological roots came from childhood — her mother manipulated and emotionally blackmailed the family.

Calcarea carbonica 200 C started a transformation. The patient realized she had spent her whole life fulfilling others' expectations. She gained confidence and improved her interpersonal relationships.

Homeopathy enables people to overcome fears and self-imposed limits at any age.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2022/01/pohyb_ap.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2022-01-04"),
    },
    {
      slug: "well-vaccinated-generation",
      locale: "en",
      category: "Articles",
      title: "The Well-Vaccinated Generation: Welcome to Hell",
      description: "Clinical experience with patients suffering from vaccination side effects, focusing on the case of a 31-year-old American man after Gardasil.",
      content: `Petra Cihlářová describes her clinical experience with patients affected by vaccination side effects. She presents cases of children with behavioral disorders and autism after hexavalent vaccination.

The main case concerns a 31-year-old man from the USA who underwent mandatory meningococcal and Gardasil vaccination. After Gardasil, his condition dramatically deteriorated — the man fell into hallucinations, became aggressive, and was completely dependent on family care.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2022/01/očkování.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2023-03-06"),
    },
    {
      slug: "czech-homeopaths-statement",
      locale: "en",
      category: "Articles",
      title: "Czech Homeopaths' Statement on the So-Called Coronavirus Crisis",
      description: "A joint statement by Czech homeopaths on the COVID-19 pandemic, offering homeopathic support and calling for personal responsibility for one's own health.",
      content: `Czech homeopaths issued a joint statement expressing concern about media coverage of the epidemic. They offer homeopathic help in managing crises and boosting immunity.

The statement calls on the media to truthfully inform the public about alternative healing approaches. It concludes with an appeal to citizens to take responsibility for their own health.

The statement is signed by eight healthcare professionals, including Mgr. Lenka Ničková and MUDr. Martina Nosálová.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2020/05/LOUKA2.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2023-03-06"),
    },
    {
      slug: "homeoprophylaxis",
      locale: "en",
      category: "Articles",
      title: "Homeoprophylaxis – Cases, Studies, and Trials",
      description: "A comprehensive overview of the historical and contemporary use of homeopathy as prevention against infectious diseases since 1799.",
      content: `Author: Fran Sheffield, translation: Mgr. Lenka Ničková

The document presents a comprehensive overview of historical and contemporary uses of homeopathy as prevention of various infectious diseases. Samuel Hahnemann discovered the preventive possibilities of homeopathy in 1799 during a scarlet fever epidemic. Since then, these methods have been systematically used during major epidemics around the world.

Diseases covered: Chikungunya, cholera, Dengue fever, diphtheria, Japanese encephalitis, leptospirosis, malaria, meningococcal disease, poliomyelitis, scarlet fever, smallpox, whooping cough, and respiratory infections.

Studies from various countries (India, Brazil, Cuba, Kenya) show high effectiveness of homeoprophylaxis.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2020/04/epidemie.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2014-08-22"),
    },
    {
      slug: "homeopathy-helps",
      locale: "en",
      category: "Articles",
      title: "Homeopathy Helps",
      description: "How homeopathy helps people manage fear, strengthen immunity, and maintain health in challenging times.",
      content: `We find ourselves in the midst of difficult times. The state has adopted measures — closing businesses, restricting movement, and requiring face masks.

Many people live under pressure from fear about health, income, and the future. Such stress burdens reduce the body's defensive capabilities precisely when they are most needed.

Homeopathy helps people deal with fear, strengthen immunity, and maintain health. We recommend filling out the questionnaire on the website of the Czech Medical Homeopathic Society and contacting a homeopath.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2020/04/gaia.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2022-12-11"),
    },
    {
      slug: "fear-has-big-eyes",
      locale: "en",
      category: "Case Studies",
      title: "Fear Has Big Eyes",
      description: "The case of Dana, a 42-year-old patient with anxiety, insomnia, and panic attacks. Treatment with Argentum nitricum brought significant improvement.",
      content: `Fear has big eyes — in April 2020, the COVID-19 pandemic caused widespread fear despite infection numbers in the Czech Republic not meeting epidemic parameters.

The main part of the article focuses on Dana, a 42-year-old woman with long-term problems with stress, anxiety, insomnia, and panic attacks. Her problems originated in childhood — her mother favored her younger sister, which led to chronic self-underestimation and a need to please everyone.

The patient was treated with Argentum nitricum — first at 200 potency, then 1M. After treatment, her symptoms significantly improved: fears subsided, sleep improved, energy and positive mood returned.

Homeopathy is effective in dissolving fear. I recommend readers seek a qualified homeopath for anxiety and worry-related issues.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2019/12/podzim_05.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2020-04-26"),
    },
    {
      slug: "how-to-fight-coronavirus",
      locale: "en",
      category: "Articles",
      title: "How to Effectively Fight the Coronavirus",
      description: "A homeopathic approach to treating COVID-19 with an overview of recommended homeopathic remedies and preventive measures.",
      content: `The article discusses the spread of COVID-19 from China to the entire world. It is a febrile respiratory illness with a mild course in most infected individuals.

Stress caused by fear is much worse for the human body than the flu caused by the coronavirus. Homeopathy has treated epidemics for 250 years with demonstrable effectiveness.

Recommended remedies:
- Arsenicum album 30 CH (for fear)
- Bryonia alba 30 CH (pain with movement)
- Gelsemium 30 CH (flu symptoms)
- Antimonium tartaricum 30 CH (pulmonary complications)
- Eupatorium perfoliatum 30 CH (bone pain)
- Justicia adhatoda 30 C (serious pulmonary complications)`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2020/03/vir20.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2020-04-26"),
    },
    {
      slug: "fear-of-death",
      locale: "en",
      category: "Case Studies",
      title: "Fear of Death",
      description: "The case of a 23-year-old patient traumatized by her sister-in-law's suicide. Homeopathic treatment with Arsenicum album brought recovery.",
      content: `The article discusses the case of a 23-year-old patient struck by the tragedy of her close sister-in-law's suicide. This traumatic experience triggered long-term health problems.

Long-lasting anxiety, fears, and depression arrived eight years before visiting the homeopath. The young woman experienced intense fears of illness, death, and going crazy. Physically, she felt fear in her stomach and had hormonal imbalance with polycystic ovaries.

Dr. Petra Cihlářová gradually administered several preparations: Anacardium, which unified the patient's split self; Carcinosinum; Aconitum; and finally Arsenicum album. The last remedy proved to be the definitive solution.

After homeopathic treatment, the patient improved amazingly on all levels. Fears and anxieties dissolved and she could live freely without catastrophic scenarios.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2019/12/priroda_06.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2020-04-26"),
    },
    {
      slug: "the-little-sad-mourner",
      locale: "en",
      category: "Case Studies",
      title: "The Little Sad Mourner",
      description: "The case of a nine-year-old boy grieving his great-grandmother's death. Treatment with Carcinosinum 10M transformed the sad child into a cheerful boy.",
      content: `The article discusses how death in the family affects the bereaved. The death of a person is often a trigger for various health problems.

The story focuses on a nine-year-old boy whose 95-year-old great-grandmother died. The boy came for consultation with his mother. He had very sad eyes and suffered from insomnia since the funeral. He claimed a lizard was walking in his belly and described physical sensations of pinching and poking all over his body.

The child was very sensitive to sounds, had fears of cancer, failure, and death. He also suffered from long-term atopic eczema since three months of age.

Diagnosis revealed a young patient lacking external protection, deeply affected by life events. Homeopathic therapy with Carcinosinum 10M in a single dose led to significant improvement. The boy gradually transformed from a sad child full of fears into a cheerful, fearless boy.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2019/12/mysl_02.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2020-04-26"),
    },
    {
      slug: "the-asthmatic-athlete",
      locale: "en",
      category: "Case Studies",
      title: "The Asthmatic Athlete",
      description: "The case of a 29-year-old athlete with allergies and asthma. The homeopathic remedy Medorrhinum resolved both physical and psychological issues.",
      content: `The case describes a 29-year-old athlete who came for consultation due to severe dog allergy and asthma. The patient was characterized by liveliness, energy, and a tendency toward risk — he enjoyed extreme sports and traveling.

At the first consultation, Phosphorus was prescribed, bringing partial psychological improvement but not asthma relief. Tuberculinum was tried next without significant results.

During the sixth check-up, the patient opened up: in childhood, he was obese and bullied by peers. He also harbored deep fears of darkness and supernatural entities that haunted him in nightmares throughout his life.

Based on repertorization, Medorrhinum was selected at 200 potency and later 1M. The treatment brought dramatic improvement: the patient overcame his fears, nightmares disappeared, and asthma and allergies gradually vanished. He found peace and a stable relationship.

Homeopathy treats the whole person — mind and body together, not just symptoms.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2019/12/lide_03.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2020-04-26"),
    },
    {
      slug: "mechanism-of-homeopathic-remedies",
      locale: "en",
      category: "Science",
      title: "The Mechanism of Homeopathic Remedies Scientifically Proven",
      description: "A report from a 2018 seminar at the Royal Society of Medicine in London featuring lectures by Nobel Prize laureates.",
      content: `The seminar took place on July 14, 2018, in London at the Royal Society of Medicine. Scientists, including Nobel Prize laureates, presented scientific evidence on how homeopathic remedies work.

Speakers included: Luc Montagnier (Nobel Prize in Medicine for discovering HIV) and Brian Josephson (Nobel Prize in Physics). Other prominent scientists advocated the theory that water has a greater information capacity than silicon currently in use.

Gerald Pollack presented the theory of four phases of water, including EZ water. Vladimir Voeikov experimentally demonstrated that very high dilutions of the original substance differ in their physicochemical properties from the original water.

The seminar attracted 300 participants from around the world instead of the planned 100. The central theme was defending homeopathy against skepticism through scientific method and the study of nanostructures.

All lectures are available on YouTube.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2018/08/water_science-400x207.png",
      featured: true,
      published: true,
      publishedAt: new Date("2022-12-11"),
    },
    {
      slug: "meeting-of-east-and-west-homeopaths",
      locale: "en",
      category: "Congresses",
      title: "A Meeting of Homeopaths from East and West",
      description: "A report from an international homeopathy seminar in Mussoorie, India, featuring lectures by Farokh Master and Frederick Schroyens.",
      content: `The article describes the participation of a Czech delegation at an international homeopathy seminar in Mussoorie, India (February 7–11, 2007). The seminar was led by two lecturers: Farokh Master from India and Frederick Schroyens from Belgium.

The article documents a series of cases demonstrating homeopathic diagnostic techniques. One case involved a woman with severe asthma and a heart condition who was cured with Kali carbonicum.

Another topic was the analysis of tuberculins — special remedies used in homeopathy. The article distinguishes five main types: Tuberculinum Koch, BCG vaccine, Bacillinum, Tuberculinum Bovinum, and Tuberculinum Aviare.

The appendix included personal observations from visiting Indian cultural landmarks, including a Tibetan monastery in Dharamsala, an Ashram in Dehradun, and a memorable visit to Rishikesh on the Ganges.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2018/02/clanek1-1.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2018-08-17"),
    },
    {
      slug: "is-homeopathy-just-trade-in-illusions",
      locale: "en",
      category: "Articles",
      title: "Is Homeopathy Just a Trade in Illusions?",
      description: "A reflection on the principles of homeopathy, the history of Samuel Hahnemann, and the timelessness of the Organon of the Healing Art.",
      content: `In the eighteenth century, medicine was in a very poor state. Treatment procedures of that era resembled torture rather than actual patient care. During this time, physician Samuel Hahnemann discovered and subsequently developed treatment principles in his work called the Organon of the Healing Art.

Hahnemann describes the laws of the healing method from the definition of disease to the gentlest and most lasting ways of treating it. What is remarkable about this book is its timelessness — homeopaths around the world still use it as the source of their principles today.

The system is called homeopathy because it is based on the principle of treating like with like. The goal is to restore health to the sick in the fastest, most reliable, and gentlest way.

Hahnemann does not question physiological processes in the body. According to him, the key role is played by dynamis — the immaterial life force that controls the organism. It is here that the balance between disease and health is determined.

Although science has not yet proven how homeopathy works, that is science's problem, not proof of ineffectiveness. Homeopathy continues to heal regardless of scientific belief in it.`,
      image: "https://homeopatie-praha.com/wp-content/uploads/2018/02/clanek14-400x533.jpg",
      featured: false,
      published: true,
      publishedAt: new Date("2018-02-20"),
    },
  ];

  // Insert all articles
  const allArticles = [...articlesCs, ...articlesEn];
  for (const article of allArticles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    });
  }

  console.log(`Seeded ${allArticles.length} articles (${articlesCs.length} CS + ${articlesEn.length} EN)`);

  // ── Testimonials ──────────────────────────────────────────────────
  const testimonials = [
    {
      nameCs: "Markéta V.",
      nameEn: "Markéta V.",
      textCs: "Po letech s ekzémem jsem konečně našla úlevu. Petra ke mně přistupovala jako k člověku, ne k diagnóze.",
      textEn: "After years with eczema, I finally found relief. Petra treated me as a person, not a diagnosis.",
      detailCs: "ekzém · 3 roky léčby",
      detailEn: "eczema · 3 years of treatment",
      stars: 5,
      order: 1,
    },
    {
      nameCs: "Jana K.",
      nameEn: "Jana K.",
      textCs: "Přišla jsem kvůli nespavosti a depresím. Výsledky přesáhly moje očekávání — cítím se lépe než roky.",
      textEn: "I came because of insomnia and depression. The results exceeded my expectations — I feel better than I have in years.",
      detailCs: "nespavost, deprese",
      detailEn: "insomnia, depression",
      stars: 5,
      order: 2,
    },
    {
      nameCs: "Tomáš M.",
      nameEn: "Tomáš M.",
      textCs: "Léčíme celou rodinu. Homeopatie nám pomohla tam, kde konvenční medicína selhala.",
      textEn: "We treat the whole family. Homeopathy helped us where conventional medicine failed.",
      detailCs: "rodinná péče",
      detailEn: "family care",
      stars: 5,
      order: 3,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }

  console.log(`Seeded ${testimonials.length} testimonials`);
  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
