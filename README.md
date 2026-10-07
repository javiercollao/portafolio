# Javier — Astro + Markdown

Prueba independiente del portafolio/blog. Astro convierte cada archivo Markdown de `src/content/blog/` en HTML estático dentro de `dist/`.

## Desarrollo

```sh
npm install
npm run dev
```

Abrir `http://localhost:4321`.

## Crear una publicación

Duplicar uno de los archivos de `src/content/blog/`, cambiar el nombre del archivo y editar su cabecera:

```md
---
title: "Título"
description: "Resumen breve"
publishedAt: 2026-10-07
category: "Backend"
number: "04"
readingTime: "5 min"
cover: "/images/uploads/covers/mi-portada.webp"
showInBlog: true
showInWork: false
workCategories: ["Backend", "APIs"]
draft: false
---

Contenido del artículo en Markdown.
```

`cover` es la ruta de una imagen subida desde Pages CMS. Las publicaciones antiguas conservan temporalmente su campo `image` como respaldo; al asignarles una portada desde el panel, `cover` tendrá prioridad.

- `showInBlog: true`: incluye la entrada en `/blog/`.
- `showInWork: true`: incluye la entrada en `/trabajos/` y entre los trabajos recientes de la portada.
- `workCategories`: crea una página filtrada por cada categoría cuando `showInWork` es `true`. Un proyecto puede tener varias.
- Ambos pueden ser `true` si el contenido funciona como artículo y caso de estudio.
- Con ambos en `false`, la URL individual se genera pero no aparece en los listados.
- `draft: true` impide que la entrada y su URL se publiquen.

El blog se pagina cada cuatro entradas. Trabajos conserva la composición de cinco proyectos y un panel personal de la portada original, por lo que se pagina cada cinco entradas. Las páginas siguientes se generan como `/blog/2/`, `/trabajos/2/`, etc.

Las páginas de categoría no se muestran en la navegación, pero se generan como enlaces compartibles. Por ejemplo:

```text
/trabajos/categoria/backend/
/trabajos/categoria/machine-learning/
/trabajos/categoria/apis/
```

Si `workCategories` se omite, se utiliza el valor de `category` como única categoría de trabajos.

## Generar HTML

```sh
npm run build
```

El resultado publicable queda en `dist/`. Para revisar el sitio con el mismo comportamiento de rutas inexistentes que GitHub Pages:

```sh
npm run preview
```

La vista se abre en `http://127.0.0.1:4321` y devuelve `dist/404.html` ante cualquier ruta inexistente. Para utilizar otro puerto:

```sh
npm run preview -- --port 4322
```

El servidor de desarrollo de Astro (`npm run dev`) usa su propio manejo interno para algunas rutas dinámicas. Para validar la página 404 y el resultado que se publicará, utiliza siempre `npm run preview`.

## GitHub Pages

El workflow incluido en `.github/workflows/deploy.yml` instala, compila y publica `dist/` cuando se hace push a `main`. Está preparado para usar esta carpeta como raíz de su propio repositorio. En GitHub hay que seleccionar **Settings → Pages → Source → GitHub Actions**.

La configuración detecta automáticamente si el repositorio es un sitio de usuario (`usuario.github.io`) o un sitio de proyecto (`usuario.github.io/repositorio/`) y ajusta las rutas.

## Editar con Pages CMS

El archivo `.pages.yml` configura un panel visual para esta colección de Markdown.

1. Publicar esta carpeta como la raíz de un repositorio GitHub.
2. Entrar en `https://app.pagescms.org/` con GitHub.
3. Instalar la aplicación de Pages CMS únicamente en ese repositorio.
4. Abrir el repositorio en el panel y seleccionar **Publicaciones**.
5. Crear o editar una entrada y guardarla.

Pages CMS guardará el Markdown en `src/content/blog`. El commit sobre `main` activará el workflow de GitHub Actions y actualizará GitHub Pages automáticamente.
# portafolio
