#!/bin/sh
set -e # Остановить скрипт при наличии ошибок

IMAGE="<username>/<repository>"                             # Образ Docker
GIT_VERSION=$(git describe --always --abbrev --tags --long) # Git-хэш и теги
DOCKER_PASSWORD=ocminog-10Nog
DOCKER_USERNAME=vzlomed

# Сборка и тегирование образа
docker build -t ${IMAGE}:${GIT_VERSION} .
docker tag ${IMAGE}:${GIT_VERSION} ${IMAGE}:latest

# Вход в Docker Hub и выгрузка образа
echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
docker push ${IMAGE}:${GIT_VERSION}

# Найти ID работающего контейнера
CONTAINER_ID=$(docker ps | grep takenote | cut -d" " -f1)

# Остановить старый контейнер, запустить новый, очистить систему
docker stop ${CONTAINER_ID}
docker run --restart unless-stopped -d -p 80:8080 ${IMAGE}:${GIT_VERSION}
docker system prune -a -f