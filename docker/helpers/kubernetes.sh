# Simple script to create & upload docker image that used for kubernetes.
# Make sure already logged in using [docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";]

# Only difference between "hb-frontend-image-prod:release" and "hb-frontend-image-prod:kubernetes" is that "kuberenetes" version's nginx
# is configured to worked with backend using revers proxing. (Proxying any request made to "/api/xxx" in frontend app to backend service in kubernetes.)

(docker-compose -f docker-compose.yml -f dc-kubernetes.yml build) && ( docker tag hb-frontend-image-prod sandunwebdev/hb-frontend-image-prod:kubernetes) && (docker push sandunwebdev/hb-frontend-image-prod:kubernetes)