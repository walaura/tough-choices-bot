import addStyles from 'lib/decorator/addStyles';


import styles from './QueerbaitPost.css';
import Post from './abstract/Post.js';


class CustomPost extends Post {
	getMoreProps() {
		return {
			variants: [2],
		};
	}
}

module.exports = addStyles(CustomPost,styles);
