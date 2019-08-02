# All Stereotypes Are Wrong

**All Stereotypes Are Wrong** was made in 48 hours by
[Alexis Moroz](https://www.linkedin.com/in/alexismoroz) (game design) &
[Clément Bourgoin](https://twitter.com/ClementBourgoin) (code) during the
Diversity Jam (April 15-17, 2016) hosted at Mozilla Paris.

[Play it](http://asaw.nokto.net/)

## Run using docker

```console
docker run -d -p 3300:8080 \
  --env DB=mysql://user:pass@host/base \
  --restart=unless-stopped \
  --name asaw \
  iwazaru/all-stereotypes-are-wrong
```

## Run in dev mode

### Requirements
- Node.js 10.16.0
- MySQL 5.7

```console
DB=mysql://user:pass@host:port/base yarn dev
```

## Todo

- French version
- Don't ask the same question twice

## Changelog

### 2.0.0 (2019-08-02)

- Replaced mongodb with MySQL
- Added Docker support
- Upgraded dependencies to fix security flaws

### 1.0.0 (2016-04-21)

- First release
