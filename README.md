# All Stereotypes Are Wrong

**All Stereotypes Are Wrong** was made in 48 hours by
[Alexis Moroz](https://www.linkedin.com/in/alexismoroz) (game design) &
[Clément Bourgoin](https://twitter.com/ClementBourgoin) (code) during the
Diversity Jam (April 15-17, 2016) hosted at Mozilla Paris.

Play it: https://asaw.iwazaru.fr/

## Run using docker

Attach MySQL database with `--env DB=mysql://user:pass@host/base` or with a `.env` file.

```console
docker run -d -p 3400:8080 \
  --env-file=.env \
  --restart=unless-stopped \
  --name asaw \
  iwazaru/all-stereotypes-are-wrong:3.1.0
```

## Run in dev mode

### Requirements

- Node.js 10.16.0
- MySQL 5.7

```console
DB=mysql://user:pass@host:port/base yarn dev
```

## Build docker image

```console
docker build \
  -t iwazaru/all-stereotypes-are-wrong:latest \
  -t iwazaru/all-stereotypes-are-wrong:3.1.0 \
  .
```

## Todo

- French version
- Don't ask the same question twice

## Changelog

### 3.1.0 (2020-08-24)

- Add stereotype browser page

### 3.0.2 (2020-07-27)

- Upgrade dependencies to fix lodash vulnerability

### 3.0.1 (2020-06-16)

- Upgrade dependencies to fix security vulnerabilities

### 3.0.0 (2020-01-16)

- Rewrote front-end using React

### 2.0.1 (2019-11-21)

- Fixed displaying statistics when answering
- Upgraded dependencies to fix security flaws

### 2.0.0 (2019-08-02)

- Replaced mongodb with MySQL
- Added Docker support
- Upgraded dependencies to fix security flaws

### 1.0.0 (2016-04-21)

- First release
