#docker ps -a

#docker exec -i postgres psql -U postgres postgres < ./db-v1.sql
# postgresPod=$(kubectl get pods -l app=postgres -o=jsonpath='{.items[].metadata}' | jq -r '.name')

cat db-v1.sql           | kubectl exec -i postgres-0 -- psql -U postgres -d postgres
