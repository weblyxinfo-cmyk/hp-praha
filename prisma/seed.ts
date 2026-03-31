const { PrismaClient } = require("../src/generated/prisma");
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

  // Seed articles
  const articles = [
    {
      slug: "mechanismus-fungovani-homeopatickych-leku",
      category: "Věda · 2024",
      titleCs: "Mechanismus fungování homeopatických léků vědecky prokázán",
      titleEn: "Mechanism of homeopathic medicines scientifically proven",
      descCs: "Nový výzkum přináší přímé důkazy o tom, jak přípravky ovlivňují strukturu vody. Přelomový objev pro celý obor.",
      descEn: "New research provides direct evidence of how preparations affect water structure. A breakthrough discovery for the entire field.",
      featured: true,
      published: true,
    },
    {
      slug: "kongres-lmhi-bogota-2023",
      category: "Kongres · Bogotá 2023",
      titleCs: "Kongres Mezinárodní homeopatické ligy LMHI",
      titleEn: "Congress of the International Homeopathic Medical League LMHI",
      descCs: "",
      descEn: "",
      featured: false,
      published: true,
    },
    {
      slug: "konference-mnichov-2023",
      category: "Konference · Mnichov 2023",
      titleCs: "Mnichovská konference — setkání evropských homeopatů",
      titleEn: "Munich conference — meeting of European homeopaths",
      descCs: "",
      descEn: "",
      featured: false,
      published: true,
    },
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    });
  }

  // Seed testimonials
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

  for (let i = 0; i < testimonials.length; i++) {
    await prisma.testimonial.create({ data: testimonials[i] });
  }

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
