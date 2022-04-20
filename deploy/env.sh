#!/bin/sh

#echo NEXT_PUBLIC_GRAPHQL_URL="https://lucis-lp.koolab.io/graphql" >> ../.env
# echo NODE_ENV=$NODE_ENV >> .env

# this is for dev only, please use ENV instead in other env
cp .env.dev.cicd .env
