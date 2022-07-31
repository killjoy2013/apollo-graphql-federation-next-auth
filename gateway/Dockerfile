FROM artifactory.turkcell.com.tr/local-docker-3rd-party/com/turkcell/noderunner/node_dos2unix_jq_python:011 AS client_build

ENV APP_USER=gnamadmin
RUN groupadd -g 1002030000 -o $APP_USER
RUN useradd -m -l -u 1002030000 -g 1002030000 -o -s /bin/bash ${APP_USER}

RUN chown -R $APP_USER /usr/local/lib && \
    chown -R $APP_USER /usr/local/bin

ENV APP_HOME=/home/${APP_USER}
WORKDIR ${APP_HOME}
COPY --chown=gnamadmin:gnamadmin . .
USER ${APP_USER}

RUN npm ci --registry https://artifactory.turkcell.com.tr/artifactory/api/npm/npm/ && \
    npm run build

# RUN mv ./certs ./dist/certs

RUN dos2unix $APP_HOME/docker-entrypoint.sh 
ENV ENTRYPOINT_PATH=$APP_HOME/docker-entrypoint.sh
EXPOSE 4000

ENTRYPOINT $ENTRYPOINT_PATH 

#ENTRYPOINT ["/bin/bash", "-c", "node /tmp/dist/main"]  //OK
# ENTRYPOINT ["/tmp/docker-entrypoint.sh"] 
#ENTRYPOINT [ "node","/tmp/dist/main" ] #OK



