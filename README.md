<!--
  Created with https://readme.ohmybuck.com/ tool.
-->

# Realworld App Hybrids

[![main workflow](https://github.com/olmesm/realworldapp-hybrids/actions/workflows/main.yml/badge.svg)](https://github.com/olmesm/realworldapp-hybrids/actions/workflows/main.yml)

---

Realworld app with vitejs and hybrids

## Development

Uses:

- [asdf](https://asdf-vm.com)

```bash
# Install asdf dependencies
source <(curl -sL https://raw.githubusercontent.com/olmesm/odd-scripts/main/shell/asdf-install.sh)

# Install dependencies
npm install

# Start dev server
npm run dev
```

## Demo backend

Requires:

- docker

```bash
docker-compose up

# docs should be available on http://localhost:3000/api-docs
# api should be available on http://localhost:3000/api
# pgadmin should be available on http://localhost:5555 - login and password in `./docker-compose.yml`
```

## Resources

- <https://realworld-docs.netlify.app/docs/intro>
- <https://codebase.show/projects/realworld?category=frontend>
