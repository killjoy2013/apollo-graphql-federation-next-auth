#!/bin/sh -eu
echo "starting docker entrypoint ess web" >&1

whoami

pwd
echo "ls -la /home/gnamadmin/node_modules/.prisma/client"
ls -la /home/gnamadmin/node_modules/.prisma/client
# echo "ls -la /app/dist/src"
# ls -la /app/dist/src

prisma generate
npm run start
echo "ess web started" >&1
