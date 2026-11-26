# Private DevFest Lusaka demo

This runbook hosts the existing GitHub A2UI playground behind Cloud Run IAM. The [workshop replay and codelab](../../slides/devfest-lusaka-2026/public/workshop/index.html) are shareable static materials. They use test captures and have no connection to the private runtime.

## Inputs

- [Skein source revision `1b1a4d4`](https://github.com/skein-js/skein-js/tree/1b1a4d4018d1dad718054cd4f71d65f582e653a2), with dependencies from its lockfile and the workshop's [Vertex AI patch](vertex-ai.patch).
- An approved Google Cloud project with billing and a `default` VPC and subnet in `us-central1`. Use that region for Cloud Run and its data services. The Gemini model uses the global Vertex AI endpoint.
- A dedicated runtime service account `lusaka-workshop-run`, an Artifact Registry Docker repository `lusaka-workshop`, a Cloud SQL PostgreSQL 16 instance `lusaka-workshop-db`, and an authenticated 1 GB Memorystore instance `lusaka-workshop-redis` on the `default` network.
- A Cloud SQL database and application user with permission to run Skein's boot migrations. Give the runtime service account `roles/cloudsql.client` and access to the two database and Redis secrets. Give it `roles/aiplatform.user` to call Gemini on Vertex AI. [Vertex AI permissions](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/access-control)

Store the following values in Secret Manager as version 1. The backend uses the Cloud SQL Unix socket and private IPv4 egress to Redis.

| Secret | Runtime variable | Input |
| --- | --- | --- |
| `lusaka-workshop-postgres` | `POSTGRES_URI` | `postgresql://USER:PASSWORD@/DATABASE?host=/cloudsql/PROJECT:us-central1:lusaka-workshop-db` |
| `lusaka-workshop-redis` | `REDIS_URI` | `redis://:AUTH@PRIVATE_HOST:6379` |

URL-encode user and password values in connection strings. Keep all secret values outside tracked files and container build contexts. [Cloud SQL sockets](https://docs.cloud.google.com/sql/docs/postgres/connect-run) · [Cloud Run secrets](https://docs.cloud.google.com/run/docs/configuring/services/secrets) · [Cloud Run to Redis](https://docs.cloud.google.com/memorystore/docs/redis/connect-redis-instance-cloud-run)

## Provision a workshop project

Use Bash and an authenticated `gcloud` session. Use the same project in each step. These are the workshop instance sizes.

```bash
export WORKSHOP_PROJECT=your-approved-project
gcloud services enable --project="$WORKSHOP_PROJECT" \
  run.googleapis.com aiplatform.googleapis.com artifactregistry.googleapis.com \
  sqladmin.googleapis.com redis.googleapis.com compute.googleapis.com \
  iam.googleapis.com secretmanager.googleapis.com

gcloud iam service-accounts create lusaka-workshop-run --project="$WORKSHOP_PROJECT"
gcloud artifacts repositories create lusaka-workshop \
  --project="$WORKSHOP_PROJECT" --location=us-central1 --repository-format=docker

gcloud sql instances create lusaka-workshop-db \
  --project="$WORKSHOP_PROJECT" --region=us-central1 \
  --database-version=POSTGRES_16 --edition=ENTERPRISE --tier=db-f1-micro
gcloud sql databases create skein \
  --project="$WORKSHOP_PROJECT" --instance=lusaka-workshop-db

gcloud redis instances create lusaka-workshop-redis \
  --project="$WORKSHOP_PROJECT" --region=us-central1 \
  --network=default --redis-version=redis_7_2 --tier=basic --size=1 --enable-auth
```

Create an application user in Cloud SQL. In the `skein` database, give that role usage and create privileges on the `public` schema so it can run migrations. Use that username and password for `POSTGRES_URI`. Use the Redis private address and AUTH string for `REDIS_URI`. [Cloud SQL users](https://docs.cloud.google.com/sql/docs/postgres/create-manage-users) · [Redis AUTH](https://docs.cloud.google.com/memorystore/docs/redis/managing-auth)

Enter each connection string at the hidden prompt to create its first secret version.

```bash
read -r -s -p "Postgres URI: " workshop_postgres_uri
printf '\n'
printf '%s' "$workshop_postgres_uri" | gcloud secrets create lusaka-workshop-postgres \
  --project="$WORKSHOP_PROJECT" --data-file=-
unset workshop_postgres_uri

read -r -s -p "Redis URI: " workshop_redis_uri
printf '\n'
printf '%s' "$workshop_redis_uri" | gcloud secrets create lusaka-workshop-redis \
  --project="$WORKSHOP_PROJECT" --data-file=-
unset workshop_redis_uri
```

Give Cloud Run's runtime identity access to Cloud SQL, Vertex AI, and the two secrets. The deployer also needs permission to act as this service account. [Cloud Run service identity](https://docs.cloud.google.com/run/docs/securing/service-identity)

```bash
WORKSHOP_RUNTIME="lusaka-workshop-run@$WORKSHOP_PROJECT.iam.gserviceaccount.com"
for role in roles/cloudsql.client roles/aiplatform.user; do
  gcloud projects add-iam-policy-binding "$WORKSHOP_PROJECT" \
    --member="serviceAccount:$WORKSHOP_RUNTIME" --role="$role" --condition=None
done

for secret in lusaka-workshop-postgres lusaka-workshop-redis; do
  gcloud secrets add-iam-policy-binding "$secret" --project="$WORKSHOP_PROJECT" \
    --member="serviceAccount:$WORKSHOP_RUNTIME" --role=roles/secretmanager.secretAccessor
done
```

## Build, deploy, and open

From this directory, with Node 24 or 26, Corepack, Docker, and authenticated `gcloud`:

```sh
export WORKSHOP_PROJECT=your-approved-project
export WORKSHOP_IMAGES="us-central1-docker.pkg.dev/$WORKSHOP_PROJECT/lusaka-workshop"
gcloud auth configure-docker us-central1-docker.pkg.dev
bash build-images.sh /path/to/skein-js "$WORKSHOP_IMAGES"
bash deploy.sh "$WORKSHOP_PROJECT"
```

Grant the workshop presenter Cloud Run Invoker on the deployed service. Then start the proxy using that presenter's `gcloud` account.

```bash
WORKSHOP_PRESENTER=presenter@example.com
gcloud run services add-iam-policy-binding lusaka-workshop \
  --project="$WORKSHOP_PROJECT" --region=us-central1 \
  --member="user:$WORKSHOP_PRESENTER" --role=roles/run.invoker --condition=None

gcloud run services proxy lusaka-workshop --project="$WORKSHOP_PROJECT" \
  --region=us-central1 --port=8080
```

The build script uses a disposable checkout, installs the pinned dependencies, and applies the patch to the demo's model adapter. The patch selects `ChatGoogle` with `platformType: "gcp"` and `location: "global"`. At runtime Cloud Run supplies Application Default Credentials through the attached service account. The student codelab uses the public example's Gemini Developer API setup. [LangChain Google integration](https://docs.langchain.com/oss/javascript/integrations/chat/google) · [Cloud Run service identity](https://docs.cloud.google.com/run/docs/securing/service-identity)

Run `curl -fsS http://localhost:8080/api/ok` in another terminal and check for `{"ok":true}`. Open `http://localhost:8080/` to use the playground. The ingress container serves the compiled Angular app, streams `/api/` from the local Skein sidecar, and sets a fixed presenter identity behind IAM. Keep the IAM invoker binding limited to the presenter. The example’s header-based identity is scoped to this single-presenter service. [Cloud Run service proxy](https://docs.cloud.google.com/sdk/gcloud/reference/run/services/proxy)

## Rehearsal record

On 2026-11-25, image tag `1b1a4d4-vertex` generated a GitHub dashboard using Gemini on Vertex AI with the Cloud Run service account. The browser paused updates, rejoined the run, and recovered the same pending draft after closing and reopening the thread URL. The replacement revision `lusaka-workshop-vertex-rehearsal` recovered the pending review from Cloud SQL without another generation and completed approval. A run started just after rollout was cancelled before saving a draft. A fresh run on the same revision reached review and recorded rejection. Anonymous requests returned HTTP 403.

On 2026-11-25, the original Gemini Developer API deployment ran image tag `1b1a4d4-r1`. The public service URL returned HTTP 403 without credentials. Through the authenticated proxy, the browser paused and rejoined the same run. The `lusaka-workshop-rehearsal` revision restored the pending decision without invoking the model again. Approval completed on the new revision, and a second live thread recorded rejection.

## Rehearse and close out

1. Confirm that an unauthenticated request to the Cloud Run URL is denied and `/api/ok` succeeds through the local proxy.
2. Rehearse the [deck cues](../../slides/devfest-lusaka-2026/README.md). Check incremental progress, reconnect, reload during review, approve, and try rejection on a fresh thread. Confirm that starting a run works without holding the browser's SSE request open.
3. Reopen a pending thread after a same-image revision replacement. Use unchanged Postgres and Redis and keep the same thread URL. Record which behaviors were observed before using the deployment live.
4. After the workshop, retire the demo service, its dedicated database and Redis instances, and its registry repository. Remove the workshop service account's Cloud SQL Client and Vertex AI User bindings before deleting the account. Delete the two workshop storage secrets and `lusaka-workshop-gemini` if the earlier API-key deployment created it. The warm instance and managed stores incur charges while provisioned. The deck, replay, and codelab remain on the slide library.
