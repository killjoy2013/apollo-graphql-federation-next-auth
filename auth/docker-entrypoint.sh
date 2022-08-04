#!/bin/sh -eu
echo "starting docker entrypoint ess-backend" >&1
npm run migration:run
node /home/gnamadmin/dist/src/main
echo "ess-backend started" >&1
