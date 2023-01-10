version=latest

cd ./src

docker buildx build --push -t sivashov/gateway:$version    --platform=linux/amd64 -f ./gateway/Dockerfile .
docker buildx build --push -t sivashov/flights:$version --platform=linux/amd64 -f ./flights/Dockerfile .
docker buildx build --push -t sivashov/tickets:$version --platform=linux/amd64 -f ./tickets/Dockerfile .
docker buildx build --push -t sivashov/privilegies:$version  --platform=linux/amd64 -f ./privileges/Dockerfile .