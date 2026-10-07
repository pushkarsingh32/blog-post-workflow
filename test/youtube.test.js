import assert from 'node:assert';
import { getYoutubePlaylistId } from '../src/youtube.js';

// Skip on dist tests because the bundle does not export this function
if (process.env.DIST !== 'true') {
	describe('getYoutubePlaylistId', () => {
		it('should map a channel feed to the channel uploads playlist', () => {
			assert.strictEqual(
				getYoutubePlaylistId(
					'https://www.youtube.com/feeds/videos.xml?channel_id=UCtvnB6R__6vdyjUEbDgAWHw',
				),
				'UUtvnB6R__6vdyjUEbDgAWHw',
			);
		});

		it('should return the playlist id of a playlist feed', () => {
			assert.strictEqual(
				getYoutubePlaylistId(
					'https://www.youtube.com/feeds/videos.xml?playlist_id=PLJNqgDLpd5E69Kc664st4j7727sbzyx0X',
				),
				'PLJNqgDLpd5E69Kc664st4j7727sbzyx0X',
			);
		});

		it('should return null for feeds that are not YouTube feeds', () => {
			assert.strictEqual(getYoutubePlaylistId('http://localhost:8080'), null);
			assert.strictEqual(
				getYoutubePlaylistId('https://dev.to/feed/gautamkrishnar'),
				null,
			);
			assert.strictEqual(
				getYoutubePlaylistId(
					'https://notyoutube.com/feeds/videos.xml?channel_id=UC1',
				),
				null,
			);
		});

		it('should return null for user feeds and malformed urls', () => {
			assert.strictEqual(
				getYoutubePlaylistId(
					'https://www.youtube.com/feeds/videos.xml?user=someone',
				),
				null,
			);
			assert.strictEqual(getYoutubePlaylistId('not a url'), null);
		});
	});
}
