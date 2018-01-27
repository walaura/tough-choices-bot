import abstractGetter from 'getter/abstract/abstract';

export default class FandomGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'people';
	}


	async fetchOnce() {
		return super.fetchOnce().then(peopleWithFandoms =>
			peopleWithFandoms.map(item => item.fandom)
		).then(fandoms =>
			[...new Set(fandoms)]
		);
	}


}
