export type Category =
  | 'Fajas'
  | 'Leggings'
  | 'Tops Deportivos'
  | 'Shorts y Faldas'
  | 'Conjuntos'
  | 'Enterizos y Vestidos'
  | 'Chaquetas'
  | 'Blusas y Camisillas';

export interface Product {
  id: number;
  name: string;
  nameEn: string;
  description?: string;
  descriptionEn?: string;
  price: number;
  category: Category;
  image: string;
  badge?: 'Oferta' | 'Pieza Única' | 'Nuevo';
  bestseller?: boolean;
}

const UNSPLASH = (id: string, w = 600, h = 750) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;

export const products: Product[] = [
  // --- Fajas ---
  {
    id: 1,
    name: 'Tabla marcación de abdomen',
    nameEn: 'Abdominal Marking Board',
    price: 32,
    category: 'Fajas',
    image: UNSPLASH('1584863495140-a320b13a11a8'),
  },
  {
    id: 2,
    name: 'Tabla lumbar',
    nameEn: 'Lumbar Board',
    price: 32,
    category: 'Fajas',
    image: UNSPLASH('1599552683573-9dc48255fe85'),
  },
  {
    id: 3,
    name: 'Tabla mariposa abdominal',
    nameEn: 'Butterfly Abdominal Board',
    price: 32,
    category: 'Fajas',
    image: UNSPLASH('1531520563951-4c0e3d3fcacc'),
  },
  {
    id: 4,
    name: 'Tabla pera abdominal (Acrílico)',
    nameEn: 'Pear Abdominal Board (Acrylic)',
    price: 27,
    category: 'Fajas',
    image: UNSPLASH('1586323289103-e309634e2a1b'),
  },
  {
    id: 5,
    name: 'Short Texas sin brasier',
    nameEn: 'Texas Short (no bra)',
    price: 135,
    category: 'Fajas',
    image: UNSPLASH('1606902965551-dce093cda6e7'),
    bestseller: true,
  },
  {
    id: 6,
    name: 'Short Texas con brasier',
    nameEn: 'Texas Short with Bra',
    price: 140,
    category: 'Fajas',
    image: UNSPLASH('1597586309260-5562dd1c6b3c'),
    bestseller: true,
  },
  {
    id: 7,
    name: 'Morpho Large con brasier',
    nameEn: 'Morpho Large with Bra',
    price: 145,
    category: 'Fajas',
    image: UNSPLASH('1540582093410-c06370c89515'),
  },
  {
    id: 8,
    name: 'Morpho Large sin brasier',
    nameEn: 'Morpho Large (no bra)',
    price: 140,
    category: 'Fajas',
    image: UNSPLASH('1768929096117-c0b04a7c8fc2'),
  },
  {
    id: 9,
    name: 'Short Morpho sin brasier',
    nameEn: 'Morpho Short (no bra)',
    price: 130,
    category: 'Fajas',
    image: UNSPLASH('1768929096134-f45af7839e83'),
  },
  {
    id: 10,
    name: 'Short Morpho Libi con brasier',
    nameEn: 'Morpho Libi Short with Bra',
    price: 145,
    category: 'Fajas',
    image: UNSPLASH('1597586309250-ceb10255182d'),
  },
  {
    id: 11,
    name: 'Panty levanta cola bidireccional push up',
    nameEn: 'Bidirectional Push Up Butt Lifter',
    price: 75,
    category: 'Fajas',
    image: UNSPLASH('1606902965551-dce093cda6e7'),
    bestseller: true,
  },

  // --- Leggings ---
  {
    id: 12,
    name: 'Leggings (liso)',
    nameEn: 'Leggings (solid)',
    price: 35,
    category: 'Leggings',
    image: UNSPLASH('1599552683573-9dc48255fe85'),
    bestseller: true,
  },
  {
    id: 13,
    name: 'Leggings negros',
    nameEn: 'Black Leggings',
    description: 'El básico infaltable: leggings negros de cintura alta con compresión suave, versátiles para el gym o el día a día.',
    descriptionEn: 'The everyday essential: high-waist black leggings with gentle compression, versatile enough for the gym or daily wear.',
    price: 35,
    category: 'Leggings',
    image: UNSPLASH('1584863495140-a320b13a11a8'),
  },
  {
    id: 14,
    name: 'Leggings estampados Premium',
    nameEn: 'Printed Leggings Premium',
    price: 45,
    category: 'Leggings',
    image: UNSPLASH('1531520563951-4c0e3d3fcacc'),
  },
  {
    id: 15,
    name: 'Leggings estampados Básicos',
    nameEn: 'Printed Leggings Basic',
    price: 28,
    category: 'Leggings',
    image: UNSPLASH('1768929096133-1748d1fe5944'),
  },
  {
    id: 16,
    name: 'Leggings super héroes',
    nameEn: 'Superhero Leggings',
    description: 'Leggings de estampado súper héroes con compresión suave y cintura alta. Divertidos, cómodos y con el ajuste perfecto para tu rutina de ejercicio.',
    descriptionEn: 'Superhero-print leggings with gentle compression and a high waist. Fun, comfortable, and shaped to move with your workout.',
    price: 45,
    category: 'Leggings',
    image: UNSPLASH('1597586309260-5562dd1c6b3c'),
  },
  {
    id: 17,
    name: 'Leggings cierre frontal',
    nameEn: 'Front Zip Leggings',
    price: 35,
    category: 'Leggings',
    image: UNSPLASH('1606902965551-dce093cda6e7'),
  },
  {
    id: 18,
    name: 'Leggings transparencia completa',
    nameEn: 'Full Mesh Leggings',
    price: 35,
    category: 'Leggings',
    image: UNSPLASH('1540582093410-c06370c89515'),
  },

  // --- Tops ---
  {
    id: 19,
    name: 'Top tiras ajustables',
    nameEn: 'Adjustable Strap Top',
    price: 25,
    category: 'Tops Deportivos',
    image: UNSPLASH('1540582093410-c06370c89515'),
  },
  {
    id: 20,
    name: 'Top espalda ajustable',
    nameEn: 'Adjustable Back Top',
    description: 'Top deportivo con espalda ajustable y soporte medio, ideal para entrenar o usar en el día a día. Tela suave que se adapta a tu cuerpo sin marcar.',
    descriptionEn: 'A sports top with an adjustable back and medium support, perfect for training or everyday wear. Soft fabric that moves with your body without digging in.',
    price: 25,
    category: 'Tops Deportivos',
    image: UNSPLASH('1586323289103-e309634e2a1b'),
  },
  {
    id: 21,
    name: 'Crop tops',
    nameEn: 'Crop Tops',
    price: 10,
    category: 'Tops Deportivos',
    image: UNSPLASH('1606902965551-dce093cda6e7'),
    badge: 'Oferta',
  },

  // --- Shorts y Faldas ---
  {
    id: 22,
    name: 'Short Push up (liso)',
    nameEn: 'Push Up Short (solid)',
    price: 25,
    category: 'Shorts y Faldas',
    image: UNSPLASH('1584863495140-a320b13a11a8'),
  },
  {
    id: 23,
    name: 'Short Push up Estampado Comic',
    nameEn: 'Comic Print Push Up Short',
    price: 25,
    category: 'Shorts y Faldas',
    image: UNSPLASH('1597586309260-5562dd1c6b3c'),
  },
  {
    id: 24,
    name: 'Short Push up Estampado Drip',
    nameEn: 'Drip Print Push Up Short',
    price: 25,
    category: 'Shorts y Faldas',
    image: UNSPLASH('1531520563951-4c0e3d3fcacc'),
  },
  {
    id: 25,
    name: 'Short Push up Rayas',
    nameEn: 'Striped Push Up Short',
    price: 25,
    category: 'Shorts y Faldas',
    image: UNSPLASH('1768929096150-9a76dc1d6560'),
  },
  {
    id: 26,
    name: 'Short Push up Estampado Militar',
    nameEn: 'Military Print Push Up Short',
    price: 25,
    category: 'Shorts y Faldas',
    image: UNSPLASH('1599552683573-9dc48255fe85'),
  },
  {
    id: 27,
    name: 'Short Super Héroes',
    nameEn: 'Superhero Short',
    price: 25,
    category: 'Shorts y Faldas',
    image: UNSPLASH('1606902965551-dce093cda6e7'),
  },
  {
    id: 28,
    name: 'Short Licra Interna',
    nameEn: 'Inner Lycra Short',
    price: 25,
    category: 'Shorts y Faldas',
    image: UNSPLASH('1540582093410-c06370c89515'),
  },
  {
    id: 29,
    name: 'Falda Short',
    nameEn: 'Short Skirt',
    price: 38,
    category: 'Shorts y Faldas',
    image: UNSPLASH('1563132337-f159f484226c'),
  },

  // --- Conjuntos ---
  {
    id: 30,
    name: 'Conjunto Falda short y top',
    nameEn: 'Short Skirt & Top Set',
    price: 53,
    category: 'Conjuntos',
    image: UNSPLASH('1768929096133-1748d1fe5944'),
    bestseller: true,
  },
  {
    id: 31,
    name: 'Conjunto Short con top tiras',
    nameEn: 'Short & Strap Top Set',
    price: 53,
    category: 'Conjuntos',
    image: UNSPLASH('1768929096150-9a76dc1d6560'),
  },
  {
    id: 32,
    name: 'Conjunto Short push up y Top tiras ajustables',
    nameEn: 'Push Up Short & Adjustable Top Set',
    price: 53,
    category: 'Conjuntos',
    image: UNSPLASH('1597586309250-ceb10255182d'),
  },
  {
    id: 33,
    name: 'Conjuntos Super Héroes',
    nameEn: 'Superhero Set',
    price: 53,
    category: 'Conjuntos',
    image: UNSPLASH('1597586309260-5562dd1c6b3c'),
  },
  {
    id: 34,
    name: 'Conjunto Leggings liso y top manga sisa',
    nameEn: 'Solid Leggings & Sleeveless Top Set',
    price: 73,
    category: 'Conjuntos',
    image: UNSPLASH('1606902965551-dce093cda6e7'),
  },
  {
    id: 35,
    name: 'Conjunto leggings levanta cola y top manga sisa',
    nameEn: 'Butt Lift Leggings & Sleeveless Top Set',
    price: 73,
    category: 'Conjuntos',
    image: UNSPLASH('1584863495140-a320b13a11a8'),
  },
  {
    id: 36,
    name: 'Conjunto Leggings levanta cola y top tiras',
    nameEn: 'Butt Lift Leggings & Strap Top Set',
    price: 73,
    category: 'Conjuntos',
    image: UNSPLASH('1540582093410-c06370c89515'),
  },
  {
    id: 37,
    name: 'Conjunto leggings levanta cola y top manga corta',
    nameEn: 'Butt Lift Leggings & Short Sleeve Top Set',
    price: 78,
    category: 'Conjuntos',
    image: UNSPLASH('1768929096134-f45af7839e83'),
    bestseller: true,
  },
  {
    id: 38,
    name: 'Conjunto Leggings push up y malla lados (Talla única; Gris/Azul)',
    nameEn: 'Push Up Leggings & Side Mesh Set (One Size; Grey/Blue)',
    price: 78,
    category: 'Conjuntos',
    image: UNSPLASH('1768929096117-c0b04a7c8fc2'),
    badge: 'Pieza Única',
  },
  {
    id: 39,
    name: 'Conjunto Leggings liso y top manga larga',
    nameEn: 'Solid Leggings & Long Sleeve Top Set',
    price: 82,
    category: 'Conjuntos',
    image: UNSPLASH('1599552683573-9dc48255fe85'),
  },

  // --- Enterizos y Vestidos ---
  {
    id: 40,
    name: 'Vestido tiras cruzadas con falda short',
    nameEn: 'Crossover Strap Dress with Short Skirt',
    price: 68,
    category: 'Enterizos y Vestidos',
    image: UNSPLASH('1563132337-f159f484226c'),
  },
  {
    id: 41,
    name: 'Enterizo leggings sin push up con control abdomen',
    nameEn: 'Leggings Bodysuit w/ Abdominal Control',
    price: 72,
    category: 'Enterizos y Vestidos',
    image: UNSPLASH('1586323289103-e309634e2a1b'),
  },
  {
    id: 42,
    name: 'Enterizo Short push up (única unidad, beige)',
    nameEn: 'Push Up Short Bodysuit (one unit, beige)',
    price: 55,
    category: 'Enterizos y Vestidos',
    image: UNSPLASH('1606902965551-dce093cda6e7'),
    badge: 'Pieza Única',
  },

  // --- Chaquetas ---
  {
    id: 43,
    name: 'Chaqueta estampada',
    nameEn: 'Printed Jacket',
    price: 35,
    category: 'Chaquetas',
    image: UNSPLASH('1618244965061-1d27b208d6e8'),
  },
  {
    id: 44,
    name: 'Chaqueta malla con capota',
    nameEn: 'Hooded Mesh Jacket',
    price: 35,
    category: 'Chaquetas',
    image: UNSPLASH('1653159057664-3823f35568f5'),
  },

  // --- Blusas y Camisillas ---
  {
    id: 45,
    name: 'Blusa cuello tortuga',
    nameEn: 'Turtleneck Blouse',
    price: 12,
    category: 'Blusas y Camisillas',
    image: UNSPLASH('1563132337-f159f484226c'),
  },
  {
    id: 46,
    name: 'Blusa transparente',
    nameEn: 'Sheer Blouse',
    price: 12,
    category: 'Blusas y Camisillas',
    image: UNSPLASH('1586323289103-e309634e2a1b'),
  },
  {
    id: 47,
    name: 'Blusa manga sisa',
    nameEn: 'Sleeveless Blouse',
    price: 18,
    category: 'Blusas y Camisillas',
    image: UNSPLASH('1540582093410-c06370c89515'),
  },
  {
    id: 48,
    name: 'Blusas',
    nameEn: 'Blouses',
    price: 10,
    category: 'Blusas y Camisillas',
    image: UNSPLASH('1653159057664-3823f35568f5'),
    badge: 'Oferta',
  },
  {
    id: 49,
    name: 'Camisilla malla recogido atrás',
    nameEn: 'Back Gathered Mesh Tank',
    price: 28,
    category: 'Blusas y Camisillas',
    image: UNSPLASH('1618244965061-1d27b208d6e8'),
  },
  {
    id: 50,
    name: 'Camisilla lisa abertura atrás',
    nameEn: 'Open Back Solid Tank',
    price: 32,
    category: 'Blusas y Camisillas',
    image: UNSPLASH('1563132337-f159f484226c'),
  },
];

