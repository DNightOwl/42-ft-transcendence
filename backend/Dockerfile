FROM node:18.13.0-buster

USER node
WORKDIR /app/backend

COPY --chown=node:node ./backend ./

RUN npm install --prefix /app/backend

CMD ["bash", "/app/backend/run.sh"]