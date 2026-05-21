#!/usr/bin/env bash

set -euo pipefail

: "${DOCKERHUB_USERNAME:?DOCKERHUB_USERNAME is required}"
: "${DOCKERHUB_TOKEN:?DOCKERHUB_TOKEN is required}"

IMAGE_NAME="${IMAGE_NAME:-lifegoals}"
IMAGE_TAG="${IMAGE_TAG:-latest}"
COMMIT_SHA="${COMMIT_SHA:-local}"

FULL_IMAGE_NAME="${DOCKERHUB_USERNAME}/${IMAGE_NAME}"

echo "Logging in to Docker Hub..."
printf '%s' "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin

echo "Building Docker image..."
docker build \
  -t "${FULL_IMAGE_NAME}:${IMAGE_TAG}" \
  -t "${FULL_IMAGE_NAME}:${COMMIT_SHA}" \
  .

echo "Pushing Docker image tags..."
docker push "${FULL_IMAGE_NAME}:${IMAGE_TAG}"
docker push "${FULL_IMAGE_NAME}:${COMMIT_SHA}"

echo "Deployment image published: ${FULL_IMAGE_NAME}:${IMAGE_TAG}"