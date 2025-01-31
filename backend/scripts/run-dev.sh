#!/bin/sh
export PORT=3002
export DB_HOST=localhost
export DB_PORT=5432

export POSTGRES_USER=mperezguendulain
export POSTGRES_PASSWORD=okta_12345
export POSTGRES_DB=user_management
export JWT_SECRET=SECRET

yarn dev