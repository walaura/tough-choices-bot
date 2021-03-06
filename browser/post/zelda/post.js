import Post from '../_abstract/post.js';

import {capitalizeFirstLetter} from '../../lib/stringies.js';
import BinaryChoicesGetter from '../../getter/less-common/binaryChoices.js';
import NarratorGetter from '../../getter/narrator.js';

class CustomPost extends Post {

	buildGetters() {
		this.narrator = this.buildGetter(NarratorGetter);
		this.choices = this.buildGetter(BinaryChoicesGetter);
	}

	async getMoreProps(post) {

		const binaryChoices = await this.choices.get();

		for(let k in binaryChoices) {
			binaryChoices[k] = capitalizeFirstLetter(binaryChoices[k]);
		}

		let more = {
			extras : binaryChoices,
			choices: [(await this.narrator.narrate(post.choices[0]))]
		};

		return more;

	}

}

export default CustomPost;
