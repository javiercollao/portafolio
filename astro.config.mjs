import { defineConfig } from 'astro/config';

const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const onGitHub = process.env.GITHUB_ACTIONS === 'true' && owner && repository;
const base = onGitHub && repository !== `${owner}.github.io` ? `/${repository}` : '/';

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  site: onGitHub ? `https://${owner}.github.io` : 'http://localhost:4321',
  base
});