export const categories: { key: Category; label: string; labelEn: string; image: string }[] = [
  {
    key: 'Fajas',
    label: 'Fajas',
    labelEn: 'Shapewear',
    image: `https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=600&h=750&fit=crop&auto=format`,
  },
  {
    key: 'Leggings',
    label: 'Leggings',
    labelEn: 'Leggings',
    image: `https://images.unsplash.com/photo-1599552683573-9dc48255fe85?w=600&h=750&fit=crop&auto=format`,
  },
  {
    key: 'Conjuntos',
    label: 'Conjuntos',
    labelEn: 'Matching Sets',
    image: `https://images.unsplash.com/photo-1768929096150-9a76dc1d6560?w=600&h=750&fit=crop&auto=format`,
  },
  {
    key: 'Tops Deportivos',
    label: 'Tops Deportivos',
    labelEn: 'Sport Tops',
    image: `https://images.unsplash.com/photo-1540582093410-c06370c89515?w=600&h=750&fit=crop&auto=format`,
  },
  {
    key: 'Shorts y Faldas',
    label: 'Shorts y Faldas',
    labelEn: 'Shorts & Skirts',
    image: `https://images.unsplash.com/photo-1584863495140-a320b13a11a8?w=600&h=750&fit=crop&auto=format`,
  },
  {
    key: 'Enterizos y Vestidos',
    label: 'Enterizos y Vestidos',
    labelEn: 'Jumpsuits & Dresses',
    image: `https://images.unsplash.com/photo-1563132337-f159f484226c?w=600&h=750&fit=crop&auto=format`,
  },
  {
    key: 'Chaquetas',
    label: 'Chaquetas',
    labelEn: 'Jackets',
    image: `https://images.unsplash.com/photo-1618244965061-1d27b208d6e8?w=600&h=750&fit=crop&auto=format`,
  },
  {
    key: 'Blusas y Camisillas',
    label: 'Blusas y Camisillas',
    labelEn: 'Tops & Tanks',
    image: `https://images.unsplash.com/photo-1586323289103-e309634e2a1b?w=600&h=750&fit=crop&auto=format`,
  },
];
