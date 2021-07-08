export default class ChatSpace {
	constructor(parent) {
		this.parent = parent;
		this.setup();
	}
	setup() {
		this.$chat_space = $(document.createElement('div'));
		this.$chat_space.addClass('chat-space');
		this.setup_header();
		this.setup_messages();
		this.setup_actions();
		this.render();
	}
	setup_header() {
		const header_html = `
			<div class="chat-space-header">
				<div class="chat-back-button" data-toggle="tooltip" title="Go Back" >
					<i class="fa fa-angle-left fa-lg" aria-hidden="true"></i>
				</div>
				${this.parent.avatar_html}
				<div class="chat-profile-info">
					<div class="chat-profile-name">Nihal Mittal</div>
					<div class="chat-profile-time">14 mins ago</div>
				</div>
				<i class="fa fa-expand fa-lg chat-expand-button"></i>
			</div>
		`;
		this.$chat_space.append(header_html);
	}
	setup_messages() {
		this.$chat_space_container = $(document.createElement('div'));
		this.$chat_space_container.addClass('chat-space-container');

		let message_html = `
			${this.make_sender_message('Hi john titor ?', '12:01 pm')}
			${this.make_recipient_message(
				'Hey, so I’m having a party at my place next weekend. Do you want to come?',
				'1:58 pm'
			)}
		`;

		const date_line_html = `
			<div class="date-line"><span>Today</span></div>
		`;

		for (let i = 0; i < 3; i++) {
			message_html += date_line_html + message_html;
		}
		this.$chat_space_container.html(message_html);
		this.$chat_space.append(this.$chat_space_container);
	}
	setup_actions() {
		this.$chat_actions = $(document.createElement('div'));
		this.$chat_actions.addClass('chat-space-actions');
		const chat_actions_html = `
			<i class="fa fa-paperclip fa-lg fa-flip-horizontal 
			fa-flip-vertical attach-items" >
			</i>
			<input class="form-control type-message" 
				type="search" 
				placeholder="Type message"
			>
			<div class="message-send-button">
				<span class="fa-stack">
					<i class="fa fa-circle fa-stack-2x" ></i>
					<i class="fa fa-paper-plane fa-stack-1x fa-inverse"></i>
				</span>
			</div>
		`;
		this.$chat_actions.html(chat_actions_html);
		this.$chat_space.append(this.$chat_actions);
	}
	setup_events() {
		const me = this;
		$('.chat-back-button').on('click', function () {
			me.parent.parent.render();
		});
		$('.message-send-button').on('click', function () {
			me.send_message();
		});
	}
	make_sender_message(message, time) {
		const sender_message_html = `
		<div class="sender-message">
			<div class="message-bubble">${message}</div>
			<div class="message-time">${time}</div>
		</div>
		`;
		return sender_message_html;
	}
	make_recipient_message(message, time) {
		const recipient_message_html = `
		<div class="recipient-message">
			<div class="message-bubble">${message}</div>
			<div class="message-time">${time}</div>
		</div>
		`;
		return recipient_message_html;
	}
	scroll_to_bottom() {
		this.$chat_space_container.animate(
			{
				scrollTop: this.$chat_space_container[0].scrollHeight,
			},
			500
		);
	}
	send_message() {
		const message = $('.type-message').val();
		if (message.length === 0) {
			return;
		}
		this.$chat_space_container.append(
			this.make_sender_message(message, '12:01 pm')
		);
		$('.type-message').val('');
		this.scroll_to_bottom();
	}
	render() {
		this.parent.parent.parent.$chat_container.html(this.$chat_space);
		this.setup_events();
		this.scroll_to_bottom();
	}
}