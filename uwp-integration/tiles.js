



/*
var adaptiveTile = `
<tile>
	<visual>
		<binding template="TileSmall">
			<group>
				<subgroup>
					<text hint-style="subtitle">daily .net tips</text>
					<text hint-style="subtle">tips on .net</text>
				</subgroup>
			</group>
		</binding>
		<binding template="TileMedium">
			<group>
				<subgroup>
					<text hint-style="subtitle">daily .net tips</text>
					<text hint-style="subtle">tips on .net</text>
				</subgroup>
			</group>
		</binding>
		<binding template="TileLarge">
			<group>
				<subgroup>
					<image src="http://dailydotnettips.com/wp-content/uploads/2013/08/DailyDotNETTips.png" placement="inline"/>
				</subgroup>
			</group>
			<group>
				<subgroup>
					<text hint-style="subtitle">daily .net tips</text>
					<text hint-style="subtle">tips on .net</text>
				</subgroup>
			</group>
		</binding>
		<binding template="TileWide">
			<group>
				<subgroup hint-weight="50">
					<image src="http://dailydotnettips.com/wp-content/uploads/2013/08/DailyDotNETTips.png" placement="inline"/>
				</subgroup>
			<subgroup>
				<text hint-style="subtitle">daily .net tips</text>
				<text hint-style="subtle">tips on .net</text>
			</subgroup>
			</group>
		</binding>
	</visual>
</tile>
`


var tileDOM = new Windows.Data.Xml.Dom.XmlDocument();
tileDOM.loadXml(adaptiveTile);

var Notifications = Windows.UI.Notifications;
var TileNotification = Notifications.TileNotification;
var tileNotification = new TileNotification(tileDOM);

var tileUpdater = Notifications.TileUpdateManager.createTileUpdaterForApplication();
tileUpdater.update(tileNotification);
*/


var XmlDocument = Windows.Data.Xml.Dom.XmlDocument;
var Notifications = Windows.UI.Notifications;
/*
Windows.UI.Notifications.TileUpdateManager
	.createTileUpdaterForApplication()
	.enableNotificationQueue(true);
	*/

/*
class TileWrapper {

	constructor() {
		this._small = '';
		this._medium = '';
		this._wide = '';
		this._large = '';
		this._smallAttrs = {};
		this._mediumAttrs = {};
		this._wideAttrs = {};
		this._largeAttrs = {};
		this._renderTimeout = null;
		this.tileUpdater = Notifications.TileUpdateManager.createTileUpdaterForApplication();
	}

	small (xml, attrs) {this._small  = xml; Object.assign(this._smallAttrs,  attrs); this.requestRender()}
	medium(xml, attrs) {this._medium = xml; Object.assign(this._mediumAttrs, attrs); this.requestRender()}
	wide  (xml, attrs) {this._wide   = xml; Object.assign(this._wideAttrs,   attrs); this.requestRender()}
	large (xml, attrs) {this._large  = xml; Object.assign(this._largeAttrs,  attrs); this.requestRender()}


	requestRender() {
		if (this._renderTimeout == null) {
			this._renderTimeout = setTimeout(() => {
				this._renderTimeout = null;
				this.render();
			}, 10);
		}
	}

	renderAttrs(attrObject) {
		var keys = Object.keys(attrObject);
		if (keys.length) {
			return '' + keys.map(key => `${key}="${attrObject[key]}"`).join(' ')
		} else return '';
	}

	render() {
		var tileDOM = XmlDocument();
		tileDOM.loadXml(`
			<tile>
				<visual>
					<binding template="TileSmall"${this.renderAttrs(this._smallAttrs)}>${this._small}</binding>
					<binding template="TileMedium" ${this.renderAttrs(this._mediumAttrs)}>${this._medium}</binding>
					<binding template="TileWide"${this.renderAttrs(this._wideAttrs)}>${this._wide}</binding>
					<binding template="TileLarge"${this.renderAttrs(this._largeAttrs)}>${this._large}</binding>
				</visual>
			</tile>
		`);
		this.tileUpdater.update(new Notifications.TileNotification(tileDOM));
	}

}

var tile = new TileWrapper;


var eventname = 'birthday';

tile.small(`
	<group>
		<subgroup>
			<text hint-style="subtitle">daily .net tips</text>
			<text hint-style="subtle">tips on .net</text>
		</subgroup>
	</group>`);

tile.medium(`
	<group hint-textStacking="center">
		<subgroup hint-textStacking="center">
			<text hint-style="header" hint-align="center">${Math.floor(Math.random() * 100)}</text>
			<text hint-style="caption" hint-align="center">until</text>
			<text hint-style="base" hint-align="center">${eventname}</text>
		</subgroup>
	</group>`, {
		'hint-textStacking': 'center',
		//branding: 'logo'
	});

tile.wide(`
	<group>
		<subgroup hint-weight="50">
			<image src="http://dailydotnettips.com/wp-content/uploads/2013/08/DailyDotNETTips.png" placement="inline"/>
		</subgroup>
		<subgroup>
			<text hint-style="subtitle">Wow, doge</text>
			<text hint-style="subtle">Very subtle 2</text>
		</subgroup>
	</group>`);
	
tile.large(`
	<group>
		<subgroup>
			<image src="http://dailydotnettips.com/wp-content/uploads/2013/08/DailyDotNETTips.png" placement="inline"/>
		</subgroup>
	</group>
	<group>
		<subgroup>
			<text hint-style="subtitle">daily .net tips</text>
			<text hint-style="subtle">tips on .net</text>
		</subgroup>
	</group>`);


var countdown = 100;
var ofwhat = 'days';
setInterval(() => {
	tile.medium(`
	<group hint-textStacking="center">
		<subgroup hint-textStacking="center">
			<text hint-style="header" hint-align="center">${countdown--}</text>
			<text hint-style="caption" hint-align="center">${ofwhat} until</text>
			<text hint-style="base" hint-align="center">${eventname}</text>
		</subgroup>
	</group>`, {
		'hint-textStacking': 'center',
		//branding: 'logo'
	})
}, 4000)
*/
