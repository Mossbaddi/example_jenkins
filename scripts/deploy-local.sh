#!/usr/bin/env bash
set -euo pipefail

IMAGE_TAG="${1:-task-api:latest}"
CONTAINER_NAME="${CONTAINER_NAME:-task-api-local}"
APP_PORT="${APP_PORT:-3000}"

echo "[deploy] Image cible: ${IMAGE_TAG}"
echo "[deploy] Container: ${CONTAINER_NAME} sur port ${APP_PORT}"

if docker container inspect "${CONTAINER_NAME}" >/dev/null 2>&1; then
  echo "[deploy] Suppression de l'ancien conteneur ${CONTAINER_NAME}"
  docker rm -f "${CONTAINER_NAME}" >/dev/null
fi

echo "[deploy] Démarrage du conteneur"
docker run -d \
  --name "${CONTAINER_NAME}" \
  -p "${APP_PORT}:3000" \
  "${IMAGE_TAG}" >/dev/null

echo "[deploy] Déploiement terminé"
