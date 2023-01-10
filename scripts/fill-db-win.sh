docker ps -a

cmd /c 'docker exec -i postgres psql -U postgres postgres < ./db-v1.sql'
docker exec -i postgres psql -U postgres postgres < ./db-v1.sql
