FROM node:18.13.0-buster

USER node
WORKDIR /app/backend

COPY --chown=node:node ./backend ./

# COPY ENV variable
# COPY --chown=node:node .env ./
# COPY --chown=node:node .env /app/
# COPY --chown=node:node .env /app/backend

RUN npm install --prefix /app/backend

CMD ["bash", "/app/backend/run.sh"]