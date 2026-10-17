# Sitio personal

Repositorio del sitio personal de Franco Román Meola, construido con Jekyll.

## Desarrollo local

```sh
bundle install
bundle exec jekyll serve
```

Abrí `http://127.0.0.1:4000`.

## Limpiar archivos generados

Cuando termines de servir el sitio:

```sh
bundle exec jekyll clean
```

## Deploy en GitHub Pages

El deploy se hace con GitHub Actions (`.github/workflows/pages.yml`).
En GitHub: Settings → Pages → Source: GitHub Actions.
