import Post from '../_abstract/post.js';

import NarratorGetter from '../../getter/narrator.js';
import BinaryChoicesGetter from '../../getter/less-common/binaryChoices.js';


class CustomPost extends Post {

	buildGetters() {
		this.narrator = this.buildGetter(NarratorGetter);
		this.choices = this.buildGetter(BinaryChoicesGetter);
	}

	async getMoreProps(post) {

		let more = {};
		more.choices = await Promise.all(
			post.choices
				.map(choice => this.narrator.narrate(choice))
				.filter((choice, index) => index === 0)
		);

		more.extras = await this.choices.get();
		return more;

	}

}

export default CustomPost;
