# 첫 단계: 빌드 단계
FROM node:20-alpine AS build
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json /app
RUN npm install --legacy-peer-deps
COPY . /app
RUN npm run build

# 두 번째 단계: 실행 단계
FROM node:20-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json /app
RUN npm install --legacy-peer-deps
COPY --from=build /app/.next /app/.next
COPY public /app/public
ENV PATH /app/node_modules/.bin:${PATH}
EXPOSE 3000
CMD ["npm", "start"]