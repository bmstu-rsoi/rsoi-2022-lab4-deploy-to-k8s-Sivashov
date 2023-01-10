docker ps -a

docker exec -i postgres psql -U postgres postgres < ./db-v1.sql
