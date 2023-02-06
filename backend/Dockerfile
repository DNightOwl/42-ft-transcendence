FROM node:19-buster

USER node
WORKDIR /app/backend

COPY --chown=node:node package.json ./

COPY --chown=node:node prisma ./prisma/

# COPY ENV variable
COPY --chown=node:node .env ./

RUN npm install

COPY --chown=node:node . .



CMD ["bash", "run.sh"]
