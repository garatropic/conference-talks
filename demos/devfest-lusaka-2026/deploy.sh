#!/usr/bin/env bash
set -euo pipefail

project="${1:?Pass the approved Google Cloud project ID}"
region=us-central1
service=lusaka-workshop
image_root="$region-docker.pkg.dev/$project/$service"
tag=1b1a4d4-vertex

gcloud run deploy "$service" \
  --project="$project" --region="$region" --quiet \
  --execution-environment=gen2 --ingress=all --no-allow-unauthenticated \
  --service-account="lusaka-workshop-run@$project.iam.gserviceaccount.com" \
  --min=1 --max=1 --no-cpu-throttling --concurrency=8 --timeout=300s \
  --add-cloudsql-instances="$project:$region:lusaka-workshop-db" \
  --network=default --subnet=default --vpc-egress=private-ranges-only \
  --container=web --image="$image_root/web:$tag" --port=8080 \
  --cpu=1 --memory=256Mi --depends-on=skein \
  --container=skein --image="$image_root/skein:$tag" --cpu=1 --memory=1Gi \
  --startup-probe='httpGet.path=/ok,httpGet.port=8123,periodSeconds=5,failureThreshold=20' \
  --set-env-vars="PG_POOL_MAX=3,SKEIN_RUN_CONCURRENCY=1,A2UI_MODEL=gemini-3.5-flash-lite,GOOGLE_CLOUD_PROJECT=$project" \
  --set-secrets='POSTGRES_URI=lusaka-workshop-postgres:1,REDIS_URI=lusaka-workshop-redis:1'
