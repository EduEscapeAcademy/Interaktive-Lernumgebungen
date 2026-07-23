(function () {
  "use strict";

  const PACKAGE = {
    id: "spanisch-vorkurs-01",
    version: "2.0.0",
    schemaVersion: "1.0",
    title: "Ruta por España",
  };

  const starters = [
    {
      id: "S001",
      number: 1,
      contentVersion: "1.1.0",
      code: "COSTA-29",
      title: "España",
      subtitle: "Wörter, Orte und erste Textspuren",
      focus: ["Wortschatz", "Geografie", "Textverständnis"],
      estimatedMinutes: 3,
      blocks: [
        {
          id: "S001-B1",
          type: "text-set",
          title: "Letras desordenadas",
          instruction: "Ordne die Buchstaben. Schreibe das spanische Wort mit Artikel.",
          items: [
            text("S001-I01", "UNAGEL", ["la lengua"], "Wortschatz", "Wort mit Artikel", "Es ist etwas, das man spricht. Der Artikel gehört zur Antwort.", "Das Wort beginnt mit l und endet auf -a: la …", "la lengua"),
            text("S001-I02", "SALI", ["la isla"], "Wortschatz", "Wort mit Artikel", "Mallorca ist ein Beispiel. Der Artikel gehört zur Antwort.", "Das Wort beginnt mit i und endet auf -a: la …", "la isla"),
            text("S001-I03", "NORCET", ["el centro"], "Wortschatz", "Wort mit Artikel", "Madrid liegt dort. Der Artikel gehört zur Antwort.", "Das Wort beginnt mit c und endet auf -o: el …", "el centro"),
            text("S001-I04", "LITAPAC", ["la capital"], "Wortschatz", "Wort mit Artikel", "Madrid ist das von Spanien. Der Artikel gehört zur Antwort.", "Das Wort beginnt mit c; der Artikel ist feminin: la …", "la capital"),
          ],
        },
        {
          id: "S001-B2",
          type: "match",
          title: "Ciudades y lugares",
          instruction: "Toca primero una ciudad y después la ubicación correcta. · Tippe zuerst eine Stadt und danach die passende Lage an.",
          competency: "Geografie",
          errorCategory: "räumliche Zuordnung",
          leftLabel: "Ciudad",
          rightLabel: "Ubicación",
          pairs: [
            pair("S001-I05", "Bilbao", "norte", "Bilbao steht im Text zusammen mit „norte“.", "Busca la ciudad en el norte de España."),
            pair("S001-I06", "Valencia", "este", "Valencia liegt an der Mittelmeerküste.", "En el texto: „Valencia está en el este“.") ,
            pair("S001-I07", "Sevilla", "sur", "Denke an die Städte Sevilla und Granada.", "En el texto, las dos ciudades están en el sur."),
            pair("S001-I08", "Badajoz", "oeste", "Badajoz liegt nahe Portugal.", "En el texto: „Badajoz está en el oeste“.") ,
            pair("S001-I09", "Madrid", "centro", "Madrid ist die Hauptstadt.", "En el texto: „Madrid está en el centro“.") ,
          ],
        },
        {
          id: "S001-B3",
          type: "choice-set",
          title: "Tres decisiones",
          instruction: "Elige la respuesta correcta. · Wähle die richtige Antwort.",
          items: [
            choice("S001-I10", "¿Con qué países limita España según el texto «Esto es España»?", ["Francia y Portugal", "Francia e Italia", "Portugal y Alemania"], "Francia y Portugal", "Textverständnis", "Detailinformation", "Busca dos países en la primera frase del texto.", "España limita con …"),
            choice("S001-I11", "¿Qué es Madrid?", ["la capital de España", "un país", "una isla"], "la capital de España", "Textverständnis", "Begriffszusammenhang", "Madrid está en el centro de España.", "En el texto: „Madrid es la capital de España“.") ,
            choice("S001-I12", "¿Qué dice el texto sobre España? · (Was sagt der Text über Spanien?)", ["Es un país muy interesante.", "Es una isla muy pequeña.", "Está entre Portugal y Alemania."], "Es un país muy interesante.", "Textverständnis", "globale Aussage", "Piensa en la última frase del texto.", "La frase empieza con „España es un país …“.") ,
          ],
        },
      ],
    },
    {
      id: "S002",
      number: 2,
      contentVersion: "1.1.0",
      code: "NORTE-7",
      title: "¿Dónde está?",
      subtitle: "Richtungen lesen und Spanien verstehen",
      focus: ["Himmelsrichtungen", "Wortschatz", "Textverständnis"],
      estimatedMinutes: 3,
      blocks: [
        {
          id: "S002-B1",
          type: "text-set",
          title: "Palabras activas",
          instruction: "Übersetze ins Spanische. Der Artikel ist freiwillig.",
          items: [
            text("S002-I01", "die Stadt", ["la ciudad", "ciudad"], "Wortschatz", "lexikalisch", "Im Text ist Barcelona eine davon.", "Das Wort beginnt mit ciu-.", "la ciudad"),
            text("S002-I02", "der Norden", ["el norte", "norte"], "Wortschatz", "lexikalisch", "Die Pirineos liegen dort.", "Das Wort beginnt mit n.", "el norte"),
            text("S002-I03", "die Küste", ["la costa", "costa"], "Wortschatz", "lexikalisch", "Barcelona liegt dort.", "Das Wort beginnt mit c und endet auf -a.", "la costa"),
          ],
        },
        {
          id: "S002-B2",
          type: "match",
          title: "En el mapa",
          instruction: "Verbinde jeden Ort mit der Angabe aus dem Text.",
          competency: "Geografie",
          errorCategory: "räumliche Zuordnung",
          leftLabel: "Ort",
          rightLabel: "Textangabe",
          pairs: [
            pair("S002-I04", "Barcelona", "noreste, en la costa", "Barcelona liegt nicht nur im Osten.", "Der Text nennt zwei Angaben: „noreste“ und „costa“.") ,
            pair("S002-I05", "Granada", "sur", "Granada wird zusammen mit Sevilla genannt.", "Beide Städte stehen bei „sur“.") ,
            pair("S002-I06", "Los Pirineos", "norte", "Das Gebirge liegt zwischen Spanien und Frankreich.", "Im Text steht direkt: „Los Pirineos están en el norte“.") ,
            pair("S002-I07", "Madrid", "centro", "Die Hauptstadt liegt nicht an der Küste.", "Im Text steht „en el centro del país“.") ,
          ],
        },
        {
          id: "S002-B3",
          type: "choice-set",
          title: "Esto es España",
          instruction: "Elige la respuesta correcta según el texto «Esto es España».",
          items: [
            choice("S002-I08", "¿Cuántas lenguas se hablan en España?", ["cuatro", "dos", "cinco"], "cuatro", "Textverständnis", "Zahleninformation", "Cuenta: castellano, catalán, euskera y gallego.", "En el texto, el número está escrito con una palabra."),
            choice("S002-I09", "Según el texto, ¿dónde están los Pirineos?", ["En el norte, entre Francia y España.", "En el sur, entre España y Portugal.", "En el este, en las Islas Baleares."], "En el norte, entre Francia y España.", "Textverständnis", "präzise Ortsinformation", "Los Pirineos son montañas en el norte.", "El texto menciona el norte y dos países: Francia y España."),
            choice("S002-I10", "¿Qué lengua es oficial en España?", ["el castellano", "el catalán", "el gallego"], "el castellano", "Textverständnis", "Detailinformation", "También se llama español.", "En el texto: „La lengua oficial de España es …“"),
          ],
        },
      ],
    },
    {
      id: "S003",
      number: 3,
      contentVersion: "1.0.0",
      code: "OLIVA-43",
      title: "El género y los artículos",
      subtitle: "Maskulin, feminin – bestimmt, unbestimmt",
      focus: ["Genus", "bestimmter Artikel", "unbestimmter Artikel"],
      estimatedMinutes: 3,
      blocks: [
        {
          id: "S003-B1",
          type: "sort",
          title: "Masculino o femenino",
          instruction: "Ordne jedes bekannte Wort einer Gruppe zu.",
          competency: "Genus",
          errorCategory: "Genuszuordnung",
          categories: ["masculino", "femenino"],
          items: [
            sortItem("S003-I01", "centro", "masculino", "Die Endung -o hilft hier.", "Das Material führt „el centro“ auf."),
            sortItem("S003-I02", "playa", "femenino", "Die Endung -a hilft hier.", "Das Material führt „la playa“ auf."),
            sortItem("S003-I03", "país", "masculino", "Die Endung allein verrät es hier nicht.", "Du kennst die Verbindung „el país“.") ,
            sortItem("S003-I04", "ciudad", "femenino", "Wörter auf -dad sind meist feminin.", "Es heißt „la ciudad“.") ,
            sortItem("S003-I05", "programa", "masculino", "Achtung: -ma ist hier ein Signal.", "Es heißt trotz -a: „el programa“.") ,
            sortItem("S003-I06", "montaña", "femenino", "Die Endung -a hilft hier.", "Es heißt „la montaña“.") ,
          ],
        },
        {
          id: "S003-B2",
          type: "select-set",
          title: "El, la, un o una",
          instruction: "Ergänze den verlangten Artikel.",
          items: [
            selectItem("S003-I07", "___ texto (bestimmt)", ["el", "la", "un", "una"], "el", "Artikel", "bestimmter Artikel", "„texto“ ist maskulin; gesucht ist der bestimmte Artikel.", "Maskulin + bestimmt = el."),
            selectItem("S003-I08", "___ lengua (unbestimmt)", ["el", "la", "un", "una"], "una", "Artikel", "unbestimmter Artikel", "„lengua“ ist feminin; gesucht ist der unbestimmte Artikel.", "Feminin + unbestimmt = una."),
            selectItem("S003-I09", "___ capital (bestimmt)", ["el", "la", "un", "una"], "la", "Artikel", "bestimmter Artikel", "„capital“ gehört zur femininen Liste.", "Feminin + bestimmt = la."),
            selectItem("S003-I10", "___ país (unbestimmt)", ["el", "la", "un", "una"], "un", "Artikel", "unbestimmter Artikel", "„país“ ist maskulin.", "Maskulin + unbestimmt = un."),
            selectItem("S003-I11", "___ isla (bestimmt)", ["el", "la", "un", "una"], "la", "Artikel", "bestimmter Artikel", "„isla“ ist feminin.", "Feminin + bestimmt = la."),
          ],
        },
      ],
    },
    {
      id: "S004",
      number: 4,
      contentVersion: "1.0.0",
      code: "SIERRA-18",
      title: "Singular y plural",
      subtitle: "Ganze Formen sicher bilden",
      focus: ["Pluralbildung", "Artikel", "Fehlerkorrektur"],
      estimatedMinutes: 3,
      blocks: [
        {
          id: "S004-B1",
          type: "text-set",
          title: "Forma la pareja",
          instruction: "Bilde die vollständige Gegenform mit bestimmtem Artikel.",
          items: [
            text("S004-I01", "la playa → Plural", ["las playas"], "Plural", "Plural auf -s", "Das Wort endet auf einen Vokal.", "Artikel und Nomen werden Plural: la → las, playa → playas.", "las playas"),
            text("S004-I02", "el texto → Plural", ["los textos"], "Plural", "Plural auf -s", "Das Wort endet auf einen Vokal.", "el → los und texto bekommt -s.", "los textos"),
            text("S004-I03", "la capital → Plural", ["las capitales"], "Plural", "Plural auf -es", "Das Wort endet auf einen Konsonanten.", "la → las und capital bekommt -es.", "las capitales"),
            text("S004-I04", "los países → Singular", ["el país"], "Plural", "Singularbildung", "Entferne die Pluralendung und ändere den Artikel.", "los → el; países → país. Achte auf den Akzent.", "el país"),
          ],
        },
        {
          id: "S004-B2",
          type: "select-set",
          title: "¿-s o -es?",
          instruction: "Wähle die passende vollständige Form.",
          items: [
            selectItem("S004-I05", "la universidad", ["las universidads", "las universidades", "los universidades"], "las universidades", "Plural", "Plural auf -es", "Das Wort endet auf -d.", "Konsonant: in der Regel -es; feminin bleibt feminin."),
            selectItem("S004-I06", "el hotel", ["los hoteles", "los hotels", "las hoteles"], "los hoteles", "Plural", "Plural auf -es", "Das Wort endet auf -l.", "Konsonant: -es; maskuliner Pluralartikel los."),
          ],
        },
        {
          id: "S004-B3",
          type: "text-set",
          title: "Corrige el error",
          instruction: "Schreibe den fehlerhaften Ausdruck vollständig richtig.",
          items: [
            text("S004-I07", "✗ los capitales", ["las capitales"], "Fehlerkorrektur", "Artikelkongruenz", "„capital“ ist feminin.", "Der Plural des femininen Artikels la ist las.", "las capitales"),
          ],
        },
      ],
    },
    {
      id: "S005",
      number: 5,
      contentVersion: "1.0.0",
      code: "RUTA-56",
      title: "Ser o estar",
      subtitle: "Eigenschaft oder Ort?",
      focus: ["ser und estar", "Kongruenz", "kumulative Wiederholung"],
      estimatedMinutes: 3,
      blocks: [
        {
          id: "S005-B1",
          type: "select-set",
          title: "Completa",
          instruction: "Ergänze die passende bekannte Form von ser oder estar.",
          items: [
            selectItem("S005-I01", "España ___ interesante.", ["es", "está", "son", "están"], "es", "ser/estar", "Verbwahl Eigenschaft", "„interesante“ beschreibt, wie Spanien ist.", "Eigenschaft + Singular: ser → es."),
            selectItem("S005-I02", "Madrid ___ en el centro.", ["es", "está", "son", "están"], "está", "ser/estar", "Verbwahl Ort", "„en el centro“ nennt einen Ort.", "Ort + Singular: estar → está."),
            selectItem("S005-I03", "Las playas ___ en el sur.", ["es", "está", "son", "están"], "están", "ser/estar", "Verbwahl Ort", "„en el sur“ nennt einen Ort; playas ist Plural.", "Ort + Plural: estar → están."),
            selectItem("S005-I04", "Los Pirineos ___ en el norte.", ["es", "está", "son", "están"], "están", "ser/estar", "Verbwahl Ort", "„en el norte“ nennt einen Ort; Pirineos ist Plural.", "Ort + Plural: estar → están."),
            selectItem("S005-I05", "Barcelona ___ una ciudad grande.", ["es", "está", "son", "están"], "es", "ser/estar", "Verbwahl Eigenschaft", "Der Satz sagt, was Barcelona ist.", "Beschreibung/Einordnung + Singular: ser → es."),
          ],
        },
        {
          id: "S005-B2",
          type: "sort",
          title: "¿Cómo o dónde?",
          instruction: "Ordne die Satzaussage der passenden Funktion zu.",
          competency: "ser/estar",
          errorCategory: "Regelverständnis",
          categories: ["Eigenschaft – ser", "Ort – estar"],
          items: [
            sortItem("S005-I06", "interesante", "Eigenschaft – ser", "Frage: Wie ist etwas?", "Eigenschaften stehen hier mit ser."),
            sortItem("S005-I07", "en el centro", "Ort – estar", "Frage: Wo befindet sich etwas?", "Ortsangaben stehen hier mit estar."),
            sortItem("S005-I08", "grande", "Eigenschaft – ser", "Das Wort beschreibt eine Stadt.", "Eigenschaften stehen hier mit ser."),
            sortItem("S005-I09", "en la costa", "Ort – estar", "Die Präposition en weist auf einen Ort.", "Ortsangaben stehen hier mit estar."),
          ],
        },
        {
          id: "S005-B3",
          type: "text-set",
          title: "Corrige y recuerda",
          instruction: "Verbessere den Satz vollständig.",
          items: [
            text("S005-I10", "✗ Madrid es en el centro.", ["Madrid está en el centro", "Madrid está en el centro."], "Fehlerkorrektur", "ser/estar", "„en el centro“ ist eine Ortsangabe.", "Für Orte verwendest du estar: Madrid está …", "Madrid está en el centro."),
            text("S005-I11", "✗ los playa están en el sur.", ["las playas están en el sur", "las playas están en el sur."], "Kumulative Wiederholung", "Artikel und Plural", "Prüfe Artikel und Endung von playa.", "Feminin Plural: las playas. Die Verbform bleibt están.", "Las playas están en el sur."),
          ],
        },
      ],
    },
    {
      id: "S006",
      number: 6,
      contentVersion: "1.0.0",
      code: "LAGO-31",
      title: "Escritura y vocabulario",
      subtitle: "Schreibweisen erkennen und bekannte Wörter aktivieren",
      focus: ["Wortschatz", "Orthografie", "Akzente"],
      estimatedMinutes: 3,
      blocks: [
        {
          id: "S006-B1",
          type: "choice-set",
          title: "¿Qué palabra está bien escrita?",
          instruction: "Elige la forma completamente correcta. · Wähle die vollständig richtige Schreibweise.",
          items: [
            choice("S006-I01", "die portugiesische Sprache", ["portugués", "portugés", "portugues"], "portugués", "Orthografie", "schwierige Buchstabenfolge", "Achte auf das stumme u nach dem g.", "Die betonte letzte Silbe braucht außerdem einen Akzent: portugués."),
            choice("S006-I02", "die Nationalität: türkisch (m.)", ["turco", "turqo", "turko"], "turco", "Orthografie", "falscher Buchstabe", "Im Spanischen steht hier kein q.", "Der Laut wird in diesem Wort mit c geschrieben: turco."),
            choice("S006-I03", "die französische Sprache", ["francés", "frances", "francéz"], "francés", "Orthografie", "fehlender Akzent", "Achte auf die betonte letzte Silbe.", "Das Wort endet auf -és und auf den Buchstaben s: francés."),
            choice("S006-I04", "die englische Sprache", ["inglés", "ingles", "ingléz"], "inglés", "Orthografie", "fehlender Akzent", "Achte auf die betonte letzte Silbe.", "Das Wort endet auf -és und auf den Buchstaben s: inglés."),
            choice("S006-I05", "das Land Deutschland", ["Alemania", "Alemanía", "Alemánia"], "Alemania", "Orthografie", "überflüssiger Akzent", "Sprich das Wort in Silben: A-le-ma-nia.", "Alemania wird ohne Akzent geschrieben."),
            choice("S006-I06", "die Nationalität: spanisch (f.)", ["española", "espanola", "españóla"], "española", "Wortschatz", "Land, Sprache und Nationalität", "Gesucht ist die feminine Form einer Nationalität.", "Achte auf ñ; española wird ohne Akzent geschrieben."),
          ],
        },
        {
          id: "S006-B2",
          type: "text-set",
          title: "Letras desordenadas",
          instruction: "Ordena las letras. Escribe la palabra con artículo. · Schreibe das Wort mit Artikel.",
          items: [
            text("S006-I07", "BREMOH", ["el hombre"], "Wortschatz", "Wort mit Artikel", "Gesucht ist das spanische Wort für „der Mann“. Der Artikel gehört dazu.", "Das Wort beginnt mit h: el h…", "el hombre"),
            text("S006-I08", "JERUM", ["la mujer"], "Wortschatz", "Wort mit Artikel", "Gesucht ist das spanische Wort für „die Frau“. Der Artikel gehört dazu.", "Das Wort beginnt mit m: la m…", "la mujer"),
            text("S006-I09", "SIPA", ["el país"], "Wortschatz", "Akzent und Artikel", "Gesucht ist das spanische Wort für „das Land“. Der Artikel gehört dazu.", "Das Wort hat einen Akzent auf dem í: el país.", "el país"),
            text("S006-I10", "CIONAN", ["la nación"], "Wortschatz", "Akzent und Artikel", "Gesucht ist das spanische Wort für „die Nation“. Der Artikel gehört dazu.", "Das Wort endet auf -ción: la nación.", "la nación"),
          ],
        },
        {
          id: "S006-B3",
          type: "choice-set",
          title: "Traducción activa",
          instruction: "Elige la traducción exacta con artículo.",
          items: [
            choice("S006-I11", "die Sprache", ["la lengua", "el país", "la ciudad"], "la lengua", "Wortschatz", "lexikalische Verwechslung", "Das ist etwas, das man spricht.", "Das Wort beginnt mit l und ist feminin: la lengua."),
            choice("S006-I12", "das Land", ["el país", "la nación", "el texto"], "el país", "Wortschatz", "Artikel und Bedeutung", "Gesucht ist ein maskulines Nomen.", "Es heißt el país; der Akzent gehört zum Wort."),
            choice("S006-I13", "die Nation", ["la nación", "la mujer", "la comunidad"], "la nación", "Wortschatz", "Artikel und Bedeutung", "Das Wort endet auf -ción.", "Die vollständige Form lautet la nación."),
          ],
        },
      ],
    },
    {
      id: "S007",
      number: 7,
      contentVersion: "1.0.0",
      code: "SOL-84",
      title: "Verbos en -ar",
      subtitle: "Personen, Endungen und regelmäßige Verbformen",
      focus: ["-ar-Verben", "Konjugation", "Kongruenz"],
      estimatedMinutes: 3,
      blocks: [
        {
          id: "S007-B1",
          type: "match",
          title: "Persona y terminación",
          instruction: "Toca una persona y después la terminación correcta.",
          competency: "Verbkonjugation",
          errorCategory: "Personalendung -ar",
          leftLabel: "Persona",
          rightLabel: "Terminación",
          pairs: [
            pair("S007-I01", "yo", "-o", "Denke an: yo hablo.", "Bei yo endet das regelmäßige Verb auf -o."),
            pair("S007-I02", "tú", "-as", "Denke an: tú hablas.", "Bei tú endet ein -ar-Verb auf -as."),
            pair("S007-I03", "él / ella / usted", "-a", "Diese drei Personen haben dieselbe Endung.", "Die Form endet nur auf -a."),
            pair("S007-I04", "nosotros/as", "-amos", "In der Endung hörst du das a des Infinitivs.", "Die vollständige Endung lautet -amos."),
            pair("S007-I05", "vosotros/as", "-áis", "Achte auf den Akzent.", "Die vollständige Endung lautet -áis."),
            pair("S007-I06", "ellos / ellas / ustedes", "-an", "Diese drei Personen haben dieselbe Endung.", "Die Form endet auf -an."),
          ],
        },
        {
          id: "S007-B2",
          type: "text-set",
          title: "Conjuga",
          instruction: "Escribe la forma correcta del verbo.",
          items: [
            text("S007-I07", "yo · hablar", ["hablo"], "Verbkonjugation", "Personalendung -ar", "Streiche beim Infinitiv -ar.", "Für yo ergänzt du -o: habl- + o.", "hablo"),
            text("S007-I08", "tú · estudiar", ["estudias"], "Verbkonjugation", "Personalendung -ar", "Der Stamm lautet estudi-.", "Für tú ergänzt du -as: estudias.", "estudias"),
            text("S007-I09", "Paco · trabajar", ["trabaja"], "Verbkonjugation", "Subjekt-Verb-Kongruenz", "Paco kann durch él ersetzt werden.", "Für él endet das Verb auf -a: trabaja.", "trabaja"),
            text("S007-I10", "nosotros · practicar", ["practicamos"], "Verbkonjugation", "Personalendung -ar", "Der Stamm lautet practic-.", "Für nosotros ergänzt du -amos: practicamos.", "practicamos"),
            text("S007-I11", "vosotros · charlar", ["charláis"], "Verbkonjugation", "Akzent in der Verbform", "Für vosotros lautet die Endung -áis.", "Verbinde charl- und -áis: charláis.", "charláis"),
          ],
        },
        {
          id: "S007-B3",
          type: "choice-set",
          title: "Detective de errores",
          instruction: "Elige la corrección completa.",
          items: [
            choice("S007-I12", "✗ Lucía y Marta habla español.", ["Lucía y Marta hablan español.", "Lucía y Marta habláis español.", "Lucía y Marta hablamos español."], "Lucía y Marta hablan español.", "Fehlerkorrektur", "Subjekt-Verb-Kongruenz", "Lucía y Marta sind zwei Personen: ellas.", "Für ellas endet hablar auf -an."),
            choice("S007-I13", "✗ Paco trabajas en Madrid.", ["Paco trabaja en Madrid.", "Paco trabajo en Madrid.", "Paco trabajan en Madrid."], "Paco trabaja en Madrid.", "Fehlerkorrektur", "Subjekt-Verb-Kongruenz", "Paco kann durch él ersetzt werden.", "Für él endet trabajar auf -a."),
            choice("S007-I14", "✗ Los amigos estudiamos español.", ["Los amigos estudian español.", "Los amigos estudiáis español.", "Los amigos estudia español."], "Los amigos estudian español.", "Fehlerkorrektur", "Subjekt-Verb-Kongruenz", "Los amigos kann durch ellos ersetzt werden.", "Für ellos endet estudiar auf -an."),
          ],
        },
      ],
    },
    {
      id: "S008",
      number: 8,
      contentVersion: "1.0.0",
      code: "FIESTA-26",
      title: "Preguntas y profesiones",
      subtitle: "Berufe benennen und Gespräche passend gestalten",
      focus: ["Berufe", "Fragewörter", "Redemittel"],
      estimatedMinutes: 3,
      blocks: [
        {
          id: "S008-B1",
          type: "choice-set",
          title: "Las profesiones",
          instruction: "Elige la profesión española que corresponde exactamente.",
          items: [
            choice("S008-I01", "Schauspieler (m.)", ["actor", "actriz", "pintor"], "actor", "Wortschatz", "Beruf und Genus", "Gesucht ist die männliche Form.", "Der Schauspieler heißt actor."),
            choice("S008-I02", "Schauspielerin (f.)", ["actriz", "actor", "pintora"], "actriz", "Wortschatz", "Beruf und Genus", "Gesucht ist die weibliche Form.", "Die Schauspielerin heißt actriz."),
            choice("S008-I03", "Malerin (f.)", ["pintora", "pintor", "política"], "pintora", "Wortschatz", "Beruf und Genus", "Das Verb pintar hilft dir bei der Wortfamilie.", "Die feminine Form endet auf -a: pintora."),
            choice("S008-I04", "Politiker (m.)", ["político", "política", "pintor"], "político", "Wortschatz", "Akzent und Genus", "Gesucht ist die männliche Form auf -o.", "Achte auf den Akzent: político."),
            choice("S008-I05", "Königin (f.)", ["reina", "rey", "actriz"], "reina", "Wortschatz", "Beruf und Genus", "Gesucht ist nicht der männliche rey.", "Die Königin heißt reina."),
          ],
        },
        {
          id: "S008-B2",
          type: "select-set",
          title: "La palabra interrogativa",
          instruction: "Completa cada pregunta con la expresión interrogativa correcta.",
          items: [
            selectItem("S008-I06", "¿___ te llamas?", ["qué", "quién", "quiénes", "cómo", "de dónde", "dónde"], "cómo", "Fragewörter", "Frageabsicht", "Die Frage zielt auf den Namen und die Art des Sich-Nennens.", "Die bekannte Frage lautet: ¿Cómo te llamas?"),
            selectItem("S008-I07", "¿___ lenguas hablas?", ["qué", "quién", "quiénes", "cómo", "de dónde", "dónde"], "qué", "Fragewörter", "Frageabsicht", "Nach einem Gegenstand oder Inhalt fragst du mit qué.", "Die vollständige Frage lautet: ¿Qué lenguas hablas?"),
            selectItem("S008-I08", "¿___ es el rey?", ["qué", "quién", "quiénes", "cómo", "de dónde", "dónde"], "quién", "Fragewörter", "Singular und Plural", "Gefragt wird nach einer einzelnen Person.", "Für eine Person verwendest du quién."),
            selectItem("S008-I09", "¿___ son Lucía y Marta?", ["qué", "quién", "quiénes", "cómo", "de dónde", "dónde"], "quiénes", "Fragewörter", "Singular und Plural", "Gefragt wird nach mehreren Personen.", "Für mehrere Personen verwendest du quiénes."),
            selectItem("S008-I10", "¿___ eres?", ["qué", "quién", "quiénes", "cómo", "de dónde", "dónde"], "de dónde", "Fragewörter", "Herkunftsfrage", "Die Frage zielt auf die Herkunft.", "Nach der Herkunft fragst du: ¿De dónde eres?"),
            selectItem("S008-I11", "¿___ está Madrid?", ["qué", "quién", "quiénes", "cómo", "de dónde", "dónde"], "dónde", "Fragewörter", "Ortsfrage", "Die Frage zielt auf einen Ort.", "Für eine Ortsfrage verwendest du dónde."),
          ],
        },
        {
          id: "S008-B3",
          type: "match",
          title: "Intención y frase",
          instruction: "Relaciona cada intención con la frase española adecuada.",
          competency: "Kommunikation",
          errorCategory: "Redemittel und Gesprächsrolle",
          leftLabel: "Intención",
          rightLabel: "Frase",
          pairs: [
            pair("S008-I12", "A begrüßt B.", "¡Buenos días!", "Gesucht ist eine Begrüßung.", "Die Wendung beginnt mit Buenos …"),
            pair("S008-I13", "B fragt A nach dem Namen.", "¿Cómo te llamas?", "B stellt eine Frage an A.", "Die bekannte Namensfrage beginnt mit ¿Cómo …?"),
            pair("S008-I14", "A nennt den eigenen Namen.", "Me llamo Marta.", "A antwortet in der Ich-Form.", "Die Antwort beginnt mit Me llamo …"),
            pair("S008-I15", "B fragt A nach der Herkunft.", "¿De dónde eres?", "B fragt, aus welchem Land A kommt.", "Die Herkunftsfrage beginnt mit ¿De dónde …?"),
            pair("S008-I16", "A nennt die eigene Herkunft.", "Soy de España.", "A antwortet in der Ich-Form.", "Die Herkunft wird mit Soy de … angegeben."),
            pair("S008-I17", "B fragt nach den gesprochenen Sprachen.", "¿Qué lenguas hablas?", "B fragt nach mehreren Sprachen.", "Die Frage beginnt mit ¿Qué lenguas …?"),
            pair("S008-I18", "A antwortet auf die Sprachenfrage.", "Hablo español e inglés.", "A verwendet die Ich-Form von hablar.", "Vor einem Wort mit i-Laut steht hier e statt y."),
            pair("S008-I19", "B verabschiedet sich.", "Hasta luego.", "Gesucht ist eine Verabschiedung.", "Die Wendung beginnt mit Hasta …"),
          ],
        },
      ],
    },
    {
      id: "S009",
      number: 9,
      contentVersion: "1.0.0",
      code: "LIBRO-63",
      title: "Verbos en -er",
      subtitle: "Neue Endungen mit sichtbarer Wortbedeutung",
      focus: ["-er-Verben", "Konjugation", "Infinitive"],
      estimatedMinutes: 3,
      blocks: [
        {
          id: "S009-B1",
          type: "match",
          title: "Las terminaciones",
          instruction: "Relaciona cada persona con la terminación de los verbos en -er.",
          competency: "Verbkonjugation",
          errorCategory: "Personalendung -er",
          leftLabel: "Persona",
          rightLabel: "Terminación",
          pairs: [
            pair("S009-I01", "yo", "-o", "Denke an: yo leo.", "Bei yo endet die Form auf -o."),
            pair("S009-I02", "tú", "-es", "Denke an: tú comprendes.", "Bei tú endet ein -er-Verb auf -es."),
            pair("S009-I03", "él / ella / usted", "-e", "Diese drei Personen haben dieselbe Endung.", "Die Form endet auf -e."),
            pair("S009-I04", "nosotros/as", "-emos", "Achte auf den Vokal e.", "Die vollständige Endung lautet -emos."),
            pair("S009-I05", "vosotros/as", "-éis", "Achte auf den Akzent.", "Die vollständige Endung lautet -éis."),
            pair("S009-I06", "ellos / ellas / ustedes", "-en", "Diese Personen haben dieselbe Endung.", "Die Form endet auf -en."),
          ],
        },
        {
          id: "S009-B2",
          type: "text-set",
          title: "Completa la forma",
          instruction: "Escribe la forma correcta. Puedes abrir la ayuda de significado.",
          items: [
            Object.assign(text("S009-I07", "yo · leer", ["leo"], "Verbkonjugation", "Personalendung -er", "Der Stamm lautet le-.", "Für yo ergänzt du -o: leo.", "leo"), { gloss: "leer – lesen" }),
            Object.assign(text("S009-I08", "tú · comprender", ["comprendes"], "Verbkonjugation", "Personalendung -er", "Der Stamm lautet comprend-.", "Für tú ergänzt du -es: comprendes.", "comprendes"), { gloss: "comprender – verstehen" }),
            Object.assign(text("S009-I09", "ella · aprender", ["aprende"], "Verbkonjugation", "Personalendung -er", "Ella hat dieselbe Form wie él.", "Für ella endet aprender auf -e: aprende.", "aprende"), { gloss: "aprender – lernen" }),
            Object.assign(text("S009-I10", "nosotros · leer", ["leemos"], "Verbkonjugation", "Personalendung -er", "Für nosotros lautet die Endung -emos.", "Verbinde le- und -emos: leemos.", "leemos"), { gloss: "leer – lesen" }),
            Object.assign(text("S009-I11", "ellos · comprender", ["comprenden"], "Verbkonjugation", "Personalendung -er", "Für ellos lautet die Endung -en.", "Verbinde comprend- und -en: comprenden.", "comprenden"), { gloss: "comprender – verstehen" }),
          ],
        },
        {
          id: "S009-B3",
          type: "choice-set",
          title: "¿-ar o -er?",
          instruction: "Elige el infinitivo de cada forma. En este bloque solo aparecen -ar y -er.",
          items: [
            choice("S009-I12", "hablamos", ["hablar", "leer", "trabajar"], "hablar", "Verbgruppen", "Infinitiv erkennen", "Die Form enthält den Stamm habl-.", "Ergänze am Stamm die Infinitivendung -ar: hablar."),
            choice("S009-I13", "aprendéis", ["aprender", "comprender", "estudiar"], "aprender", "Verbgruppen", "Infinitiv erkennen", "Die Form enthält den Stamm aprend-.", "Der Infinitiv lautet aprender."),
            choice("S009-I14", "trabajan", ["trabajar", "hablar", "comprender"], "trabajar", "Verbgruppen", "Infinitiv erkennen", "Die Form enthält den Stamm trabaj-.", "Der Infinitiv lautet trabajar."),
            choice("S009-I15", "comprende", ["comprender", "aprender", "practicar"], "comprender", "Verbgruppen", "Infinitiv erkennen", "Die Form enthält den Stamm comprend-.", "Der Infinitiv lautet comprender."),
          ],
        },
      ],
    },
    {
      id: "S010",
      number: 10,
      contentVersion: "1.0.0",
      code: "PLAZA-47",
      title: "Verbos, sujetos y formas",
      subtitle: "Subjekte erkennen und passende Verbformen wählen",
      focus: ["Verben als Wortschatz", "Subjekte", "-ir-Verben"],
      estimatedMinutes: 3,
      blocks: [
        {
          id: "S010-B1",
          type: "text-set",
          title: "Letras desordenadas – verbos",
          instruction: "Ordena las letras y escribe el infinitivo.",
          items: [
            text("S010-I01", "RALBAH", ["hablar"], "Wortschatz", "Infinitivschreibung", "Das Verb bedeutet „sprechen“.", "Es beginnt mit h und endet auf -ar: hablar.", "hablar"),
            text("S010-I02", "JARABART", ["trabajar"], "Wortschatz", "Infinitivschreibung", "Das Verb bedeutet „arbeiten“.", "Achte auf die Reihenfolge tra-ba-jar: trabajar.", "trabajar"),
            text("S010-I03", "DIARTESU", ["estudiar"], "Wortschatz", "Infinitivschreibung", "Das Verb bedeutet „lernen / studieren“.", "Es beginnt mit es- und endet auf -diar: estudiar.", "estudiar"),
            text("S010-I04", "TICRAPCAR", ["practicar"], "Wortschatz", "Infinitivschreibung", "Das Verb bedeutet „üben“.", "Der Infinitiv beginnt mit prac-: practicar.", "practicar"),
            text("S010-I05", "RALCHAR", ["charlar"], "Wortschatz", "Infinitivschreibung", "Das Verb bedeutet „sich unterhalten“.", "Der Infinitiv beginnt mit char-: charlar.", "charlar"),
          ],
        },
        {
          id: "S010-B2",
          type: "subject-set",
          title: "¿Quién es el sujeto?",
          instruction: "Reconoce primero el sujeto y después el pronombre correspondiente.",
          competency: "Subjekterkennung",
          errorCategory: "Subjekt und Pronomen",
          items: [
            subjectItem("S010-I06", "Paco y Pepe charlan en una plaza.", ["Paco y Pepe", "una plaza", "charlan"], "Paco y Pepe", ["ellos", "él", "nosotros"], "ellos", "Wer führt die Handlung charlan aus?", "Paco y Pepe sind zwei männliche Personen: ellos."),
            subjectItem("S010-I07", "Lucía y Marta estudian español.", ["Lucía y Marta", "español", "estudian"], "Lucía y Marta", ["ellas", "ella", "vosotras"], "ellas", "Wer führt die Handlung estudian aus?", "Lucía y Marta sind zwei weibliche Personen: ellas."),
            subjectItem("S010-I08", "La plaza es bonita.", ["La plaza", "bonita", "es"], "La plaza", ["ella", "él", "ellas"], "ella", "Wer oder was ist bonita?", "La plaza ist ein feminines Nomen im Singular: ella."),
            subjectItem("S010-I09", "El texto es interesante.", ["El texto", "interesante", "es"], "El texto", ["él", "ella", "ellos"], "él", "Wer oder was ist interesante?", "El texto ist maskulin und Singular: él."),
            subjectItem("S010-I10", "Manuel y tú habláis español.", ["Manuel y tú", "español", "habláis"], "Manuel y tú", ["vosotros", "ellos", "nosotros"], "vosotros", "Wer führt die Handlung habláis aus?", "Eine weitere Person und tú entsprechen in Spanien vosotros."),
          ],
        },
        {
          id: "S010-B3",
          type: "choice-set",
          title: "Deutsch → forma verbal",
          instruction: "Elige la forma española que corresponde.",
          items: [
            choice("S010-I11", "wir sprechen", ["hablamos", "hablan", "habláis"], "hablamos", "Verbkonjugation", "Personalendung", "Wir entspricht nosotros.", "Für nosotros lautet die Form hablamos."),
            choice("S010-I12", "du arbeitest", ["trabajas", "trabaja", "trabajo"], "trabajas", "Verbkonjugation", "Personalendung", "Du entspricht tú.", "Für tú lautet die Form trabajas."),
            choice("S010-I13", "Paco und Pepe unterhalten sich", ["charlan", "charla", "charlamos"], "charlan", "Verbkonjugation", "Subjekt-Verb-Kongruenz", "Paco und Pepe entsprechen ellos.", "Für ellos lautet die Form charlan."),
            choice("S010-I14", "Lucía liest", ["lee", "lees", "leen"], "lee", "Verbkonjugation", "Personalendung -er", "Lucía entspricht ella.", "Für ella lautet die Form lee."),
            choice("S010-I15", "die Freunde wohnen", ["viven", "vive", "vivimos"], "viven", "Verbkonjugation", "Personalendung -ir", "Die Freunde entsprechen ellos.", "Für ellos endet vivir auf -en: viven."),
            choice("S010-I16", "ihr schreibt", ["escribís", "escriben", "escribes"], "escribís", "Verbkonjugation", "Personalendung -ir", "Ihr entspricht vosotros.", "Für vosotros endet escribir auf -ís: escribís."),
          ],
        },
      ],
    },
    {
      id: "S011",
      number: 11,
      contentVersion: "1.0.0",
      code: "CAMINO-92",
      title: "Todo junto",
      subtitle: "Ser, estar und alle regelmäßigen Verbgruppen",
      focus: ["ser und estar", "-ar/-er/-ir", "Fehlerkorrektur"],
      estimatedMinutes: 3,
      blocks: [
        {
          id: "S011-B1",
          type: "sort",
          title: "Cinco grupos",
          instruction: "Clasifica cada infinitivo.",
          competency: "Verbgruppen",
          errorCategory: "Infinitivgruppe",
          categories: ["ser", "estar", "-ar", "-er", "-ir"],
          items: [
            sortItem("S011-I01", "ser", "ser", "Dieses Verb bildet eine eigene Gruppe.", "Ordne ser zur Gruppe ser."),
            sortItem("S011-I02", "estar", "estar", "Dieses Verb bildet eine eigene Gruppe.", "Ordne estar zur Gruppe estar."),
            sortItem("S011-I03", "hablar", "-ar", "Schau auf die letzten zwei Buchstaben.", "hablar endet auf -ar."),
            sortItem("S011-I04", "trabajar", "-ar", "Schau auf die Infinitivendung.", "trabajar endet auf -ar."),
            sortItem("S011-I05", "leer", "-er", "Schau auf die letzten zwei Buchstaben.", "leer endet auf -er."),
            sortItem("S011-I06", "comprender", "-er", "Schau auf die Infinitivendung.", "comprender endet auf -er."),
            sortItem("S011-I07", "vivir", "-ir", "Schau auf die letzten zwei Buchstaben.", "vivir endet auf -ir."),
            sortItem("S011-I08", "escribir", "-ir", "Schau auf die Infinitivendung.", "escribir endet auf -ir."),
          ],
        },
        {
          id: "S011-B2",
          type: "select-set",
          title: "Verbos en contexto",
          instruction: "Completa cada frase con la forma correcta.",
          items: [
            selectItem("S011-I09", "España ___ interesante.", ["es", "está", "son", "están"], "es", "Verbkonjugation", "ser oder estar", "interesante beschreibt eine Eigenschaft.", "Eigenschaft im Singular: es."),
            selectItem("S011-I10", "Madrid ___ en el centro.", ["es", "está", "son", "están"], "está", "Verbkonjugation", "ser oder estar", "en el centro ist eine Ortsangabe.", "Ort im Singular: está."),
            selectItem("S011-I11", "Nosotros ___ español.", ["hablamos", "hablan", "habláis"], "hablamos", "Verbkonjugation", "Personalendung -ar", "Nosotros verlangt die Endung -amos.", "Die vollständige Form lautet hablamos."),
            selectItem("S011-I12", "Puri ___ un texto.", ["lee", "lees", "leen"], "lee", "Verbkonjugation", "Personalendung -er", "Puri entspricht ella.", "Für ella lautet die Form lee."),
            selectItem("S011-I13", "Paco y Pepe ___ en Madrid.", ["viven", "vive", "vivimos"], "viven", "Verbkonjugation", "Personalendung -ir", "Paco y Pepe entsprechen ellos.", "Für ellos lautet die Form viven."),
            selectItem("S011-I14", "Tú ___ en español.", ["escribes", "escribe", "escribís"], "escribes", "Verbkonjugation", "Personalendung -ir", "Tú verlangt bei -ir-Verben die Endung -es.", "Die vollständige Form lautet escribes."),
          ],
        },
        {
          id: "S011-B3",
          type: "text-set",
          title: "Corrige los errores",
          instruction: "Escribe cada frase completamente correcta.",
          items: [
            text("S011-I15", "✗ Las playas es en el sur.", ["Las playas están en el sur", "Las playas están en el sur."], "Fehlerkorrektur", "ser/estar und Kongruenz", "en el sur ist eine Ortsangabe; playas ist Plural.", "Verwende die Pluralform von estar: están.", "Las playas están en el sur."),
            text("S011-I16", "✗ Nosotros vive en Alemania.", ["Nosotros vivimos en Alemania", "Nosotros vivimos en Alemania."], "Fehlerkorrektur", "Personalendung -ir", "Nosotros braucht eine andere Endung als él/ella.", "Bei -ir-Verben lautet die nosotros-Endung -imos.", "Nosotros vivimos en Alemania."),
            text("S011-I17", "✗ Ella hablan español.", ["Ella habla español", "Ella habla español."], "Fehlerkorrektur", "Personalendung -ar", "Ella ist Singular.", "Bei -ar-Verben endet die Form für ella auf -a.", "Ella habla español."),
          ],
        },
      ],
    },
  ];

  function text(id, prompt, answers, competency, errorCategory, hint1, hint2, solution) {
    return { id, prompt, answers, competency, errorCategory, hint1, hint2, solution, input: "text" };
  }

  function choice(id, prompt, options, answer, competency, errorCategory, hint1, hint2) {
    return { id, prompt, options, answers: [answer], competency, errorCategory, hint1, hint2, solution: answer, input: "choice" };
  }

  function selectItem(id, prompt, options, answer, competency, errorCategory, hint1, hint2) {
    return { id, prompt, options, answers: [answer], competency, errorCategory, hint1, hint2, solution: answer, input: "select" };
  }

  function pair(id, left, right, hint1, hint2) {
    return { id, left, right, hint1, hint2, solution: `${left} – ${right}` };
  }

  function sortItem(id, label, category, hint1, hint2) {
    return { id, label, category, answers: [category], hint1, hint2, solution: `${label}: ${category}` };
  }

  function subjectItem(id, sentence, subjectOptions, subjectAnswer, pronounOptions, pronounAnswer, hint1, hint2) {
    const answer = `${subjectAnswer} → ${pronounAnswer}`;
    return { id, prompt: sentence, sentence, subjectOptions, subjectAnswer, pronounOptions, pronounAnswer, answers: [answer], hint1, hint2, solution: answer };
  }

  function normalizeCode(value) {
    return String(value || "").toLocaleUpperCase("de-DE").replace(/[\s-]+/g, "");
  }

  function starterByCode(value) {
    const normalized = normalizeCode(value);
    return starters.find((starter) => normalizeCode(starter.code) === normalized) || null;
  }

  window.RUTA_DATA = Object.freeze({ PACKAGE, starters, normalizeCode, starterByCode });
})();
