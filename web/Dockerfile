# Install dependencies only when needed
FROM artifactory.turkcell.com.tr/local-docker-3rd-party/com/turkcell/noderunner/node:stretch-14.17.2 AS installer
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --registry https://artifactory.turkcell.com.tr/artifactory/api/npm/npm/ 

# Rebuild the source code only when needed
FROM artifactory.turkcell.com.tr/local-docker-3rd-party/com/turkcell/noderunner/node:stretch-14.17.2 AS builder
WORKDIR /app

COPY --from=installer /app/node_modules ./node_modules
COPY . .
RUN npm run prisma:generate
RUN npm run build 

# Production image, copy all the files and run next
# FROM artifactory.turkcell.com.tr/local-docker-3rd-party/com/turkcell/noderunner/node_dos2unix_jq_python:011 AS runner
FROM artifactory.turkcell.com.tr/local-docker-3rd-party/com/turkcell/noderunner/node:stretch-14.17.2 AS runner

RUN apt-get update && \
    apt-get install dos2unix && \
    apt-get clean

ENV APP_USER=gnamadmin
RUN groupadd -g 1002030000 -o $APP_USER
RUN useradd -m -l -u 1002030000 -g 1002030000 -o -s /bin/bash ${APP_USER}

RUN chown -R $APP_USER /usr/local/lib && \
    chown -R $APP_USER /usr/local/bin


RUN apt-get update && \
    apt-get install openssl -y && \
    apt-get clean

COPY --from=builder /app/turkcellRootca2Der.cer ./
RUN mv turkcellRootca2Der.cer /etc/ssl/certs/turkcellRootca2Der.pem

WORKDIR /etc/ssl/certs/
RUN chmod 777 turkcellRootca2Der.pem && \ 
    ln -s turkcellRootca2Der.pem `openssl x509 -hash -noout -in turkcellRootca2Der.pem`.0

ENV APP_HOME=/home/${APP_USER}
WORKDIR ${APP_HOME}
USER ${APP_USER}
RUN npm install -g prisma --registry https://artifactory.turkcell.com.tr/artifactory/api/npm/npm/  

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=builder --chown=gnamadmin:gnamadmin /app/public ./public
COPY --from=builder --chown=gnamadmin:gnamadmin /app/prisma ./prisma
COPY --from=builder --chown=gnamadmin:gnamadmin /app/.next ./.next
COPY --from=builder --chown=gnamadmin:gnamadmin /app/node_modules ./node_modules
COPY --from=builder --chown=gnamadmin:gnamadmin /app/package.json ./package.json
COPY --from=builder --chown=gnamadmin:gnamadmin /app/package-lock.json ./package-lock.json
COPY --from=builder --chown=gnamadmin:gnamadmin /app/next.config.js ./next.config.js
COPY --from=builder --chown=gnamadmin:gnamadmin /app/docker-entrypoint.sh ./docker-entrypoint.sh

RUN prisma generate


RUN dos2unix $APP_HOME/docker-entrypoint.sh    
ENV ENTRYPOINT_PATH=$APP_HOME/docker-entrypoint.sh
EXPOSE 3000

ENTRYPOINT $ENTRYPOINT_PATH 
