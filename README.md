# Sentimints

## Table of Contents

1. [About Us](#about-us)
    1. [The Team](#the-team)
    1. [The Stack](#the-stack)
1. [Development](#development)
    1. [Database](#database-setup)
    1. [Contributing](#contributing)

##About Us

Senitmints was built for the April 2016 AngelHack Austin Hackathon. We used [HPE Haven OnDemand](https://dev.havenondemand.com/apis/analyzesentiment#overview) Sentiment API to analyze Yelp customer reviews.

We used Yelp's [academic dataset](https://www.yelp.com/dataset_challenge) and pulled 10 business with a substantial number of reviews to demo the app with.

Upon receiving the sentiment data from the Haven OnDemand we manipulated the data to create summary statistics of the likes, dislikes, and popular topics amoungst reviewers as well as the distribution and strength of those sentiments amongst the reviewers. We then plotted each of these topics for the user using D3.js.

For more information about this project see the [blog post on HPE Haven OnDemand](https://community.havenondemand.com/t5/Blog/AngelHack-Austin-Customer-Reactions-App/ba-p/2804).

###The Team

- [Marta Johnson](https://github.com/martahj)
- [Julia Brown](https://github.com/JuliaCBrown)
- [Mike Mitchel](https://github.com/mikemitchel)
- [Nathan Schwartz](https://github.com/Nathan-Schwartz)
- [Austin Kovach](https://github.com/austinjkovach)

###The Stack

- HPE Haven OnDemand Sentiment API
- React.js
- D3.js
- Node.js
- Express.js
- PostgreSQL
- Knex.js

##Development

### Database Setup

If you don't have Postgres on your computer run
```
brew install postgres
```
Run npm install
and then run:
```
npm install -g knex
```
Then start your database and run:
```
postgres -D /usr/local/var/postgres
createdb sentimints_dev
knex migrate:latest
knex seed:run
```

### Contributing

Pull the most recent version down to your master:
git pull --rebase origin master

Checkout a new branch for what you're working on:
git checkout -b feat/a-description-here-#[eg]3

ONLY EVER PUSH TO YOUR FEATURE BRANCH, AKA DO NOT PUSH TO MASTER:
git push origin feat/a-description-here-#[eg]3

Submit a pull request on Github from the feature branch to master

Someone who is not you must review and merge

Start the cycle over


pg_upgrade \
  -d /usr/local/var/postgres \
  -D /usr/local/var/postgres9.5 \
  -b /usr/local/Cellar/postgresql/9.4.5/bin/ \
  -B /usr/local/Cellar/postgresql/9.5.1/bin/ \
  -v
