#!/bin/sh -eu
echo "starting docker entrypoint" >&1
node /home/gnamadmin/dist/main
echo "express started" >&1
