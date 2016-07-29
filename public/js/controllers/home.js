angular.module('MyApp')
.controller('HomeCtrl', function($scope){

  $scope.view = {};

  $scope.view.teamMembers = [{
    name: 'Kirsten Wedde',
    imageUrl: 'https://avatars3.githubusercontent.com/u/11020841?v=3&s=460',
    about: 'Kirsten loves road trips, her sweet pups, miniature goats, and gardening. She hopes to have a small homestead within the next few years.'
  },
  {
    name: 'Jory Garrido',
    imageUrl: 'https://avatars.slack-edge.com/2016-04-13/34405623040_3a4761302abfa28ef360_512.jpg',
    about: 'If Blazecast is a planet and Sam is a planet, is the world a planet. No. Listen, if I am a planet and Blazecast is a planet, are my shoes a planet? Yes.'
  },
  {
    name: 'Ian Strouse',
    imageUrl: 'https://avatars3.githubusercontent.com/u/11822318?v=3&s=460',
    about: 'Ian is an RPCV and aspiring futurist. He recently moved to Boulder from a rural town in the highlands of Madagascar to pursue his dreams of saving the world through code. He is currently parsing his way through the jungles of AngularJS.'
  },
  {
    name: 'Josh Newsom',
    imageUrl: 'https://avatars.slack-edge.com/2016-04-04/31926108596_bba024b117cf2dfaa77e_1024.jpg',
    about: 'Josh was born and raised in Colorado.  He attended the University of Colorado at Boulder and also spent a year in Regensburg, Germany.  He loves to listen to and play music, and has played in several bands.  He is having a great time learning to code and work in a team at Galvanize!'
  },
  {
    name: 'Rob Kurtz',
    imageUrl:'https://secure.gravatar.com/avatar/3c51996ec357eddddb4aa70ff4be2822.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png',
    about: 'Rob is a lover of all things Willy Wonka and was actually a Golden Ticket runner up in the "Mad Choco Choco" bar rush of 1997. He makes weekly treks to the top of the Hogback in N. Boulder and can regurlarly be seen traversing the sidewalks of Pearl St, usually on his way to or from the bus.'
  },
  {
    name: 'Sam Cate',
    imageUrl: 'https://avatars.slack-edge.com/2016-04-04/31940177953_70c2abd4e7b5af0ec45d_512.png',
    about: " Listen, apparently I'm a planet... and now I'm not."
  }];


});
