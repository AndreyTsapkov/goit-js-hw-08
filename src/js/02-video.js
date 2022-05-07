import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const savedVideoTime = +localStorage.getItem('videoplayer-current-time');

player.on(
  'timeupdate',
  throttle(data => {
    localStorage.setItem('videoplayer-current-time', data.seconds);
  }),
  1000,
);

if (savedVideoTime) {
  player.setCurrentTime(savedVideoTime);
}
// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });

// .then(function (seconds) {
//   // seconds = the actual time that the player seeked to
//   console.log(seconds);
// })
// .catch(function (error) {
//   switch (error.name) {
//     case 'RangeError':
//       // the time was less than 0 or greater than the video’s duration
//       break;

//     default:
//       // some other error occurred
//       break;
//   }
// });
