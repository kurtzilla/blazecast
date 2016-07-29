# Blazecast Documentation

## Usage
Send all data requests to:

    > https://blazecast.herokuapp.com/api/

## User Information
| Parameter   |      Value      |  Description |
|----------|:-------------:|------:|
| podcasts/:user_id/follow | JSON  |  Returns the user's followed podcasts |
|users/:user_id/savedPodcasts| JSON | Returns the user's "saved for later" episodes (yes, the route is not named correctly, but this is the correct description for the information)|
|users/:user_id/favoriteEpisodes| JSON | Returns the user's favorited episodes|

### Example

     https://blazecast.herokuapp.com/api/podcasts/4/follow
     returns
     [
      {
        "id": 23,
        "itunes_episode_id": 142909,
        "podcast_id": 4,
        "name": "Conservative Panel Addresses Rise of Tump Nomination",
        "feedUrl": null,
        "length": null
      },
      {
        "id": 24,
        "itunes_episode_id": 136574,
        "podcast_id": 4,
        "name": "Failed Turkey Coup, Preview Repbulican National Convention, Trump picks Indiana governor Spence",
        "feedUrl": null,
        "length": null
      },
      {
        "id": 25,
        "itunes_episode_id": 129943,
        "podcast_id": 4,
        "name": "Mexico's President Enrique Peña Nieto and an All-star panel to address shootings in America",
        "feedUrl": null,
        "length": null
      }
