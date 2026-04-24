#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://localhost:3000}"

echo "[smoke] Vérification de ${BASE_URL}/health"
HEALTH="$(curl -sS "${BASE_URL}/health")"
case "${HEALTH}" in
  *"\"status\":\"ok\""*) ;;
  *)
    echo "[smoke] KO: endpoint /health inattendu: ${HEALTH}"
    exit 1
    ;;
esac

echo "[smoke] Vérification de ${BASE_URL}/api/tasks"
TASKS="$(curl -sS "${BASE_URL}/api/tasks")"
case "${TASKS}" in
  *"\"tasks\""*) ;;
  *)
    echo "[smoke] KO: endpoint /api/tasks inattendu: ${TASKS}"
    exit 1
    ;;
esac

echo "[smoke] OK"
