import { Client } from "@notionhq/client";

const notionAuth = process.env.NOTION_TOKEN ?? process.env.NOTION_API_KEY;
if (!notionAuth) throw new Error("Missing Notion token. Set NOTION_TOKEN in .env.local");
if (!notionAuth.startsWith("secret_")) {
  console.warn("Warning: Notion token should start with 'secret_'");
}

export const notion = new Client({ auth: notionAuth });
export const databaseId = process.env.NOTION_DATABASE_ID;
if (!databaseId) throw new Error("Missing NOTION_DATABASE_ID in .env.local");

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  date: string;
  fecha: string | null;
  contenido: string;
};

export async function getAllPublishedPosts(): Promise<BlogPost[]> {
  try {
    console.log("🔄 Iniciando getAllPublishedPosts");
    console.log("🔑 Database ID:", databaseId);

    // 1. Primero, verificamos la estructura de la base de datos
    console.log("📑 Obteniendo estructura de la base de datos...");
    if (!databaseId) {
      throw new Error("Database ID is undefined");
    }
    const db = await notion.databases.retrieve({ database_id: databaseId });
    console.log("\n📊 Base de datos recuperada:", db);

    // 2. Intentamos obtener las páginas
    console.log("\n🔍 Buscando páginas en la base de datos...");
    const pages = await notion.search({
      filter: {
        property: "object",
        value: "page"
      }
    });

    console.log(`\n📄 Total de páginas encontradas: ${pages.results.length}`);

    // 3. Log de propiedades por página
    console.log("\n🔍 Propiedades encontradas en cada página:");
    pages.results.forEach((page: any, index: number) => {
      console.log(`\nPágina ${index + 1}:`);
      console.log("ID:", page.id);
      console.log("Parent Database:", page.parent?.database_id);
      console.log("Propiedades:", Object.keys(page.properties || {}));
      if (page.properties?.Estado) {
        console.log("Estado value:", page.properties.Estado?.select?.name);
      }
    });

    // 4. Filtrar y transformar
    const posts = pages.results
      .filter((page: any) => {
        const isFromDb = page.parent?.database_id === databaseId;
        const estado = page.properties?.Estado?.select?.name;
        console.log(`\n🔎 Evaluando página ${page.id}:`);
        console.log("- Es de nuestra DB:", isFromDb);
        console.log("- Estado:", estado);
        return isFromDb && estado === "Publicado";
      })
      .map((page: any) => {
        const props = page.properties || {};
        const post = {
          id: page.id,
          slug: props.Slug?.rich_text?.[0]?.plain_text || "",
          title: props.Title?.title?.[0]?.plain_text || "(Sin título)",
          date: props["Fecha de publicación"]?.date?.start || "",
          fecha: props["Fecha de publicación"]?.date?.start || null,
          contenido: props.Contenido?.rich_text?.[0]?.plain_text || ""
        };
        console.log("\n📝 Post procesado:", post);
        return post;
      });

    console.log(`\n✅ Posts publicados encontrados: ${posts.length}`);
    return posts;

  } catch (err) {
    console.error("\n❌ Error en getAllPublishedPosts:", err);
    return [];
  }
}
