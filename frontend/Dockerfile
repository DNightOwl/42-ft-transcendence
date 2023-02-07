FROM node:18.13.0-buster

USER node
WORKDIR /app/frontend

COPY --chown=node:node ./frontend ./

RUN npm install --prefix /app/frontend

CMD ["bash", "/app/frontend/run.sh"]