FROM node:18.13.0-buster

USER node
WORKDIR /app/frontend

COPY --chown=node:node ./frontend ./

# COPY ENV variable
# COPY --chown=node:node .env ./
# COPY --chown=node:node .env /app/
# COPY --chown=node:node .env /app/frontend

RUN npm install --prefix /app/frontend

CMD ["bash", "/app/frontend/run.sh"]