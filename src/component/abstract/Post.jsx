import React from 'react';

import photoGetter from 'lib/photoGetter';


class Post extends React.Component {

	constructor(props) {
		super(props);
		let initialState = {
			bg: undefined
		};
		let moreProps = this.getMoreProps();
		if(moreProps.extras){
			const unmangledExtras = moreProps.extras;
			moreProps.extras = [];
			Object.keys(unmangledExtras).map(extra => {
				let style = {};
				if(typeof unmangledExtras[extra] === 'object') {
					moreProps.extras.push({
						style: unmangledExtras[extra].style,
						value: unmangledExtras[extra].value,
						key: extra
					});
				}
				else {
					moreProps.extras.push({
						style: {},
						value: unmangledExtras[extra],
						key: extra
					});
				}
			});
		}
		this.state = Object.assign(
			{},
			initialState,
			this.props,
			moreProps
		);
		this.getPhotos = photoGetter(this.state.photoQuery,{
			debug: false
		});
	}

	getMoreProps() {
		return {};
	}

	componentDidMount() {
		this.getPhotos
		.then(photos => {
			this.setState({
				bg: photos[0]
			});
		})
		.catch(e => {
			console.error(e);
		});
	}

	render() {
		let backgroundStyle = {
			backgroundImage: `url(${this.state.bg})`
		};
		let choices = this.state.choices;
		return (
			<div
				styleName={'post'}
				data-variant=
				{
					this.state.variants.map((variant,idx) => {
						return `(${idx}=${Math.ceil(Math.random()*variant)})`;
					})
				}
			>
				{
					[1,2].map(additionalContainer => {
						return <div
							key={'additionalContainer-'+additionalContainer}
							styleName={'ac-'+additionalContainer}
						/>;
					})
				}
				{
					this.state.extras.map(extra => {
						return <div
							key={'extra-'+extra.key}
							data-val={extra.value}
							data-name={extra.key}
							styleName='extra'
							style={extra.style}
						>
								<span>{extra.value}</span>
						</div>;
					})
				}
				<div styleName='choices'>
					{
						choices.map(choice => {
							return <div styleName='choice' key={choice}><span key={'wr'+choice}>{choice}</span></div>;
						})
					}
				</div>
				<div styleName='bg' data-sink="true" style={backgroundStyle} />
			</div>
		);
	}

}

export default Post;
