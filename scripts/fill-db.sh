

cat db-v1.sql           | kubectl exec -i postgres-0 -- psql -U postgres -d postgres
