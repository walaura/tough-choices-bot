import styles from './SaintsRowPost.css';
import Post from './abstract/Post.js';
import addStyles from 'lib/decorator/addStyles';

class CustomPost extends Post {}

module.exports = addStyles(CustomPost,styles);