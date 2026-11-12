# Lakelly.js

Bot de Discord en TypeScript (comandos con `cron`, servicio con `os-service`).

## Arrancar

    npm install
    npx tsc            # compila a build/ (tsconfig: outDir ./build)
    TOKEN=<token del bot> npm start

(`package.json` no tiene script `build`: usa `npx tsc`. El `RUN npm run build` del dockerfile
tampoco existe como script; ojo con eso al construir la imagen.)

El token se lee de `process.env.TOKEN` (el proyecto ya usa `dotenv`, así que un `.env`
ignorado por git también vale).

## Secretos

- El token del bot va en `TOKEN` (entorno o `.env` ignorado). Nunca en `src/`.
- En 2021 se commiteo un token en `src/index.js`; ese fichero ya no existe y el token está
  rotado. Sigue en el historial público y **el historial no se reescribe**.
- Hook de pre-commit con gitleaks:

      cp scripts/pre-commit .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit

  Escanea solo el diff que se va a commitear (`gitleaks git . --staged`) con la config de
  `.gitleaks.toml`.
